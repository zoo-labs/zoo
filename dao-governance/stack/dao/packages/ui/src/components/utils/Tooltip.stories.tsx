import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button, Box, HStack, IconButton } from '@chakra-ui/react';
import { InfoIcon, QuestionIcon, WarningIcon } from '@chakra-ui/icons';

const meta = {
  title: 'Components/Utils/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Enhanced tooltip component with consistent styling and behavior for the Lux DAO UI.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Tooltip content',
    },
    placement: {
      control: 'select',
      options: [
        'top', 'bottom', 'left', 'right',
        'top-start', 'top-end',
        'bottom-start', 'bottom-end',
        'left-start', 'left-end',
        'right-start', 'right-end',
        'auto', 'auto-start', 'auto-end',
      ],
      description: 'Tooltip placement relative to trigger',
    },
    hasArrow: {
      control: 'boolean',
      description: 'Show arrow pointing to trigger',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disable tooltip',
    },
    closeOnClick: {
      control: 'boolean',
      description: 'Close tooltip on click',
    },
    closeOnScroll: {
      control: 'boolean',
      description: 'Close tooltip on scroll',
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'This is a helpful tooltip',
    placement: 'top',
    hasArrow: true,
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
};

export const NoArrow: Story = {
  args: {
    label: 'Tooltip without arrow',
    hasArrow: false,
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover for tooltip</Button>
    </Tooltip>
  ),
};

export const LongContent: Story = {
  args: {
    label: 'This is a very long tooltip that contains a lot of information. It should wrap nicely and maintain readability while providing all the necessary details to the user.',
    maxW: '300px',
  },
  render: (args) => (
    <Tooltip {...args}>
      <IconButton
        aria-label="Information"
        icon={<InfoIcon />}
      />
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: () => (
    <Box p={20}>
      <HStack spacing={4}>
        <Tooltip label="Top placement" placement="top">
          <Button size="sm">Top</Button>
        </Tooltip>
        <Tooltip label="Bottom placement" placement="bottom">
          <Button size="sm">Bottom</Button>
        </Tooltip>
        <Tooltip label="Left placement" placement="left">
          <Button size="sm">Left</Button>
        </Tooltip>
        <Tooltip label="Right placement" placement="right">
          <Button size="sm">Right</Button>
        </Tooltip>
      </HStack>
    </Box>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <HStack spacing={4}>
      <Tooltip label="Information about this feature">
        <IconButton
          aria-label="Info"
          icon={<InfoIcon />}
          size="sm"
          variant="ghost"
        />
      </Tooltip>
      <Tooltip label="Get help with this">
        <IconButton
          aria-label="Help"
          icon={<QuestionIcon />}
          size="sm"
          variant="ghost"
        />
      </Tooltip>
      <Tooltip label="Warning: This action cannot be undone">
        <IconButton
          aria-label="Warning"
          icon={<WarningIcon />}
          size="sm"
          variant="ghost"
          colorScheme="orange"
        />
      </Tooltip>
    </HStack>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'This tooltip is disabled',
    isDisabled: true,
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me (tooltip disabled)</Button>
    </Tooltip>
  ),
};

export const InteractiveBehavior: Story = {
  render: () => (
    <HStack spacing={4}>
      <Tooltip label="Closes when you click" closeOnClick>
        <Button>Click to close</Button>
      </Tooltip>
      <Tooltip label="Stays open when you click" closeOnClick={false}>
        <Button>Click won't close</Button>
      </Tooltip>
    </HStack>
  ),
};

export const CustomStyling: Story = {
  args: {
    label: 'Custom styled tooltip',
    bg: 'purple.500',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 'md',
    p: 4,
    borderRadius: 'lg',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button colorScheme="purple">Custom Style</Button>
    </Tooltip>
  ),
};