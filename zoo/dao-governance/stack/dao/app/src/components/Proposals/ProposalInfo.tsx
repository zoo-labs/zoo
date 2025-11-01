import { Box, Button, Flex, Link, Text } from '@chakra-ui/react';
import { ArrowUpRight } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { Shield } from '../../assets/theme/custom/icons/Shield';
import { findMostConfirmedMultisigRejectionProposal } from '../../helpers/multisigProposal';
import useSnapshotProposal from '../../hooks/DAO/loaders/snapshot/useSnapshotProposal';
import { useGetMetadata } from '../../hooks/DAO/proposal/useGetMetadata';
import { useCurrentDAOKey } from '../../hooks/DAO/useCurrentDAOKey';
import { useDAOStore } from '../../providers/App/AppProvider';
import {
  ExtendedSnapshotProposal,
  FractalProposal,
  FractalProposalState,
  GovernanceType,
  MultisigProposal,
} from '../../types';
import { ActivityDescription } from '../Activity/ActivityDescription';
import { ProposalStateBadge } from '../ui/badges/Badge';
import { SignerThresholdBadge } from '../ui/badges/SignerThresholdBadge';
import { SnapshotButton } from '../ui/badges/Snapshot';
import { ModalType } from '../ui/modals/ModalProvider';
import { useDAOModal } from '../ui/modals/useDecentModal';
import { ProposalCountdown } from '../ui/proposal/ProposalCountdown';
import ProposalExecutableCode from '../ui/proposal/ProposalExecutableCode';
import CeleryButtonWithIcon from '../ui/utils/CeleryButtonWithIcon';
import { MultisigConflictingProposals } from './MultisigProposalDetails/MultisigConflictingProposals';

function NonceLabel({ nonce }: { nonce: number | undefined }) {
  const { t } = useTranslation('proposal');
  const { daoKey } = useCurrentDAOKey();
  const { governance } = useDAOStore({ daoKey });
  const isMultisig = governance.type === GovernanceType.MULTISIG;

  if (!isMultisig || nonce === undefined) return null;
  return (
    <Text
      mb={2}
      textStyle="text-sm-medium"
      color="color-neutral-300"
    >
      {t('nonceLabel', {
        number: nonce,
      })}
    </Text>
  );
}

export function ProposalInfo({
  proposal,
}: {
  proposal: FractalProposal | ExtendedSnapshotProposal;
}) {
  const metaData = useGetMetadata(proposal);
  const { t } = useTranslation('proposal');
  const { daoKey } = useCurrentDAOKey();
  const {
    node: { subgraphInfo, safe },
    governance: { proposals },
  } = useDAOStore({ daoKey });
  const { snapshotProposal } = useSnapshotProposal(proposal);

  const { open: confirmUrl } = useDAOModal(ModalType.CONFIRM_URL, {
    url: metaData.documentationUrl,
  });

  const rejectionProposal = findMostConfirmedMultisigRejectionProposal(
    safe?.address,
    (proposal as MultisigProposal).nonce,
    proposals,
  );

  return (
    <Box
      borderRadius={8}
      border="1px solid"
      borderColor="color-neutral-900"
      padding="1.5rem"
    >
      <Flex
        gap={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex
          gap={2}
          alignItems="center"
        >
          {proposal.state && (
            <ProposalStateBadge
              size="base"
              labelKey={proposal.state}
              rejectionProposalState={rejectionProposal?.state}
            />
          )}
          <ProposalCountdown
            proposal={proposal}
            rejectionProposal={rejectionProposal}
            showIcon={false}
            textColor="color-neutral-300"
          />
          {snapshotProposal && subgraphInfo && (
            <>
              <SnapshotButton
                snapshotENS={`${subgraphInfo.daoSnapshotENS}/proposal/${snapshotProposal.proposalId}`}
              />
              {(proposal as ExtendedSnapshotProposal).privacy === 'shutter' && (
                <Button
                  as={Link}
                  target="_blank"
                  href="https://blog.shutter.network/announcing-shutter-governance-shielded-voting-for-daos/"
                  variant="secondary"
                  h={6}
                  w={32}
                >
                  <Shield
                    width="16px"
                    height="16px"
                    mr={1}
                  />
                  {t('shutterPrivacy')}
                </Button>
              )}
            </>
          )}
        </Flex>
        <Flex
          gap={4}
          alignItems="center"
        >
          <NonceLabel nonce={(proposal as MultisigProposal).nonce} />
          <SignerThresholdBadge
            numberOfConfirmedSigners={(proposal as MultisigProposal).confirmations?.length}
            proposalThreshold={(proposal as MultisigProposal).signersThreshold}
            isRejected={proposal.state === FractalProposalState.REJECTED}
          />
        </Flex>
      </Flex>
      <Box mt={4}>
        <ActivityDescription
          activity={proposal}
          showFullDescription
          showAuthor={false}
        />
        {metaData.documentationUrl && (
          <CeleryButtonWithIcon
            iconPosition="end"
            icon={ArrowUpRight}
            onClick={confirmUrl}
            text={metaData.documentationUrl}
          />
        )}
        <ProposalExecutableCode proposal={proposal} />
        <MultisigConflictingProposals proposal={proposal} />
      </Box>
    </Box>
  );
}
