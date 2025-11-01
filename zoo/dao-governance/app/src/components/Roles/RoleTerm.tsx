import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import { legacy } from '@luxdao/contracts';
import { ArrowRight, Calendar, ClockCountdown, Copy } from '@phosphor-icons/react';
import { format } from 'date-fns';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Address, getContract, Hex } from 'viem';
import { DETAILS_BOX_SHADOW } from '../../constants/common';
import { useDateTimeDisplay } from '../../helpers/dateTime';
import { useNetworkEnsAvatar } from '../../hooks/useNetworkEnsAvatar';
import { useNetworkWalletClient } from '../../hooks/useNetworkWalletClient';
import { useCopyText } from '../../hooks/utils/useCopyText';
import { useGetAccountName } from '../../hooks/utils/useGetAccountName';
import { useTransaction } from '../../hooks/utils/useTransaction';
import { useNetworkConfigStore } from '../../providers/NetworkConfig/useNetworkConfigStore';
import { useRolesStore } from '../../store/roles/useRolesStore';
import { RoleFormTermStatus } from '../../types/roles';
import { DEFAULT_DATE_TIME_FORMAT_NO_TZ } from '../../utils';
import Avatar from '../ui/page/Header/Avatar';

function Container({
  children,
  isTop = false,
  displayLightContainer = false,
}: {
  isTop?: boolean;
  displayLightContainer?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Box
      p="1rem"
      bg="color-neutral-950"
      boxShadow={displayLightContainer ? 'layeredShadowBorder' : DETAILS_BOX_SHADOW}
      borderTopRadius={isTop ? '0.5rem' : undefined}
      borderBottomRadius={!isTop ? '0.5rem' : undefined}
      display="flex"
      flexDirection="column"
      gap="1rem"
      border={displayLightContainer ? '1px solid' : undefined}
      borderColor={displayLightContainer ? 'color-neutral-800' : undefined}
    >
      {children}
    </Box>
  );
}

function RoleTermHeaderTitle({
  termNumber,
  termPosition,
}: {
  termNumber: number;
  termPosition?: 'currentTerm' | 'nextTerm';
}) {
  const { t } = useTranslation(['roles']);

  return (
    <Flex
      gap={2}
      alignItems="center"
    >
      <Text textStyle="text-xl-regular">{t('termNumber', { number: termNumber })}</Text>
      <Text
        textStyle="text-xs-medium"
        color="color-neutral-700"
      >
        {!!termPosition && t(termPosition)}
      </Text>
    </Flex>
  );
}

function RoleTermHeaderStatus({
  termEndDate,
  termStatus,
}: {
  termEndDate: Date;
  termStatus: RoleFormTermStatus;
}) {
  const { t } = useTranslation(['roles']);
  const dateDisplay = useDateTimeDisplay(termEndDate);

  const statusText = useMemo(() => {
    const statusTextData = {
      ended: {
        text: t('ended'),
        textColor: 'color-neutral-400',
        iconColor: 'color-neutral-400',
      },
      inQueue: {
        text: t('inQueue'),
        textColor: 'color-neutral-300',
        iconColor: 'color-lilac-100',
      },
      pending: {
        text: t('pending'),
        textColor: 'color-neutral-300',
        iconColor: 'color-lilac-100',
      },
      readyToStart: {
        text: t('readyToStart'),
        textColor: 'color-neutral-300',
        iconColor: 'color-lilac-100',
      },
      active: {
        text: dateDisplay,
        textColor: 'color-neutral-300',
        iconColor: 'color-lilac-100',
      },
      revoked: {
        text: t('revoked'),
        textColor: 'color-error-400',
        iconColor: 'color-error-400',
      },
    };

    switch (termStatus) {
      case RoleFormTermStatus.Expired:
        return statusTextData.ended;
      case RoleFormTermStatus.Queued:
        return statusTextData.inQueue;
      case RoleFormTermStatus.Pending:
        return statusTextData.pending;
      case RoleFormTermStatus.Current:
        return statusTextData.active;
      case RoleFormTermStatus.ReadyToStart:
        return statusTextData.readyToStart;
      default:
        return {
          text: undefined,
          textColor: undefined,
          iconColor: undefined,
        };
    }
  }, [dateDisplay, termStatus, t]);
  return (
    <Flex
      gap={1}
      alignItems="center"
    >
      <Icon
        as={ClockCountdown}
        boxSize="1rem"
        weight="fill"
        color={statusText.iconColor}
      />
      <Text
        textStyle="text-xs-medium"
        color={statusText.textColor}
      >
        {statusText.text}
      </Text>
    </Flex>
  );
}

function RoleTermHeader({
  termNumber,
  termEndDate,
  termStatus,
  termPosition,
  displayLightContainer,
}: {
  termNumber: number;
  termEndDate: Date;
  termStatus: RoleFormTermStatus;
  termPosition?: 'currentTerm' | 'nextTerm';
  displayLightContainer?: boolean;
}) {
  return (
    <Container
      isTop
      displayLightContainer={displayLightContainer}
    >
      <Flex justifyContent="space-between">
        <RoleTermHeaderTitle
          termNumber={termNumber}
          termPosition={termPosition}
        />
        <RoleTermHeaderStatus
          termEndDate={termEndDate}
          termStatus={termStatus}
        />
      </Flex>
    </Container>
  );
}

function RoleTermMemberAddress({ memberAddress }: { memberAddress: Address }) {
  const { t } = useTranslation(['roles', 'common']);
  const { displayName: accountDisplayName } = useGetAccountName(memberAddress);
  const { data: avatarURL } = useNetworkEnsAvatar({ name: memberAddress });
  const copyToClipboard = useCopyText();
  return (
    <Flex flexDir="column">
      <Text
        textStyle="text-xs-medium"
        color="color-neutral-300"
      >
        {t('member')}
      </Text>
      <Flex
        alignItems="center"
        gap={2}
      >
        <Avatar
          size="icon"
          address={memberAddress}
          url={avatarURL}
        />
        <Button
          variant="unstyled"
          p={0}
          h="fit-content"
          aria-label={t('copyAddress', { ns: 'common' })}
          onClick={() => copyToClipboard(memberAddress)}
          rightIcon={
            <Icon
              as={Copy}
              boxSize="1rem"
              color="color-white"
            />
          }
        >
          <Text
            textStyle="text-sm-medium"
            color="color-white"
          >
            {accountDisplayName}
          </Text>
        </Button>
      </Flex>
    </Flex>
  );
}

function RoleTermEndDate({ termEndDate }: { termEndDate: Date }) {
  const { t } = useTranslation(['roles']);
  return (
    <Flex flexDir="column">
      <Text
        textStyle="text-xs-medium"
        color="color-neutral-300"
      >
        {t('ending')}
      </Text>
      <Flex
        gap={1}
        alignItems="center"
      >
        <Icon
          as={Calendar}
          boxSize="1.5rem"
        />
        <Text
          textStyle="text-sm-medium"
          color="white"
        >
          {format(termEndDate, DEFAULT_DATE_TIME_FORMAT_NO_TZ)}
        </Text>
      </Flex>
    </Flex>
  );
}

export default function RoleTerm({
  hatId,
  termNominatedWearer,
  termEndDate,
  termStatus,
  termNumber,
  displayLightContainer,
}: {
  hatId: Hex | undefined;
  termNominatedWearer: Address;
  termEndDate: Date;
  termNumber: number;
  termStatus: RoleFormTermStatus;
  displayLightContainer?: boolean;
}) {
  const [contractCall, contractCallPending] = useTransaction();
  const { hatsTree, getHat, updateCurrentTermStatus } = useRolesStore();
  const { data: walletClient } = useNetworkWalletClient();
  const { t } = useTranslation(['roles']);
  const {
    contracts: { hatsProtocol },
  } = useNetworkConfigStore();

  const roleHat = useMemo(() => {
    if (!hatId) return undefined;
    return getHat(hatId);
  }, [getHat, hatId]);

  const termPosition = useMemo(() => {
    if (!roleHat) return undefined;
    const currentTermEndDate = roleHat.roleTerms.currentTerm?.termEndDate;
    const nextTermEndDate = roleHat.roleTerms.nextTerm?.termEndDate;
    if (currentTermEndDate && termEndDate.getTime() === currentTermEndDate.getTime())
      return 'currentTerm';
    if (nextTermEndDate && termEndDate.getTime() === nextTermEndDate.getTime()) return 'nextTerm';
  }, [roleHat, termEndDate]);

  const wearerAddress = roleHat?.wearerAddress;

  const handleTriggerStartTerm = useCallback(async () => {
    const adminHatWearer = hatsTree?.adminHat.wearer;

    if (!wearerAddress) {
      throw new Error('Current hat must be worn by a member');
    }
    if (adminHatWearer === undefined) {
      throw new Error('Admin hat must be worn by DAO Autonomous Admin');
    }
    if (!walletClient) {
      throw new Error('Public client not found');
    }
    if (!roleHat) {
      throw new Error('roleHat not found');
    }
    const eligibilityAddress = roleHat.eligibility;
    if (!eligibilityAddress) {
      throw new Error('Election eligibility contract not found');
    }

    contractCall({
      contractFn: () => {
        const daoAutonomousAdminContract = getContract({
          abi: legacy.abis.DAOAutonomousAdminV1,
          address: adminHatWearer,
          client: walletClient,
        });
        return daoAutonomousAdminContract.write.triggerStartNextTerm([
          {
            currentWearer: wearerAddress,
            hatsProtocol,
            hatId: BigInt(roleHat.id),
            nominatedWearer: termNominatedWearer,
          },
        ]);
      },
      pendingMessage: t('startTermPendingToastMessage'),
      failedMessage: t('startTermFailureToastMessage'),
      successMessage: t('startTermSuccessToastMessage'),
      successCallback: () => {
        updateCurrentTermStatus(roleHat.id, 'active');
      },
    });
  }, [
    contractCall,
    hatsProtocol,
    hatsTree?.adminHat.wearer,
    roleHat,
    t,
    termNominatedWearer,
    updateCurrentTermStatus,
    walletClient,
    wearerAddress,
  ]);

  return (
    <Box>
      <RoleTermHeader
        termNumber={termNumber}
        termEndDate={termEndDate}
        termStatus={termStatus}
        termPosition={termPosition}
        displayLightContainer={displayLightContainer}
      />
      <Container displayLightContainer={displayLightContainer}>
        <Flex justifyContent="space-between">
          <RoleTermMemberAddress memberAddress={termNominatedWearer} />
          <RoleTermEndDate termEndDate={termEndDate} />
        </Flex>
        {!!roleHat?.roleTerms.currentTerm &&
          !roleHat.roleTerms.currentTerm.isActive &&
          termPosition === 'currentTerm' && (
            <Button
              isDisabled={contractCallPending}
              leftIcon={
                <Icon
                  as={ArrowRight}
                  size="1.25rem"
                />
              }
              onClick={handleTriggerStartTerm}
            >
              {t('startTerm')}
            </Button>
          )}
      </Container>
    </Box>
  );
}
