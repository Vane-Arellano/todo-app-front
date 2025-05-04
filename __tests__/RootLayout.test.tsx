import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

vi.mock('next/font/local', () => ({
  default: () => ({ variable: '--mock-font' }),
}));

import RootLayout from '../app/layout';

describe('RootLayout', () => {
  it('renders children correctly', () => {
    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('adds font variables as class to <body>', () => {
    const { container } = render(
      <RootLayout>
        <div>Child</div>
      </RootLayout>
    );

    const body = container.querySelector('body');
    expect(body?.className).toContain('--mock-font');
    expect(body?.className).toContain('antialiased');
  });
});
