import { Box, Button, Flex, IconButton, Text } from '@chakra-ui/react';
import { Coins, Plus } from '@phosphor-icons/react';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import PencilWithLineIcon from '../../../../assets/theme/custom/icons/PencilWithLineIcon';
import { SettingsContentBox } from '../../../../components/SafeSettings/SettingsContentBox';
import NoDataCard from '../../../../components/ui/containers/NoDataCard';
import { BarLoader } from '../../../../components/ui/loaders/BarLoader';
import { ModalType } from '../../../../components/ui/modals/ModalProvider';
import { SafeSettingsEdits } from '../../../../components/ui/modals/SafeSettingsModal';
import { useDAOModal } from '../../../../components/ui/modals/useDecentModal';
import Divider from '../../../../components/ui/utils/Divider';
import { NEUTRAL_2_82_TRANSPARENT } from '../../../../constants/common';
import { useCurrentDAOKey } from '../../../../hooks/DAO/useCurrentDAOKey';
import { useCanUserCreateProposal } from '../../../../hooks/utils/useCanUserSubmitProposal';
import { useDAOStore } from '../../../../providers/App/AppProvider';
import { AzoriusGovernance } from '../../../../types';

export function SafePermissionsSettingsContent() {
  const { t } = useTranslation(['settings', 'common']);
  const { daoKey } = useCurrentDAOKey();
  const {
    governance,
    governanceContracts: { isLoaded, linearVotingErc20Address, linearVotingErc721Address },
    node: { safe },
  } = useDAOStore({ daoKey });

  const { canUserCreateProposal } = useCanUserCreateProposal();
  const azoriusGovernance = governance as AzoriusGovernance;
  const { votesToken, erc721Tokens } = azoriusGovernance;

  const { values } = useFormikContext<SafeSettingsEdits>();

  const { open: openAddCreateProposalPermissionModal } = useDAOModal(
    ModalType.ADD_CREATE_PROPOSAL_PERMISSION,
    {
      votingStrategyAddress: null,
    },
  );

  const { open: openAddPermissionModal } = useDAOModal(ModalType.ADD_PERMISSION, {
    openAddCreateProposalPermissionModal,
  });

  const { open: openCreateProposalPermissionModal } = useDAOModal(
    ModalType.ADD_CREATE_PROPOSAL_PERMISSION,
    {
      votingStrategyAddress: linearVotingErc20Address || null,
    },
  );

  if (!safe) {
    return null;
  }

  const editedProposerThreshold = values.permissions?.proposerThreshold?.value?.toString();

  const proposerThresholdValue =
    editedProposerThreshold || azoriusGovernance.votingStrategy?.proposerThreshold?.formatted;

  const proposerThreshold = editedProposerThreshold
    ? `${proposerThresholdValue}*`
    : proposerThresholdValue;

  return (
    <>
      <SettingsContentBox
        flexDirection="column"
        display="flex"
        bg={{ base: 'transparent', md: NEUTRAL_2_82_TRANSPARENT }}
      >
        <Text
          mb={0.5}
          textStyle="text-lg-regular"
          color="color-white"
        >
          {t('permissionsTitle')}
        </Text>

        <Flex
          flexDirection="column"
          border="1px solid"
          borderColor="color-neutral-900"
          borderRadius="0.75rem"
        >
          {!isLoaded ? (
            <Box
              my="0.5rem"
              justifyContent="center"
              display="flex"
            >
              <BarLoader />
            </Box>
          ) : (!votesToken || !linearVotingErc20Address) &&
            (!erc721Tokens || !linearVotingErc721Address) ? (
            <NoDataCard
              emptyText="emptyPermissions"
              emptyTextNotProposer="emptyPermissionsNotProposer"
              translationNameSpace="settings"
              flatten
            />
          ) : (
            <Box
              p={4}
              borderRadius="0.75rem"
              onClick={openCreateProposalPermissionModal}
              sx={{
                _hover: {
                  backgroundColor: 'color-neutral-900',
                  button: {
                    opacity: 1,
                  },
                },
              }}
            >
              <Flex justifyContent="space-between">
                <Flex
                  gap={4}
                  alignItems="flex-start"
                >
                  <Box
                    borderRadius="50%"
                    bg="color-neutral-900"
                    color="color-lilac-100"
                    padding={1}
                  >
                    <Coins fontSize="1.5rem" />
                  </Box>
                  <Box>
                    <Text>{t('permissionCreateProposalsTitle')}</Text>
                    <Text
                      textStyle="text-sm-medium"
                      color="color-neutral-300"
                    >
                      {votesToken
                        ? t('permissionsErc20CreateProposalsDescription', {
                            proposerThreshold,
                            symbol: votesToken.symbol,
                          })
                        : t('permissionsErc721CreateProposalsDescription', {
                            proposerThreshold,
                            symbol: erc721Tokens?.[0]?.symbol,
                            count: erc721Tokens?.length,
                          })}
                    </Text>
                  </Box>
                </Flex>
                {canUserCreateProposal && (
                  <IconButton
                    variant="secondary"
                    size="icon-md"
                    icon={<PencilWithLineIcon />}
                    aria-label={t('edit')}
                    opacity={0}
                    color="color-neutral-400"
                    border="none"
                  />
                )}
              </Flex>
            </Box>
          )}
          {canUserCreateProposal && (
            <Flex flexDir="column">
              <Divider />
              <Button
                m={4}
                variant="secondary"
                size="sm"
                leftIcon={<Plus />}
                width="max-content"
                onClick={openAddPermissionModal}
                alignSelf="flex-end"
              >
                {t('addPermission')}
              </Button>
            </Flex>
          )}
        </Flex>
      </SettingsContentBox>
    </>
  );
}
