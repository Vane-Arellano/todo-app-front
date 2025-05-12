import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import * as redux from "react-redux";
import PaginationControlsDataTable from "@/app/todos/components/pagination/pagination";
import '@testing-library/jest-dom';

describe("PaginationControlsDataTable", () => {
  const mockDispatch = vi.fn();
  vi.mock('react-redux', () => ({
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
}));

  beforeEach(() => {
    vi.spyOn(redux, "useDispatch").mockReturnValue(mockDispatch);
    mockDispatch.mockClear();
  });

  it("should dispatch setPagination when next is clicked", () => {
    render(<PaginationControlsDataTable totalPages={5} page={1} />);
    fireEvent.click(screen.getByRole("link", { name: /next/i }));
    expect(mockDispatch).toHaveBeenCalledWith({ type: "pagination/setPagination", payload: 2 });
  });

  it("should dispatch setPagination when previous is clicked", () => {
    render(<PaginationControlsDataTable totalPages={5} page={2} />);
    fireEvent.click(screen.getByRole("link", { name: /previous/i }));
    expect(mockDispatch).toHaveBeenCalledWith({ type: "pagination/setPagination", payload: 1 });
  });

  it("should not dispatch when clicking current page", () => {
    render(<PaginationControlsDataTable totalPages={5} page={1} />);
    fireEvent.click(screen.getByText("2")); // Page 1 is "2" due to +1 offset
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("should render ellipsis when there's a gap between pages", () => {
    render(<PaginationControlsDataTable totalPages={10} page={6} />);
    expect(screen.getAllByText("More pages").length).toBeGreaterThan(0);
  });

  it("should dispatch correct page when page number is clicked", () => {
    render(<PaginationControlsDataTable totalPages={5} page={1} />);
    fireEvent.click(screen.getByText("3")); // should be page index 2
    expect(mockDispatch).toHaveBeenCalledWith({ type: "pagination/setPagination", payload: 2 });
  });

  it("should disable previous button on first page", () => {
    render(<PaginationControlsDataTable totalPages={5} page={0} />);
    expect(screen.getByRole("link", { name: /previous/i })).toHaveClass("pointer-events-none");
  });

  it("should disable next button on last page", () => {
    render(<PaginationControlsDataTable totalPages={5} page={4} />);
    expect(screen.getByRole("link", { name: /next/i })).toHaveClass("pointer-events-none");
  });
});
