import * as amplitude from '@amplitude/analytics-browser';
import { Box, Button, Flex, Grid, Show, Text } from '@chakra-ui/react';
import { ArrowsDownUp, HourglassMedium, Parachute } from '@phosphor-icons/react';
import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AddPlus } from '../../../assets/theme/custom/icons/AddPlus';
import ExampleTemplateCard from '../../../components/ProposalTemplates/ExampleTemplateCard';
import ProposalTemplateCard from '../../../components/ProposalTemplates/ProposalTemplateCard';
import NoDataCard from '../../../components/ui/containers/NoDataCard';
import { InfoBoxLoader } from '../../../components/ui/loaders/InfoBoxLoader';
import { ModalType } from '../../../components/ui/modals/ModalProvider';
import { useDAOModal } from '../../../components/ui/modals/useDecentModal';
import PageHeader from '../../../components/ui/page/Header/PageHeader';
import Divider from '../../../components/ui/utils/Divider';
import { ROLES } from '../../../constants/accessControlRoles';
import { DAO_ROUTES } from '../../../constants/routes';
import { useCurrentDAOKey } from '../../../hooks/DAO/useCurrentDAOKey';
import useLockedToken from '../../../hooks/DAO/useLockedToken';
import useSendAssetsActionModal from '../../../hooks/DAO/useSendAssetsActionModal';
import { useCanUserCreateProposal } from '../../../hooks/utils/useCanUserSubmitProposal';
import { analyticsEvents } from '../../../insights/analyticsEvents';
import { useDAOStore } from '../../../providers/App/AppProvider';
import { useNetworkConfigStore } from '../../../providers/NetworkConfig/useNetworkConfigStore';
import { useProposalActionsStore } from '../../../store/actions/useProposalActionsStore';
import { AirdropData } from '../../../types';
import { ProposalActionType } from '../../../types/proposalBuilder';

export function SafeProposalTemplatesPage() {
  useEffect(() => {
    amplitude.track(analyticsEvents.ProposalTemplatesPageOpened);
  }, []);

  const { t: tModals } = useTranslation('modals');
  const { t: tProposalTemplate } = useTranslation('proposalTemplate');
  const { t: tCommon } = useTranslation('common');
  const { t: tBreadcrumbs } = useTranslation('breadcrumbs');

  const { daoKey } = useCurrentDAOKey();
  const {
    governance: { proposalTemplates },
    treasury: { assetsFungible },
    node: { safe },
  } = useDAOStore({ daoKey });
  const { canUserCreateProposal } = useCanUserCreateProposal();
  const {
    addressPrefix,
    contracts: { disperse },
  } = useNetworkConfigStore();
  const navigate = useNavigate();
  const { addAction, resetActions } = useProposalActionsStore();

  const safeAddress = safe?.address;
  const { openSendAssetsModal } = useSendAssetsActionModal();
  const hasAvailableAssetsForSablierStream =
    assetsFungible.filter(
      asset => !asset.possibleSpam && !asset.nativeToken && parseFloat(asset.balance) > 0,
    ).length > 0;

  const { loadTokenState } = useLockedToken();

  const handleAirdropSubmit = useCallback(
    async (data: AirdropData) => {
      if (!safeAddress) return;

      const totalAmount = data.recipients.reduce((acc, recipient) => acc + recipient.amount, 0n);
      const tokenState = await loadTokenState(data.asset.tokenAddress, disperse);
      let transactions = [
        {
          targetAddress: data.asset.tokenAddress,
          ethValue: {
            bigintValue: 0n,
            value: '0',
          },
          functionName: 'approve',
          parameters: [
            { signature: 'address', value: disperse },
            { signature: 'uint256', value: totalAmount.toString() },
          ],
        },
        {
          targetAddress: disperse,
          ethValue: {
            bigintValue: 0n,
            value: '0',
          },
          functionName: 'disperseToken',
          parameters: [
            { signature: 'address', value: data.asset.tokenAddress },
            {
              signature: 'address[]',
              value: `[${data.recipients.map(recipient => recipient.address).join(',')}]`,
            },
            {
              signature: 'uint256[]',
              value: `[${data.recipients.map(recipient => recipient.amount.toString()).join(',')}]`,
            },
          ],
        },
      ];
      if (tokenState.needWhitelist) {
        transactions = [
          {
            targetAddress: data.asset.tokenAddress,
            ethValue: {
              bigintValue: 0n,
              value: '0',
            },
            functionName: 'grantRole',
            parameters: [
              { signature: 'bytes32', value: ROLES.TRANSFER_FROM_ROLE },
              { signature: 'address', value: disperse },
            ],
          },
          ...transactions,
        ];
      }

      resetActions();
      addAction({
        actionType: ProposalActionType.AIRDROP,
        content: <></>,
        transactions,
      });

      navigate(DAO_ROUTES.proposalWithActionsNew.relative(addressPrefix, safeAddress));
    },
    [addAction, addressPrefix, disperse, loadTokenState, navigate, resetActions, safeAddress],
  );

  const { open: openAirdropModal } = useDAOModal(ModalType.AIRDROP, {
    onSubmit: handleAirdropSubmit,
    submitButtonText: tModals('submitProposal'),
  });

  const EXAMPLE_TEMPLATES = useMemo(() => {
    if (!safeAddress) return [];

    return [
      {
        icon: Parachute,
        title: tProposalTemplate('templateAirdropTitle'),
        description: tProposalTemplate('templateAirdropDescription'),
        onProposalTemplateClick: openAirdropModal,
      },
      {
        icon: HourglassMedium,
        title: tProposalTemplate('templateSablierTitle'),
        description: tProposalTemplate('templateSablierDescription'),
        onProposalTemplateClick: () => {
          if (hasAvailableAssetsForSablierStream) {
            navigate(DAO_ROUTES.proposalSablierNew.relative(addressPrefix, safeAddress));
          } else {
            toast.info(tModals('noAssetsWithBalance'));
          }
        },
      },
      {
        icon: ArrowsDownUp,
        title: tProposalTemplate('templateTransferTitle'),
        description: tProposalTemplate('templateTransferDescription'),
        onProposalTemplateClick: openSendAssetsModal,
      },
    ];
  }, [
    safeAddress,
    tModals,
    tProposalTemplate,
    openAirdropModal,
    openSendAssetsModal,
    hasAvailableAssetsForSablierStream,
    navigate,
    addressPrefix,
  ]);

  return (
    <div>
      <PageHeader
        title={tBreadcrumbs('proposalTemplates')}
        breadcrumbs={[
          {
            terminus: tBreadcrumbs('proposalTemplates'),
            path: '',
          },
        ]}
      >
        {canUserCreateProposal && safeAddress && (
          <Link to={DAO_ROUTES.proposalTemplateNew.relative(addressPrefix, safeAddress)}>
            <Button minW={0}>
              <AddPlus />
              <Show above="sm">{tCommon('create')}</Show>
            </Button>
          </Link>
        )}
      </PageHeader>
      <Flex
        flexDirection={proposalTemplates && proposalTemplates.length > 0 ? 'row' : 'column'}
        flexWrap="wrap"
        gap="1rem"
      >
        {!proposalTemplates ? (
          <Box>
            <InfoBoxLoader />
          </Box>
        ) : proposalTemplates.length > 0 ? (
          <Grid
            templateColumns="repeat(3, 1fr)"
            columnGap="1rem"
            w="full"
          >
            {proposalTemplates.map((proposalTemplate, i) => (
              <ProposalTemplateCard
                key={i}
                proposalTemplate={proposalTemplate}
                templateIndex={i}
              />
            ))}
          </Grid>
        ) : (
          <NoDataCard
            translationNameSpace="proposalTemplate"
            emptyText="emptyProposalTemplates"
            emptyTextNotProposer="emptyProposalTemplatesNotProposer"
          />
        )}
      </Flex>
      <Divider
        variant="light"
        my="2rem"
      />
      <Text
        textStyle="text-3xl-regular"
        color="color-white"
        mb="1rem"
      >
        {tProposalTemplate('defaultTemplates')}
      </Text>
      <Grid
        templateColumns="repeat(4, 1fr)"
        columnGap="1rem"
      >
        {EXAMPLE_TEMPLATES.map((exampleTemplate, i) => (
          <ExampleTemplateCard
            key={i}
            icon={exampleTemplate.icon}
            title={exampleTemplate.title}
            description={exampleTemplate.description}
            onProposalTemplateClick={exampleTemplate.onProposalTemplateClick}
          />
        ))}
      </Grid>
    </div>
  );
}
