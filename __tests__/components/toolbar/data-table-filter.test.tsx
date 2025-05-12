// __tests__/components/DataTableFacetedFilter.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { DataTableFacetedFilter } from '@/app/todos/components/toolbar/data-table-filters';

describe('DataTableFacetedFilter', () => {
    const setFilterValue = vi.fn();
    global.ResizeObserver = class {
        observe() { }
        unobserve() { }
        disconnect() { }
    };

    // at top of your test file
    Element.prototype.scrollIntoView = vi.fn();

    const mockColumn = {
        getFacetedUniqueValues: () =>
            new Map([
                ['low', 3],
                ['high', 1],
            ]),
        getFilterValue: () => [],
        setFilterValue,
    };

    const options = [
        { label: 'Low', value: 'low' },
        { label: 'High', value: 'high' },
    ];

    beforeEach(() => {
        setFilterValue.mockClear();
    });

    it('renders the filter button with the title', () => {
        render(<DataTableFacetedFilter column={mockColumn as any} title="Priority" options={options} />);
        expect(screen.getByRole('button', { name: /priority/i })).toBeInTheDocument();
    });

    it('opens popover and displays all options', async () => {
        render(<DataTableFacetedFilter column={mockColumn as any} title="Priority" options={options} />);
        await userEvent.click(screen.getByRole('button', { name: /priority/i }));

        expect(screen.getByText('Low')).toBeInTheDocument();
        expect(screen.getByText('High')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('toggles an option and calls setFilterValue', async () => {
        render(<DataTableFacetedFilter column={mockColumn as any} title="Priority" options={options} />);
        await userEvent.click(screen.getByRole('button', { name: /priority/i }));

        const lowOption = screen.getByText('Low');
        await userEvent.click(lowOption);

        expect(setFilterValue).toHaveBeenCalledWith(['low']);
    });

    it('shows Clear filters option when something is selected', async () => {
        const selectedColumn = {
            ...mockColumn,
            getFilterValue: () => ['low'],
        };

        render(<DataTableFacetedFilter column={selectedColumn as any} title="Priority" options={options} />);
        await userEvent.click(screen.getByRole('button', { name: /priority/i }));

        expect(screen.getByText('Clear filters')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Clear filters'));
        expect(setFilterValue).toHaveBeenCalledWith(undefined);
    });

    it('shows badge with selected values', async () => {
        const selectedColumn = {
            ...mockColumn,
            getFilterValue: () => ['low'],
        };

        render(<DataTableFacetedFilter column={selectedColumn as any} title="Priority" options={options} />);
        expect(await screen.findByText('Low')).toBeInTheDocument();
    });
});
