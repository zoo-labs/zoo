import { Box, Button, Flex, SimpleGrid, Spacer, Text } from '@chakra-ui/react';
import { legacy } from '@luxdao/contracts';
import { Field, FieldAttributes, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { getAddress, getContract, zeroAddress } from 'viem';
import { useAccount } from 'wagmi';
import * as Yup from 'yup';
import LockReleaseAbi from '../../../assets/abi/LockRelease';
import { useCurrentDAOKey } from '../../../hooks/DAO/useCurrentDAOKey';
import { useValidationAddress } from '../../../hooks/schemas/common/useValidationAddress';
import { useNetworkEnsAddressAsync } from '../../../hooks/useNetworkEnsAddress';
import { useNetworkWalletClient } from '../../../hooks/useNetworkWalletClient';

import { useGetAccountName } from '../../../hooks/utils/useGetAccountName';
import { useTransaction } from '../../../hooks/utils/useTransaction';
import { useDAOStore } from '../../../providers/App/AppProvider';
import { AzoriusGovernance, DAOGovernance } from '../../../types';
import { formatCoin } from '../../../utils/numberFormats';
import { validateENSName } from '../../../utils/url';
import { AddressInput } from '../forms/EthAddressInput';
import LabelWrapper from '../forms/LabelWrapper';
import EtherscanLink from '../links/EtherscanLink';
import Divider from '../utils/Divider';

export function DelegateModal({ close }: { close: Function }) {
  const { t } = useTranslation(['modals', 'common']);
  const { daoKey } = useCurrentDAOKey();
  const {
    governance,
    governanceContracts: { votesTokenAddress, lockReleaseAddress },
  } = useDAOStore({ daoKey });
  const user = useAccount();

  const azoriusGovernance = governance as AzoriusGovernance;
  const daoGovernance = azoriusGovernance as DAOGovernance;
  const delegateeDisplayName = useGetAccountName(azoriusGovernance?.votesToken?.delegatee);
  const lockedDelegateeDisplayName = useGetAccountName(
    daoGovernance?.lockedVotesToken?.delegatee,
  );
  const [contractCall, pending] = useTransaction();
  const { addressValidationTest } = useValidationAddress();
  const { data: walletClient } = useNetworkWalletClient();
  const { getEnsAddress } = useNetworkEnsAddressAsync();

  const submitDelegation = async (values: { address: string }) => {
    if (!votesTokenAddress || !walletClient) return;
    let validAddress = values.address;
    if (validateENSName(validAddress)) {
      const maybeEnsAddress = await getEnsAddress({ name: values.address });
      if (maybeEnsAddress) {
        validAddress = maybeEnsAddress;
      }
    }

    const votingTokenContract = getContract({
      abi: legacy.abis.VotesERC20,
      address: votesTokenAddress,
      client: walletClient,
    });

    contractCall({
      contractFn: () => votingTokenContract.write.delegate([getAddress(validAddress)]),
      pendingMessage: t('pendingDelegateVote'),
      failedMessage: t('failedDelegateVote'),
      successMessage: t('successDelegateVote'),
      successCallback: () => {
        close();
      },
    });
  };
  const submitLockedDelegation = async (values: { address: string }) => {
    if (!lockReleaseAddress || !walletClient) return;
    let validAddress = values.address;
    if (validateENSName(validAddress)) {
      const maybeEnsAddress = await getEnsAddress({ name: values.address });
      if (maybeEnsAddress) {
        validAddress = maybeEnsAddress;
      }
    }

    const lockReleaseContract = getContract({
      abi: LockReleaseAbi,
      address: lockReleaseAddress,
      client: walletClient,
    });

    contractCall({
      contractFn: () => lockReleaseContract.write.delegate([getAddress(validAddress)]),
      pendingMessage: t('pendingDelegateVote'),
      failedMessage: t('failedDelegateVote'),
      successMessage: t('successDelegateVote'),
      successCallback: async () => {
        close();
      },
    });
  };

  const delegationValidationSchema = Yup.object().shape({
    address: Yup.string().test(addressValidationTest),
  });

  if (!azoriusGovernance.votesToken) return null;

  return (
    <Box>
      <SimpleGrid
        columns={2}
        color="color-neutral-300"
      >
        <Text
          align="start"
          marginBottom="0.5rem"
        >
          {t('titleBalance')}
        </Text>
        <Text
          align="end"
          color="color-neutral-300"
        >
          {formatCoin(
            azoriusGovernance.votesToken.balance || 0n,
            false,
            azoriusGovernance.votesToken.decimals,
            azoriusGovernance.votesToken.symbol,
          )}
        </Text>
        <Text
          align="start"
          marginBottom="1rem"
        >
          {t('titleDelegatedTo')}
        </Text>
        <Text
          align="end"
          color="color-neutral-300"
        >
          {azoriusGovernance.votesToken.delegatee === zeroAddress ? (
            '--'
          ) : (
            <EtherscanLink
              type="address"
              value={azoriusGovernance.votesToken.delegatee}
            >
              {delegateeDisplayName.displayName}
            </EtherscanLink>
          )}
        </Text>
      </SimpleGrid>
      {daoGovernance.lockedVotesToken?.balance !== null &&
        daoGovernance.lockedVotesToken?.balance !== undefined && (
          <SimpleGrid
            columns={2}
            color="color-neutral-400"
          >
            <Text
              align="start"
              marginBottom="0.5rem"
            >
              {t('titleLockedBalance')}
            </Text>
            <Text
              align="end"
              color="color-neutral-300"
            >
              {formatCoin(
                daoGovernance.lockedVotesToken.balance || 0n,
                false,
                azoriusGovernance.votesToken.decimals,
                azoriusGovernance.votesToken.symbol,
              )}
            </Text>
            <Text
              align="start"
              marginBottom="1rem"
            >
              {t('titleDelegatedTo')}
            </Text>
            <Text
              align="end"
              color="color-neutral-300"
            >
              {daoGovernance.lockedVotesToken.delegatee === zeroAddress ? (
                '--'
              ) : (
                <EtherscanLink
                  type="address"
                  value={daoGovernance.lockedVotesToken.delegatee}
                >
                  {lockedDelegateeDisplayName.displayName}
                </EtherscanLink>
              )}
            </Text>
          </SimpleGrid>
        )}
      <Divider marginBottom="1rem" />
      <Formik
        initialValues={{
          address: '',
        }}
        onSubmit={submitDelegation}
        validationSchema={delegationValidationSchema}
      >
        {({ handleSubmit, setFieldValue, values, errors }) => (
          <form onSubmit={handleSubmit}>
            <Flex alignItems="center">
              <Text color="color-neutral-300">{t('labelDelegateInput')}</Text>
              <Spacer />
              <Button
                pr={0}
                variant="text"
                color="color-lilac-600"
                onClick={() => (user.address ? setFieldValue('address', user.address) : null)}
              >
                {t('linkSelfDelegate')}
              </Button>
            </Flex>
            <Field name={'address'}>
              {({ field }: FieldAttributes<any>) => (
                <LabelWrapper
                  subLabel={t('sublabelDelegateInput')}
                  errorMessage={errors.address}
                >
                  <AddressInput
                    data-testid="delegate-addressInput"
                    isInvalid={!!errors.address}
                    {...field}
                  />
                </LabelWrapper>
              )}
            </Field>
            <Button
              type="submit"
              marginTop="3rem"
              width="100%"
              isDisabled={
                !!errors.address ||
                pending ||
                !values.address ||
                values.address === azoriusGovernance.votesToken?.delegatee
              }
            >
              {t('buttonDelegate')}
            </Button>
            {daoGovernance.lockedVotesToken?.balance !== null &&
              daoGovernance.lockedVotesToken?.balance !== undefined && (
                <Button
                  marginTop="2rem"
                  width="100%"
                  onClick={() => submitLockedDelegation({ address: values.address })}
                  isDisabled={
                    !!errors.address ||
                    pending ||
                    !values.address ||
                    values.address === daoGovernance.lockedVotesToken.delegatee
                  }
                >
                  {t('buttonLockedDelegate')}
                </Button>
              )}
          </form>
        )}
      </Formik>
    </Box>
  );
}
