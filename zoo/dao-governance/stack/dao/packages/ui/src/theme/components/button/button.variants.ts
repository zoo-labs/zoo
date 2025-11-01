import { defineStyle } from '@chakra-ui/react';
const primaryDisabled = {
  bg: 'color-neutral-700',
  color: 'color-neutral-300',
};

const primary = defineStyle({
  bg: 'color-white',
  color: 'color-black',
  _hover: {
    bg: 'color-charcoal-50',
    _disabled: {
      ...primaryDisabled,
    },
  },
  _disabled: {
    ...primaryDisabled,
  },
  _active: {
    bg: 'color-charcoal-100',
  },
});

const secondaryDisabled = {
  borderColor: 'color-neutral-700',
  color: 'color-neutral-700',
};
const secondary = defineStyle({
  border: '1px solid',
  borderColor: 'color-white',
  color: 'color-white',
  bg: 'transparent',
  _hover: {
    bg: 'color-white',
    color: 'color-black',
    _disabled: {
      ...secondaryDisabled,
    },
  },
  _disabled: {
    ...secondaryDisabled,
  },
  _active: {
    bg: 'color-charcoal-100',
    borderColor: 'color-charcoal-100',
    color: 'color-black',
  },
});

const tertiaryDisabled = {
  color: 'color-neutral-700',
};

const tertiaryLoading = {
  // @todo add loading state
};
const tertiary = defineStyle({
  bg: 'transparent',
  color: 'color-white',
  _hover: {
    bg: 'white-alpha-04',
    color: 'color-charcoal-100',
    _disabled: {
      ...tertiaryDisabled,
      _loading: tertiaryLoading,
    },
  },
  _disabled: {
    ...tertiaryDisabled,
    _loading: tertiaryLoading,
  },
  _active: {
    bg: 'white-alpha-08',
    color: 'color-charcoal-50',
  },
  _focus: {},
});

const dangerDisabled = {
  borderColor: 'color-error-900',
  color: 'color-error-800',
};

const danger = defineStyle({
  border: '1px solid',
  borderColor: 'color-error-400',
  color: 'color-error-400',
  _disabled: {
    ...dangerDisabled,
  },
  _hover: {
    borderColor: 'color-error-500',
    color: 'color-error-500',
  },
  _active: {
    borderColor: 'color-error-500',
    color: 'color-error-500',
  },
});

const stepper = defineStyle({
  border: '1px solid',
  borderColor: 'color-neutral-900',
  bg: 'color-black',
  color: 'color-white',
  _active: {
    borderColor: 'color-neutral-800',
    boxShadow: '0px 0px 0px 3px #333333',
  },
  _hover: {
    borderColor: 'color-neutral-800',
  },
  _focus: {
    outline: 'none',
    borderColor: 'color-neutral-800',
    boxShadow: '0px 0px 0px 3px #333333',
  },
});
const secondaryV1Disabled = {
  borderColor: 'color-neutral-700',
  color: 'color-base-secondary-foreground',
  opacity: 0.5,
};
const secondaryV1 = defineStyle({
  borderTop: '1px solid',
  borderColor: 'color-layout-border',
  bg: 'color-content-content2',
  color: 'color-base-secondary-foreground',
  _disabled: {
    ...secondaryV1Disabled,
  },
  _hover: {
    bg: 'color-content-content3',
    _disabled: {
      ...secondaryV1Disabled,
    },
  },
  _active: {
    bg: 'color-content-content4',
    borderColor: 'color-base-information-foreground',
  },
});

const buttonVariants = {
  primary,
  secondary,
  secondaryV1,
  tertiary,
  stepper,
  danger,
};

export default buttonVariants;
