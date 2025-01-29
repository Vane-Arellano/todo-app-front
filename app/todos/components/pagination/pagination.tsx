import { Pagination, 
  PaginationContent,
  PaginationItem, 
  PaginationPrevious, 
  PaginationLink, 
  PaginationNext, 
  PaginationEllipsis } from "@/components/ui/pagination";
import { setPagination } from "@/redux/store";
import { Fragment } from "react";
import { useDispatch } from "react-redux";

interface PaginationControlsDataTableProps {
  totalPages: number;
  page: number
}

const PaginationControlsDataTable: React.FC<PaginationControlsDataTableProps> = ({ totalPages, page }) => {
  const dispatch = useDispatch();
  
  const handlePageChange = (currentPage: number) => {
    if (currentPage !== page && currentPage >= 0 && currentPage <= totalPages -1) {
      dispatch(setPagination(currentPage))
    }
  };
  
  const getPageNumbers = () => {
    const currentPage = page;
    const pages: number[] = [];
  
    // Always show the first page
    if (currentPage > 0) pages.push(0);
  
    for (let i = Math.max(0, currentPage); i <= Math.min(currentPage + 2, totalPages -2); i++) {
      pages.push(i);
    }
  
    // Always show the last page
    if (currentPage < totalPages) {
      pages.push(totalPages - 1);
    }
  
    return pages;
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => handlePageChange(Math.max(0, page - 1))}
            className={page === 0 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
  
        {pageNumbers.map((pageNumber, index) => {
          const isActive = pageNumber === page;
  
          // Add ellipsis if there's a gap between two consecutive page numbers
          const showEllipsis =
            index > 0 && pageNumbers[index] !== pageNumbers[index - 1] + 1;
  
          return (
            <Fragment key={pageNumber}>
              {showEllipsis && <PaginationEllipsis key={`ellipsis-${index}`} />}
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(pageNumber)}
                  isActive={isActive}
                >
                  {pageNumber + 1}
                </PaginationLink>
              </PaginationItem>
            </Fragment>
          );
        })}
  
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => handlePageChange(Math.min(totalPages - 1, page + 1))}
            className={page === totalPages - 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControlsDataTable