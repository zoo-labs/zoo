import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Address, encodeFunctionData } from 'viem';
import GnosisSafeL2Abi from '../../../../assets/abi/GnosisSafeL2';
import useSubmitProposal from '../../../../hooks/DAO/proposal/useSubmitProposal';
import { ProposalExecuteData } from '../../../../types';

const useRemoveSigner = ({
  prevSigner,
  signerToRemove,
  threshold,
  nonce,
  safeAddress,
}: {
  prevSigner: Address | undefined;
  signerToRemove: Address;
  threshold: number;
  nonce: number | undefined;
  safeAddress: Address | null;
}) => {
  const { submitProposal } = useSubmitProposal();
  const { t } = useTranslation(['modals']);

  const removeSigner = useCallback(async () => {
    if (!safeAddress || !prevSigner) {
      return;
    }
    const description = 'Remove Signers';

    const encodedRemoveOwner = encodeFunctionData({
      abi: GnosisSafeL2Abi,
      functionName: 'removeOwner',
      args: [prevSigner, signerToRemove, BigInt(threshold)],
    });

    const calldatas = [encodedRemoveOwner];

    const proposalData: ProposalExecuteData = {
      targets: [safeAddress],
      values: [0n],
      calldatas,
      metaData: {
        title: 'Remove Signers',
        description,
        documentationUrl: '',
      },
    };

    await submitProposal({
      proposalData,
      nonce,
      pendingToastMessage: t('removeSignerPendingToastMessage'),
      successToastMessage: t('removeSignerSuccessToastMessage'),
      failedToastMessage: t('removeSignerFailureToastMessage'),
    });
  }, [prevSigner, signerToRemove, threshold, safeAddress, submitProposal, nonce, t]);

  return removeSigner;
};

export default useRemoveSigner;
