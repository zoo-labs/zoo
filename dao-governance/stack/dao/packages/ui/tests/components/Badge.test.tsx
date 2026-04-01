import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { Badge, BADGE_MAPPING } from '../../src/components/badges/Badge';
import { luxTheme } from '../../src/theme';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider theme={luxTheme}>
      {ui}
    </ChakraProvider>
  );
};

describe('Badge', () => {
  it('renders with correct label', () => {
    renderWithTheme(<Badge labelKey="active" size="base" />);
    expect(screen.getByText('active')).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    renderWithTheme(<Badge labelKey="active" size="base" label="Custom Label" />);
    expect(screen.getByText('Custom Label')).toBeInTheDocument();
  });

  it('renders with custom children', () => {
    renderWithTheme(
      <Badge labelKey="active" size="base">
        Custom Children
      </Badge>
    );
    expect(screen.getByText('Custom Children')).toBeInTheDocument();
  });

  it('applies correct size styles', () => {
    const { rerender } = renderWithTheme(<Badge labelKey="active" size="sm" />);
    let badge = screen.getByText('active').parentElement;
    expect(badge).toHaveStyle({ minWidth: '5rem', height: '1.375rem' });

    rerender(
      <ChakraProvider theme={luxTheme}>
        <Badge labelKey="active" size="base" />
      </ChakraProvider>
    );
    badge = screen.getByText('active').parentElement;
    expect(badge).toHaveStyle({ minWidth: '5.4375rem', height: '1.375rem' });
  });

  it('renders all badge states', () => {
    Object.keys(BADGE_MAPPING).forEach((key) => {
      const { unmount } = renderWithTheme(<Badge labelKey={key} size="base" />);
      expect(screen.getByText(key)).toBeInTheDocument();
      unmount();
    });
  });

  it('renders with custom left icon', () => {
    const customIcon = <span data-testid="custom-icon">🔥</span>;
    renderWithTheme(<Badge labelKey="active" size="base" leftIcon={customIcon} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders default dot when no custom icon provided', () => {
    renderWithTheme(<Badge labelKey="active" size="base" />);
    const dot = document.querySelector('[rounded="full"]');
    expect(dot).toBeInTheDocument();
  });
});