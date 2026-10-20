import * as React from 'react';
import { Accordion as GuiAccordion, styled, Text, YStack } from '@hanzo/gui';
import { ChevronDown } from 'lucide-react';

/**
 * gui's Accordion, under the four names FilterPanel already calls it by.
 *
 * Two differences from the shadcn original, both of them gui's shape rather than
 * a choice made here: a trigger has to sit inside an `Accordion.Header`, and the
 * open/close travel is `Accordion.HeightAnimator` rather than a pair of keyframe
 * classes that this build — which has never run Tailwind — never defined.
 *
 * The trigger is a View, so its label is a Text; the chevron turns on
 * `[data-state='open']`, one rule, in globals.css.
 */
const Accordion = GuiAccordion;

const AccordionItem = styled(GuiAccordion.Item, {
  name: 'AccordionItem',
  borderBottomWidth: 1,
  borderBottomColor: 'var(--border)',
});

const TriggerBox = styled(GuiAccordion.Trigger, {
  name: 'AccordionTrigger',
  unstyled: true,
  flexDirection: 'row',
  items: 'center',
  justify: 'space-between',
  width: '100%',
  gap: '$3',
  py: '$4',
  bg: 'transparent',
  cursor: 'pointer',
  hoverStyle: { opacity: 0.7 },
  focusVisibleStyle: { outlineWidth: 2, outlineStyle: 'solid', outlineColor: 'var(--ring)' },
});

const TriggerLabel = styled(Text, {
  name: 'AccordionTriggerLabel',
  fontSize: 16,
  fontWeight: '500',
  color: 'var(--text-primary)',
});

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof TriggerBox>,
  React.ComponentPropsWithoutRef<typeof TriggerBox>
>(({ children, ...props }, ref) => (
  <GuiAccordion.Header width='100%'>
    <TriggerBox ref={ref} {...props}>
      <TriggerLabel>{children}</TriggerLabel>
      <ChevronDown className='h-4 w-4 shrink-0' data-chevron />
    </TriggerBox>
  </GuiAccordion.Header>
));
AccordionTrigger.displayName = 'AccordionTrigger';

const ContentBox = styled(YStack, {
  name: 'AccordionContent',
  pb: '$4',
});

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof ContentBox>,
  React.ComponentPropsWithoutRef<typeof ContentBox>
>(({ children, ...props }, ref) => (
  <GuiAccordion.HeightAnimator>
    <GuiAccordion.Content unstyled p={0}>
      <ContentBox ref={ref} {...props}>
        {children}
      </ContentBox>
    </GuiAccordion.Content>
  </GuiAccordion.HeightAnimator>
));
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
