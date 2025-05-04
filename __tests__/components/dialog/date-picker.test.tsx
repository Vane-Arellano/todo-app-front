// __tests__/DatePickerDemo.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import { useDispatch } from 'react-redux';
import { placeDueDate } from '@/redux/store';
import { DatePickerDemo } from '@/app/todos/components/dialog/date-picker';
import '@testing-library/jest-dom';

// Mock redux
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

// Mock format function to return a static value for simplicity
vi.mock('date-fns', async () => {
  const actual = await vi.importActual<typeof import('date-fns')>('date-fns');
  return {
    ...actual,
    format: (date: Date) => `formatted(${date.toISOString()})`,
  };
});

describe('DatePickerDemo', () => {
  const mockDispatch = vi.fn() as Mock;


  beforeEach(() => {
    (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
    mockDispatch.mockClear();
  });

  it('renders with no date and shows "Due date"', () => {
    render(<DatePickerDemo prevDate={undefined} />);
    expect(screen.getByText('Due date')).toBeInTheDocument();
  });

  it('renders with previous date and displays it formatted', () => {
    const prevDate = new Date('2023-01-01T00:00:00.000Z');
    render(<DatePickerDemo prevDate={prevDate} />);
    expect(screen.getByText('formatted(2023-01-01T00:00:00.000Z)')).toBeInTheDocument();
  });

  it('opens the calendar when button is clicked', async () => {
    render(<DatePickerDemo prevDate={undefined} />);
    fireEvent.click(screen.getByRole('button'));
    expect(await screen.findByRole('grid')).toBeInTheDocument(); // Calendar grid
  });

  it('dispatches placeDueDate when a date is selected', async () => {
    render(<DatePickerDemo prevDate={undefined} />);
    fireEvent.click(screen.getByRole('button'));

    // Select the first available date
    const allDates = await screen.findAllByRole('gridcell');
    fireEvent.click(allDates[0]);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        placeDueDate(expect.stringMatching(/^\d{4}-\d{2}-\d{2}T/)) // ISO string
      );
    });
  });
});
