import { legacy } from '@luxdao/contracts';
import groupBy from 'lodash.groupby';
import { useCallback } from 'react';
import { Address, Hex, encodeFunctionData, erc20Abi, getAddress, zeroAddress } from 'viem';
import GnosisSafeL2 from '../../assets/abi/GnosisSafeL2';
import SablierV2BatchAbi from '../../assets/abi/SablierV2Batch';
import { useDAOStore } from '../../providers/App/AppProvider';
import { useNetworkConfigStore } from '../../providers/NetworkConfig/useNetworkConfigStore';
import { PreparedNewStreamData } from '../../types/roles';
import { SENTINEL_MODULE } from '../../utils/address';
import { useCurrentDAOKey } from '../DAO/useCurrentDAOKey';

export function convertStreamIdToBigInt(streamId: string) {
  // streamId is formatted as ${streamContractAddress}-${chainId}-${numericId}
  const lastDash = streamId.lastIndexOf('-');
  const numericId = streamId.substring(lastDash + 1);
  return BigInt(numericId);
}

export default function useCreateSablierStream() {
  const {
    contracts: { sablierV2LockupLinear, sablierV2Batch, daoSablierStreamManagementModule },
  } = useNetworkConfigStore();
  const { daoKey } = useCurrentDAOKey();
  const {
    node: { safe },
  } = useDAOStore({ daoKey });

  const safeAddress = safe?.address;

  const prepareStreamTokenCallData = useCallback(
    (amountInTokenDecimals: bigint) => {
      return encodeFunctionData({
        abi: erc20Abi,
        functionName: 'approve',
        args: [sablierV2Batch, amountInTokenDecimals],
      });
    },
    [sablierV2Batch],
  );

  const prepareBasicStreamData = useCallback(
    (recipient: Address, amountInTokenDecimals: bigint, cancelable: boolean = true) => {
      if (!safeAddress) {
        throw new Error('Can not create sablier stream proposal while DAO is not set.');
      }
      return {
        sender: safeAddress, // Tokens sender. This address will be able to cancel the stream
        cancelable, // Is it possible to cancel this stream
        transferable: false, // Is Recipient able to transfer receiving rights to someone else
        recipient, // Recipient of tokens through stream
        totalAmount: amountInTokenDecimals, // total amount of tokens sent
        broker: { account: zeroAddress, fee: 0n }, // Optional broker
      };
    },
    [safeAddress],
  );

  const prepareLinearStream = useCallback(
    ({
      totalAmount,
      recipient,
      startDateTs,
      endDateTs,
      cliffDateTs,
      cancelable,
    }: PreparedNewStreamData) => {
      if (startDateTs >= endDateTs) {
        throw new Error('Start date of the stream can not be larger than end date');
      }

      if (cliffDateTs) {
        if (cliffDateTs <= startDateTs) {
          throw new Error('Cliff date can not be less or equal than start date');
        } else if (cliffDateTs >= endDateTs) {
          throw new Error('Cliff date can not be larger or equal than end date');
        }
      }

      return {
        ...prepareBasicStreamData(recipient, totalAmount, cancelable),
        timestamps: {
          start: startDateTs,
          end: endDateTs,
          cliff: cliffDateTs,
        },
      };
    },
    [prepareBasicStreamData],
  );

  const prepareFlushStreamTxs = useCallback(
    (args: { streamId: string; to: Address; smartAccount: Address }) => {
      if (!safeAddress) {
        throw new Error('Can not flush stream without DAO Address');
      }

      const { streamId, to, smartAccount } = args;

      const enableModuleData = encodeFunctionData({
        abi: GnosisSafeL2,
        functionName: 'enableModule',
        args: [daoSablierStreamManagementModule],
      });

      const disableModuleData = encodeFunctionData({
        abi: GnosisSafeL2,
        functionName: 'disableModule',
        args: [SENTINEL_MODULE, daoSablierStreamManagementModule],
      });

      const withdrawMaxFromStreamData = encodeFunctionData({
        abi: legacy.abis.DAOSablierStreamManagementModule,
        functionName: 'withdrawMaxFromStream',
        args: [sablierV2LockupLinear, smartAccount, convertStreamIdToBigInt(streamId), to],
      });

      return [
        {
          targetAddress: safeAddress,
          calldata: enableModuleData,
        },
        {
          targetAddress: daoSablierStreamManagementModule,
          calldata: withdrawMaxFromStreamData,
        },
        {
          targetAddress: safeAddress,
          calldata: disableModuleData,
        },
      ];
    },
    [safeAddress, daoSablierStreamManagementModule, sablierV2LockupLinear],
  );

  const prepareCancelStreamTxs = useCallback(
    (streamId: string) => {
      if (!safeAddress) {
        throw new Error('Can not flush stream without DAO Address');
      }

      const enableModuleData = encodeFunctionData({
        abi: GnosisSafeL2,
        functionName: 'enableModule',
        args: [daoSablierStreamManagementModule],
      });

      const disableModuleData = encodeFunctionData({
        abi: GnosisSafeL2,
        functionName: 'disableModule',
        args: [SENTINEL_MODULE, daoSablierStreamManagementModule],
      });

      const cancelStreamData = encodeFunctionData({
        abi: legacy.abis.DAOSablierStreamManagementModule,
        functionName: 'cancelStream',
        args: [sablierV2LockupLinear, convertStreamIdToBigInt(streamId)],
      });

      return [
        {
          targetAddress: safeAddress,
          calldata: enableModuleData,
        },
        {
          targetAddress: daoSablierStreamManagementModule,
          calldata: cancelStreamData,
        },
        {
          targetAddress: safeAddress,
          calldata: disableModuleData,
        },
      ];
    },
    [safeAddress, daoSablierStreamManagementModule, sablierV2LockupLinear],
  );

  const prepareBatchLinearStreamCreation = useCallback(
    (paymentStreams: PreparedNewStreamData[]) => {
      const preparedStreamCreationTransactions: { calldata: Hex; targetAddress: Address }[] = [];
      const preparedTokenApprovalsTransactions: { calldata: Hex; targetAddress: Address }[] = [];

      const groupedStreams = groupBy(paymentStreams, 'assetAddress');
      Object.keys(groupedStreams).forEach(assetAddress => {
        const assembledStreams: ReturnType<typeof prepareLinearStream>[] = [];
        const streams = groupedStreams[assetAddress];
        let totalStreamsAmount = 0n;
        const tokenAddress = getAddress(assetAddress);
        streams.forEach(streamData => {
          totalStreamsAmount += streamData.totalAmount;

          assembledStreams.push(prepareLinearStream(streamData));
        });

        preparedStreamCreationTransactions.push({
          calldata: encodeFunctionData({
            abi: SablierV2BatchAbi,
            functionName: 'createWithTimestampsLL',
            args: [sablierV2LockupLinear, tokenAddress, assembledStreams],
          }),
          targetAddress: sablierV2Batch,
        });

        preparedTokenApprovalsTransactions.push({
          calldata: prepareStreamTokenCallData(totalStreamsAmount),
          targetAddress: tokenAddress,
        });
      });

      return { preparedStreamCreationTransactions, preparedTokenApprovalsTransactions };
    },
    [prepareLinearStream, prepareStreamTokenCallData, sablierV2Batch, sablierV2LockupLinear],
  );

  return {
    prepareBatchLinearStreamCreation,
    prepareFlushStreamTxs,
    prepareCancelStreamTxs,
    prepareLinearStream,
  };
}
