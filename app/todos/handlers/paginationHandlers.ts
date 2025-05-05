import { setPagination } from "@/redux/store";

export const handlePageChange = (currentPage: number, page: number, totalPages: number, dispatch: any) => {
    if (currentPage !== page && currentPage >= 0 && currentPage <= totalPages -1) {
      dispatch(setPagination(currentPage))
    }
  };

/**
 * Generates an array of page numbers to display for pagination.
 *
 * @param currentPage - The current active page number.
 * @param totalPages - The total number of pages available.
 * @returns An array of page numbers to display.
 *
 * @remarks
 * This function ensures that the first and last pages are always included
 * in the pagination display. It also includes a range of pages around the
 * current page, ensuring that the pagination is concise and user-friendly.
 */
export const getPageNumbers = (currentPage: number, totalPages: number) => {
    const pages: number[] = [];
  
    if (currentPage > 0) pages.push(0);
  
    for (let i = Math.max(0, currentPage); i <= Math.min(currentPage + 2, totalPages -2); i++) {
      pages.push(i);
    }
  
    if (currentPage < totalPages) {
      pages.push(totalPages - 1);
    }
  
    return pages;
  }