import * as React from 'react';
import { styled, Tabs as GuiTabs, Text } from '@hanzo/gui';

/**
 * gui's Tabs, under the four names these pages already call it by. `Tabs.Tab` is
 * the trigger there; the rest line up one for one, so this file is a naming
 * adapter and not a second implementation.
 *
 * gui needs an `orientation` to lay the list out and the pages never pass one,
 * so it is stated here once rather than at each of the ten call sites.
 *
 * A Tab is a View — gui splits the box from the label, and the label's size,
 * weight and colour belong on a Text. The selected one is drawn in globals.css
 * off `[data-state='active']`, which gui sets: a headless component's state
 * belongs on the element it is on, and putting it there is also what lets one
 * rule serve the tabs and the accordion.
 */
const Tabs = React.forwardRef<
  React.ElementRef<typeof GuiTabs>,
  React.ComponentPropsWithoutRef<typeof GuiTabs>
>((props, ref) => (
  <GuiTabs ref={ref} orientation='horizontal' flexDirection='column' {...props} />
));
Tabs.displayName = 'Tabs';

const TabsList = styled(GuiTabs.List, {
  name: 'TabsList',
  items: 'center',
  gap: '$1',
  p: '$1',
  rounded: 9999,
  borderWidth: 1,
  borderColor: 'var(--border)',
  bg: 'rgba(255,255,255,0.55)',
  self: 'flex-start',
});

const TabBox = styled(GuiTabs.Tab, {
  name: 'TabsTrigger',
  unstyled: true,
  items: 'center',
  justify: 'center',
  height: 36,
  px: '$4',
  rounded: 9999,
  bg: 'transparent',
  cursor: 'pointer',
  focusVisibleStyle: { outlineWidth: 2, outlineStyle: 'solid', outlineColor: 'var(--ring)' },
});

const TabLabel = styled(Text, {
  name: 'TabsTriggerLabel',
  fontSize: 15,
  fontWeight: '500',
  color: 'var(--text-tertiary)',
  whiteSpace: 'nowrap',
});

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabBox>,
  React.ComponentPropsWithoutRef<typeof TabBox>
>(({ children, ...props }, ref) => (
  <TabBox ref={ref} {...props}>
    <TabLabel>{children}</TabLabel>
  </TabBox>
));
TabsTrigger.displayName = 'TabsTrigger';

const TabsContent = styled(GuiTabs.Content, {
  name: 'TabsContent',
  mt: '$4',
});

export { Tabs, TabsList, TabsTrigger, TabsContent };
