import { Box, Button, Flex, Icon, Image, Radio, RadioGroup, Text } from '@chakra-ui/react';
import { Check, CheckCircle, Sparkle } from '@phosphor-icons/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TOOLTIP_MAXW } from '../../../constants/common';
import useFeatureFlag from '../../../helpers/environmentFeatureFlags';
import useSnapshotProposal from '../../../hooks/DAO/loaders/snapshot/useSnapshotProposal';
import useCastSnapshotVote from '../../../hooks/DAO/proposal/useCastSnapshotVote';
import useCastVote from '../../../hooks/DAO/proposal/useCastVote';
import { useCurrentDAOKey } from '../../../hooks/DAO/useCurrentDAOKey';
import useCurrentBlockNumber from '../../../hooks/utils/useCurrentBlockNumber';
import { useDAOStore } from '../../../providers/App/AppProvider';
import {
  AzoriusProposal,
  FractalProposal,
  FractalProposalState,
  VOTE_CHOICES,
} from '../../../types';
import { DecentTooltip } from '../../ui/DecentTooltip';
import WeightedInput from '../../ui/forms/WeightedInput';
import { ModalType } from '../../ui/modals/ModalProvider';
import { useDAOModal } from '../../ui/modals/useDecentModal';
import { useVoteContext } from '../ProposalVotes/context/VoteContext';

export function CastVote({ proposal }: { proposal: FractalProposal }) {
  const [selectedVoteChoice, setVoiceChoice] = useState<number>();
  const { t } = useTranslation(['proposal', 'transaction', 'gaslessVoting']);
  const { isLoaded: isCurrentBlockLoaded, currentBlockNumber } = useCurrentBlockNumber();
  const { daoKey } = useCurrentDAOKey();
  const {
    governance: { gaslessVotingEnabled },
  } = useDAOStore({ daoKey });

  const { snapshotProposal, extendedSnapshotProposal, loadSnapshotProposal } =
    useSnapshotProposal(proposal);

  useEffect(() => {
    loadSnapshotProposal();
  }, [loadSnapshotProposal]);

  const azoriusProposal = proposal as AzoriusProposal;

  const { castVote, castVotePending, castGaslessVote, castGaslessVotePending, canCastGaslessVote } =
    useCastVote(proposal.proposalId, azoriusProposal.votingStrategy);

  const {
    castSnapshotVote,
    handleChangeSnapshotWeightedChoice,
    handleSelectSnapshotChoice,
    selectedChoice,
    snapshotWeightedChoice,
  } = useCastSnapshotVote(extendedSnapshotProposal);

  const { canVoteLoading, hasVoted, hasVotedLoading } = useVoteContext();
  const [doRetryGaslessVote, setDoRetryGaslessVote] = useState(false);
  const { open: gaslessVoteSuccessModal } = useDAOModal(ModalType.GASLESS_VOTE_SUCCESS);
  const { open: gaslessVoteFailedModal } = useDAOModal(ModalType.GASLESS_VOTE_FAILED, {
    onRetry: () => {
      setDoRetryGaslessVote(true);
    },
    onFallback: () => {
      if (!selectedVoteChoice) {
        return;
      }

      castVote(selectedVoteChoice);
    },
  });

  // Set a reasonable minimum (slightly higher than the required amount)
  const gaslessFeatureEnabled = useFeatureFlag('flag_gasless_voting');
  const canVoteForFree = useMemo(() => {
    return gaslessFeatureEnabled && gaslessVotingEnabled && canCastGaslessVote;
  }, [canCastGaslessVote, gaslessFeatureEnabled, gaslessVotingEnabled]);

  // If user is lucky enough - he could create a proposal and proceed to vote on it
  // even before the block, in which proposal was created, was mined.
  // This gives a weird behavior when casting vote fails due to requirement under LinearERC20Voting contract that current block number
  // shouldn't be equal to proposal's start block number. Which is dictated by the need to have voting tokens delegation being "finalized" to prevent proposal hijacking.
  const proposalStartBlockNotFinalized = Boolean(
    !snapshotProposal &&
      isCurrentBlockLoaded &&
      currentBlockNumber &&
      azoriusProposal.startBlock >= currentBlockNumber,
  );

  const disabled =
    castVotePending ||
    castGaslessVotePending ||
    azoriusProposal.state !== FractalProposalState.ACTIVE ||
    proposalStartBlockNotFinalized ||
    canVoteLoading ||
    hasVoted ||
    hasVotedLoading;

  const castGaslessVoteCallback = useCallback(async () => {
    (async () => {
      if (!canVoteForFree || selectedVoteChoice === undefined) {
        return;
      }

      await castGaslessVote({
        selectedVoteChoice,
        onSuccess: gaslessVoteSuccessModal,
        onError: (error: any) => {
          console.error('Gasless voting error:', error);
          gaslessVoteFailedModal();
        },
      });
    })();
  }, [
    canVoteForFree,
    castGaslessVote,
    gaslessVoteFailedModal,
    gaslessVoteSuccessModal,
    selectedVoteChoice,
  ]);

  useEffect(() => {
    if (doRetryGaslessVote) {
      castGaslessVoteCallback();
      setDoRetryGaslessVote(false);
    }
  }, [doRetryGaslessVote, castGaslessVoteCallback]);

  const handleVoteClick = async () => {
    if (selectedVoteChoice !== undefined) {
      if (canVoteForFree) {
        await castGaslessVoteCallback();
      } else {
        await castVote(selectedVoteChoice);
      }
    }
  };

  if (snapshotProposal && extendedSnapshotProposal) {
    const isWeighted = extendedSnapshotProposal.type === 'weighted';
    const weightedTotalValue = snapshotWeightedChoice.reduce((prev, curr) => prev + curr, 0);
    const voteDisabled =
      (!isWeighted && typeof selectedChoice === 'undefined') ||
      (isWeighted && weightedTotalValue === 0);

    return (
      <>
        {isWeighted && snapshotWeightedChoice.length > 0
          ? extendedSnapshotProposal.choices.map((choice, i) => (
              <WeightedInput
                key={choice}
                label={choice}
                totalValue={weightedTotalValue}
                value={snapshotWeightedChoice[i]}
                onChange={newValue => handleChangeSnapshotWeightedChoice(i, newValue)}
              />
            ))
          : extendedSnapshotProposal.choices.map((choice, i) => (
              <Button
                key={choice}
                variant="secondary"
                width="full"
                onClick={() => handleSelectSnapshotChoice(i)}
                marginTop={5}
              >
                {selectedChoice === i && (
                  <Icon
                    as={Check}
                    boxSize="1.5rem"
                  />
                )}
                {choice}
              </Button>
            ))}
        <Button
          width="full"
          isDisabled={voteDisabled}
          onClick={() => castSnapshotVote(loadSnapshotProposal)}
          marginTop={5}
          padding="1.5rem 6rem"
          height="auto"
        >
          {t('vote')}
        </Button>
        {hasVoted && (
          <Box
            mt={4}
            color="color-neutral-400"
            fontWeight="600"
          >
            <Flex>
              <Icon
                boxSize="1.5rem"
                mr={2}
                as={CheckCircle}
              />
              <Text>{t('successCastVote', { ns: 'transaction' })}</Text>
            </Flex>
            <Text>{t('snapshotRecastVoteHelper', { ns: 'transaction' })}</Text>
          </Box>
        )}
        <Box
          mt={4}
          color="color-neutral-300"
        >
          <Text>{t('poweredBy')}</Text>
          <Flex>
            <Flex mr={1}>
              {/* TODO: replace with <SnapshotIcon /> */}
              <Image
                src="/images/snapshot-icon-fill.svg"
                alt="Snapshot icon"
                mr={1}
              />
              <Text>{t('snapshot')}</Text>
            </Flex>
            {extendedSnapshotProposal.privacy === 'shutter' && (
              <Flex>
                <Image
                  src="/images/shutter-icon.svg"
                  alt="Shutter icon"
                  mr={1}
                />
                <Text>{t('shutter')}</Text>
              </Flex>
            )}
          </Flex>
        </Box>
      </>
    );
  }

  return (
    <DecentTooltip
      placement="left"
      maxW={TOOLTIP_MAXW}
      title={
        proposalStartBlockNotFinalized
          ? t('proposalStartBlockNotFinalized', { ns: 'proposal' })
          : hasVoted
            ? t('currentUserAlreadyVoted', { ns: 'proposal' })
            : undefined
      }
    >
      <RadioGroup
        mt={6}
        mx={-2}
      >
        {VOTE_CHOICES.map(choice => (
          <Radio
            key={choice.value}
            onChange={event => {
              event.preventDefault();
              if (!disabled) {
                setVoiceChoice(choice.value);
              }
            }}
            width="100%"
            isChecked={choice.value === selectedVoteChoice}
            isDisabled={disabled}
            bg="color-black"
            color="color-lilac-600"
            size="md"
            _disabled={{ bg: 'color-neutral-400', color: 'color-neutral-700' }}
            _hover={{ bg: 'color-black', color: 'color-lilac-800' }}
            _checked={{
              bg: 'color-black',
              color: 'color-lilac-600',
              borderWidth: '6px',
            }}
            mb={2}
          >
            {t(choice.label)}
          </Radio>
        ))}
        <Button
          marginTop={5}
          padding="3"
          height="3.25rem"
          width="full"
          leftIcon={canVoteForFree ? <Icon as={Sparkle} /> : undefined}
          isDisabled={disabled}
          onClick={handleVoteClick}
        >
          {canVoteForFree ? t('voteForFree') : t('vote')}
        </Button>
      </RadioGroup>
    </DecentTooltip>
  );
}
