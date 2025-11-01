import { Box, Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Tooltip } from '../utils/Tooltip';

export type BadgeType = {
  tooltipKey?: string;
  bg: string;
  _hover: { bg: string; textColor: string };
  textColor: string;
};

export type BadgeLabelKey = string;

export const BADGE_MAPPING: Record<string, BadgeType> = {
  active: {
    tooltipKey: 'stateActiveTip',
    bg: 'color-lilac-100',
    textColor: 'color-lilac-700',
    _hover: { bg: 'color-lilac-200', textColor: 'color-lilac-700' },
  },
  timelocked: {
    tooltipKey: 'stateTimelockedTip',
    bg: 'color-neutral-100',
    textColor: 'color-neutral-800',
    _hover: { bg: 'color-neutral-300', textColor: 'color-neutral-800' },
  },
  executed: {
    tooltipKey: 'stateExecutedTip',
    bg: 'color-green-800',
    textColor: 'color-white',
    _hover: { bg: 'color-green-950', textColor: 'color-white' },
  },
  executable: {
    tooltipKey: 'stateExecutableTip',
    bg: 'color-green-500',
    textColor: 'color-black',
    _hover: { bg: 'color-green-600', textColor: 'color-black' },
  },
  failed: {
    tooltipKey: 'stateFailedTip',
    bg: 'color-error-500',
    textColor: 'color-error-50',
    _hover: { bg: 'color-error-800', textColor: 'color-error-50' },
  },
  expired: {
    tooltipKey: 'stateExpiredTip',
    bg: 'color-neutral-800',
    textColor: 'color-neutral-300',
    _hover: { bg: 'color-neutral-950', textColor: 'color-neutral-300' },
  },
  rejected: {
    tooltipKey: 'stateRejectedTip',
    bg: 'color-error-500',
    textColor: 'color-error-50',
    _hover: { bg: 'color-error-800', textColor: 'color-error-50' },
  },
  pending: {
    tooltipKey: 'statePendingTip',
    bg: 'color-yellow-200',
    textColor: 'color-black',
    _hover: { bg: 'color-yellow-200', textColor: 'color-yellow-950' },
  },
  closed: {
    tooltipKey: 'stateClosedTip',
    bg: 'color-neutral-100',
    textColor: 'color-neutral-800',
    _hover: { bg: 'color-neutral-300', textColor: 'color-neutral-800' },
  },
  freezeInit: {
    tooltipKey: 'stateFreezeInitTip',
    bg: 'color-blue-300',
    textColor: 'color-blue-900',
    _hover: { bg: 'color-blue-200', textColor: 'color-blue-900' },
  },
  frozen: {
    tooltipKey: 'stateFrozenTip',
    bg: 'color-blue-300',
    textColor: 'color-blue-900',
    _hover: { bg: 'color-blue-200', textColor: 'color-blue-900' },
  },
  ownerApproved: {
    bg: 'color-neutral-800',
    textColor: 'color-neutral-300',
    _hover: { bg: 'color-neutral-950', textColor: 'color-neutral-300' },
  },
  ownerRejected: {
    bg: 'color-error-500',
    textColor: 'color-error-50',
    _hover: { bg: 'color-error-800', textColor: 'color-error-50' },
  },
};

export type BadgeSize = 'sm' | 'base';

const BADGE_SIZES: Record<BadgeSize, { minWidth: string; height: string }> = {
  sm: { minWidth: '5rem', height: '1.375rem' },
  base: { minWidth: '5.4375rem', height: '1.375rem' },
};

export interface BadgeProps {
  size: BadgeSize;
  labelKey: BadgeLabelKey;
  label?: string;
  tooltip?: string;
  children?: ReactNode;
  leftIcon?: ReactNode;
}

export function Badge({ labelKey, label, tooltip, children, size, leftIcon }: BadgeProps) {
  const badgeConfig = BADGE_MAPPING[labelKey] || BADGE_MAPPING.pending;
  const { tooltipKey, ...colors } = badgeConfig;
  const sizes = BADGE_SIZES[size];

  return (
    <Tooltip
      label={tooltip || tooltipKey}
      maxW="200px"
      placement="top"
    >
      <Flex
        alignItems="center"
        gap="0.5rem"
        borderRadius="0.75rem"
        justifyContent="center"
        h="1.5rem"
        w="fit-content"
        p="0.5rem"
        lineHeight={1.5}
        {...sizes}
        {...colors}
      >
        {leftIcon !== undefined ? (
          leftIcon
        ) : (
          <Box
            rounded="full"
            bg={colors.textColor}
            w="0.5rem"
            h="0.5rem"
          />
        )}
        <Text
          textStyle="text-sm-medium"
          lineHeight="1"
        >
          {children || label || labelKey}
        </Text>
      </Flex>
    </Tooltip>
  );
}