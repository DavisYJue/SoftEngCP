import React from "react";
import SelectAllCheckbox from "./SelectAllCheckbox";
import PaginationInfo from "./PaginationInfo";
import PaginationControls from "./PaginationControls";

const Pagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  onSelectAll,
  allSelected,
  isIndeterminate,
  isFiltered,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1 && totalItems === 0) return null;

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center p-4 bg-gray-50 border-t text-md text-gray-600 space-y-2 md:space-y-0">
      <SelectAllCheckbox
        allSelected={allSelected}
        isIndeterminate={isIndeterminate}
        isFiltered={isFiltered}
        onSelectAll={onSelectAll}
      />

      <PaginationInfo
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
      />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Pagination;
