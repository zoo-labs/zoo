import type { Meta, StoryObj } from '@storybook/react';
import { Badge, BADGE_MAPPING } from './Badge';
import { Box, VStack, HStack, Text } from '@chakra-ui/react';

const meta = {
  title: 'Components/Badges/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Badge component for displaying status and state information with optional tooltips.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'base'],
      description: 'Size of the badge',
    },
    labelKey: {
      control: 'select',
      options: Object.keys(BADGE_MAPPING),
      description: 'Key to determine badge styling and default label',
    },
    label: {
      control: 'text',
      description: 'Custom label text (overrides labelKey default)',
    },
    tooltip: {
      control: 'text',
      description: 'Custom tooltip text',
    },
    leftIcon: {
      control: false,
      description: 'Custom icon element',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    labelKey: 'active',
    size: 'base',
  },
};

export const WithCustomLabel: Story = {
  args: {
    labelKey: 'active',
    size: 'base',
    label: 'Custom Active',
  },
};

export const WithCustomTooltip: Story = {
  args: {
    labelKey: 'pending',
    size: 'base',
    tooltip: 'This item is waiting for approval',
  },
};

export const SmallSize: Story = {
  args: {
    labelKey: 'executed',
    size: 'sm',
  },
};

export const AllStates: Story = {
  render: () => (
    <VStack spacing={8} align="stretch">
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={4}>Base Size</Text>
        <VStack spacing={2} align="start">
          {Object.keys(BADGE_MAPPING).map((key) => (
            <HStack key={key} spacing={4}>
              <Badge labelKey={key} size="base" />
              <Text fontSize="sm" color="gray.500">{key}</Text>
            </HStack>
          ))}
        </VStack>
      </Box>
      
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={4}>Small Size</Text>
        <VStack spacing={2} align="start">
          {Object.keys(BADGE_MAPPING).map((key) => (
            <HStack key={key} spacing={4}>
              <Badge labelKey={key} size="sm" />
              <Text fontSize="sm" color="gray.500">{key}</Text>
            </HStack>
          ))}
        </VStack>
      </Box>
    </VStack>
  ),
};

export const ProposalStates: Story = {
  render: () => (
    <VStack spacing={2} align="start">
      <Text fontSize="lg" fontWeight="bold" mb={2}>Proposal States</Text>
      <Badge labelKey="active" size="base" />
      <Badge labelKey="timelocked" size="base" />
      <Badge labelKey="executable" size="base" />
      <Badge labelKey="executed" size="base" />
      <Badge labelKey="failed" size="base" />
      <Badge labelKey="expired" size="base" />
      <Badge labelKey="rejected" size="base" />
      <Badge labelKey="pending" size="base" />
      <Badge labelKey="closed" size="base" />
    </VStack>
  ),
};

export const DAOStates: Story = {
  render: () => (
    <VStack spacing={2} align="start">
      <Text fontSize="lg" fontWeight="bold" mb={2}>DAO States</Text>
      <Badge labelKey="freezeInit" size="base" />
      <Badge labelKey="frozen" size="base" />
    </VStack>
  ),
};

export const OwnerStates: Story = {
  render: () => (
    <VStack spacing={2} align="start">
      <Text fontSize="lg" fontWeight="bold" mb={2}>Owner States</Text>
      <Badge labelKey="ownerApproved" size="base" />
      <Badge labelKey="ownerRejected" size="base" />
    </VStack>
  ),
};