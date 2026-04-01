import {
  Tooltip as ChakraTooltip,
  TooltipProps as ChakraTooltipProps,
  useBoolean,
  PlacementWithLogical,
  Portal,
} from '@chakra-ui/react';

export interface TooltipProps extends Omit<ChakraTooltipProps, 'isOpen' | 'onOpen' | 'onClose'> {
  containerRef?: React.RefObject<HTMLElement>;
}

/**
 * Custom tooltip component for Lux DAO UI
 * Provides consistent styling and behavior across the application
 */
export function Tooltip({
  children,
  label,
  placement = 'top' as PlacementWithLogical,
  hasArrow = true,
  containerRef,
  shouldWrapChildren = true,
  isDisabled,
  closeOnClick = false,
  closeOnMouseDown = false,
  closeOnPointerDown = false,
  closeOnScroll = false,
  ...rest
}: TooltipProps) {
  const [isOpen, { on, off }] = useBoolean();

  if (!label || isDisabled) {
    return <>{children}</>;
  }

  const tooltip = (
    <ChakraTooltip
      label={label}
      hasArrow={hasArrow}
      placement={placement}
      isOpen={isOpen}
      bg="color-neutral-800"
      color="color-white"
      borderRadius="0.5rem"
      p="0.75rem"
      fontSize="sm"
      fontWeight="medium"
      boxShadow="lg"
      shouldWrapChildren={shouldWrapChildren}
      closeOnClick={closeOnClick}
      closeOnMouseDown={closeOnMouseDown}
      closeOnPointerDown={closeOnPointerDown}
      closeOnScroll={closeOnScroll}
      {...rest}
    >
      <span
        style={{ display: 'inline-block', width: 'fit-content' }}
        onMouseEnter={on}
        onMouseLeave={off}
        onFocus={on}
        onBlur={off}
      >
        {children}
      </span>
    </ChakraTooltip>
  );

  // If containerRef is provided, render inside a Portal attached to that container
  if (containerRef?.current) {
    return <Portal containerRef={containerRef}>{tooltip}</Portal>;
  }

  return tooltip;
}