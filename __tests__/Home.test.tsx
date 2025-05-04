import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../app/page';

// Mock child components to avoid testing their internal logic here
vi.mock('../app/todos/page', () => ({
  default: () => <div data-testid="task-page">TaskPage</div>,
}));

vi.mock('../app/todos/components/metrics/metrics', () => ({
  MetricsSection: () => <div data-testid="metrics-section">Metrics</div>,
}));

vi.mock('../app/todos/components/dialog/edit-todo-dialog', () => ({
  EditTaskDialog: () => <div data-testid="edit-task-dialog">Edit Dialog</div>,
}));

vi.mock('sonner', () => ({
  Toaster: () => <div data-testid="toaster">Toaster</div>,
}));

describe('Home Component', () => {
  it('renders the welcome text', () => {
    render(<Home />);
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
    expect(screen.getByText("Let's plan your tasks")).toBeInTheDocument();
  });

  it('renders TaskPage, MetricsSection, EditTaskDialog, and Toaster', () => {
    render(<Home />);
    expect(screen.getByTestId('task-page')).toBeInTheDocument();
    expect(screen.getByTestId('metrics-section')).toBeInTheDocument();
    expect(screen.getByTestId('edit-task-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('toaster')).toBeInTheDocument();
  });
});
