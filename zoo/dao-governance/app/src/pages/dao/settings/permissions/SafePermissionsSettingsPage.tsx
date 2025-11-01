import { Box, Button, Flex, IconButton, Show, Text, useBreakpointValue } from '@chakra-ui/react';
import { Coins, Plus } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { zeroAddress } from 'viem';
import PencilWithLineIcon from '../../../../assets/theme/custom/icons/PencilWithLineIcon';
import { SettingsContentBox } from '../../../../components/SafeSettings/SettingsContentBox';
import { Card } from '../../../../components/ui/cards/Card';
import NoDataCard from '../../../../components/ui/containers/NoDataCard';
import { BarLoader } from '../../../../components/ui/loaders/BarLoader';
import { ModalType } from '../../../../components/ui/modals/ModalProvider';
import { useDAOModal } from '../../../../components/ui/modals/useDecentModal';
import NestedPageHeader from '../../../../components/ui/page/Header/NestedPageHeader';
import Divider from '../../../../components/ui/utils/Divider';
import { NEUTRAL_2_82_TRANSPARENT } from '../../../../constants/common';
import { DAO_ROUTES } from '../../../../constants/routes';
import { useCurrentDAOKey } from '../../../../hooks/DAO/useCurrentDAOKey';
import { useCanUserCreateProposal } from '../../../../hooks/utils/useCanUserSubmitProposal';
import { useDAOStore } from '../../../../providers/App/AppProvider';
import { useNetworkConfigStore } from '../../../../providers/NetworkConfig/useNetworkConfigStore';
import { AzoriusGovernance } from '../../../../types';

export function SafePermissionsSettingsPage() {
  const { t } = useTranslation(['settings', 'common']);
  const navigate = useNavigate();
  const { addressPrefix } = useNetworkConfigStore();
  const { daoKey } = useCurrentDAOKey();
  const {
    governance,
    governanceContracts: { isLoaded, linearVotingErc20Address, linearVotingErc721Address },
    node: { safe },
  } = useDAOStore({ daoKey });

  const { canUserCreateProposal } = useCanUserCreateProposal();
  const azoriusGovernance = governance as AzoriusGovernance;
  const { votesToken, erc721Tokens } = azoriusGovernance;

  const isMobile = useBreakpointValue({ base: true, md: false });
  const [searchParams] = useSearchParams();
  const votingStrategyAddress = searchParams.get('votingStrategy');

  const { open: openAddPermissionModal } = useDAOModal(ModalType.ADD_PERMISSION);

  if (isMobile && votingStrategyAddress) {
    return <Outlet />;
  }

  if (!safe) {
    return null;
  }

  const proposerThreshold = azoriusGovernance.votingStrategy?.proposerThreshold?.formatted;

  return (
    <>
      <Show below="md">
        <NestedPageHeader
          title={t('permissionsTitle')}
          backButton={{
            text: t('settings'),
            href: DAO_ROUTES.settings.relative(addressPrefix, safe.address),
          }}
        >
          {!linearVotingErc20Address && !linearVotingErc721Address && (
            <Flex
              width="25%"
              justifyContent="flex-end"
            >
              <IconButton
                aria-label={t('addOwner', { ns: 'common' })}
                size="icon-md"
                variant="ghost"
                color="color-neutral-400"
                icon={<Plus size={24} />}
                onClick={() =>
                  navigate(
                    DAO_ROUTES.settingsPermissionsCreateProposal.relative(
                      addressPrefix,
                      safe.address,
                      zeroAddress,
                    ),
                  )
                }
              />
            </Flex>
          )}
        </NestedPageHeader>
      </Show>
      <SettingsContentBox
        flexDirection="column"
        gap={{ base: 4, md: 6 }}
        display="flex"
        bg={{ base: 'transparent', md: NEUTRAL_2_82_TRANSPARENT }}
      >
        {!isLoaded ? (
          <Card
            my="0.5rem"
            justifyContent="center"
            display="flex"
          >
            <BarLoader />
          </Card>
        ) : (!votesToken || !linearVotingErc20Address) &&
          (!erc721Tokens || !linearVotingErc721Address) ? (
          <NoDataCard
            emptyText="emptyPermissions"
            emptyTextNotProposer="emptyPermissionsNotProposer"
            translationNameSpace="settings"
          />
        ) : (
          <Card
            onClick={
              canUserCreateProposal && (linearVotingErc20Address || linearVotingErc721Address)
                ? () =>
                    navigate(
                      DAO_ROUTES.settingsPermissionsCreateProposal.relative(
                        addressPrefix,
                        safe.address,
                        linearVotingErc20Address || linearVotingErc721Address,
                      ),
                    )
                : undefined
            }
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
                          symbol: votesToken.symbol,
                          proposerThreshold,
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
          </Card>
        )}

        {canUserCreateProposal && (
          <Flex flexDir="column">
            <Divider mb={4} />
            <Button
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
      </SettingsContentBox>
      <Outlet />
    </>
  );
}
