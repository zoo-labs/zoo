import * as React from 'react';
import { styled, Text, XStack, YStack } from '@hanzo/gui';

/**
 * A surface, composed from gui stacks rather than from `@hanzogui/card`: that
 * component pairs a Header and a Footer with its own Background, and the shape
 * these pages were written against is the flat one — header, content, footer,
 * each an ordinary box. Composition, not a component bent to fit.
 *
 * The colours are the role tokens, so a card here is the same surface as a card
 * anywhere else on the site. The originals asked for `border-gray-800` and
 * `bg-background` against a build with no Tailwind in it, which is why every
 * card on /experiences drew as a borderless transparent block.
 *
 * gui's typed style props take a token or a number, never a `var()` — so a SIZE
 * is stated as the rung it resolves to while a COLOUR stays a token. The numbers
 * below are @hanzo/design's 2xl and sm at this site's --type-scale.
 */
const Card = styled(YStack, {
  name: 'Card',
  bg: 'var(--card)',
  borderWidth: 1,
  borderColor: 'var(--border)',
  rounded: 'var(--radius-lg)',
  shadowColor: 'rgba(10,10,10,0.06)',
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 2 },
});

const CardHeader = styled(YStack, {
  name: 'CardHeader',
  gap: '$1.5',
  p: '$6',
});

const TitleText = styled(Text, {
  name: 'CardTitle',
  fontSize: 23,
  lineHeight: 27,
  fontWeight: '600',
  color: 'var(--text-primary)',
});

/**
 * A card's title is a heading, so it is one in the HTML too.
 *
 * gui draws its Text as a span and takes no `tag`, so anything that needs to BE
 * something is a real element with the gui box inside it — the same shape
 * zoolabs.io uses for its buttons and landmarks. Semantics in the markup,
 * styling in the config, and neither prop carrying both.
 */
const CardTitle = React.forwardRef<
  React.ElementRef<typeof TitleText>,
  React.ComponentPropsWithoutRef<typeof TitleText>
>((props, ref) => (
  <h3 style={{ margin: 0, font: 'inherit' }}>
    <TitleText ref={ref} {...props} />
  </h3>
));
CardTitle.displayName = 'CardTitle';

const DescriptionText = styled(Text, {
  name: 'CardDescription',
  fontSize: 15,
  lineHeight: 21,
  color: 'var(--text-tertiary)',
});

const CardDescription = React.forwardRef<
  React.ElementRef<typeof DescriptionText>,
  React.ComponentPropsWithoutRef<typeof DescriptionText>
>((props, ref) => (
  <p style={{ margin: 0, font: 'inherit' }}>
    <DescriptionText ref={ref} {...props} />
  </p>
));
CardDescription.displayName = 'CardDescription';

const CardContent = styled(YStack, {
  name: 'CardContent',
  px: '$6',
  pb: '$6',
});

const CardFooter = styled(XStack, {
  name: 'CardFooter',
  items: 'center',
  px: '$6',
  pb: '$6',
});

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
