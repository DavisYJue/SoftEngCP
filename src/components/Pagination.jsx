import React from "react";

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
    <div className="flex flex-col md:flex-row md:justify-between md:items-center p-4 bg-gray-50 border-t text-sm text-gray-600 space-y-2 md:space-y-0">
      {/* Left: Select All */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={allSelected}
          disabled={!isFiltered}
          ref={(input) => {
            if (input) input.indeterminate = isIndeterminate && isFiltered;
          }}
          onChange={onSelectAll}
          className="w-4 h-4"
          id="selectAllFiltered"
        />
        <label
          htmlFor="selectAllFiltered"
          className={isFiltered ? "" : "text-gray-400"}
        >
          Select all filtered data
        </label>
      </div>

      {/* Center: Showing Info */}
      <div className="text-center w-full md:w-auto">
        Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to{" "}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} roads
      </div>

      {/* Right: Pagination Buttons */}
      <div className="flex space-x-2 items-center justify-center md:justify-end">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Previous
        </button>

        <div className="flex items-center">
          <span className="mx-2">Page</span>
          <span className="font-medium">{currentPage}</span>
          <span className="mx-1">of</span>
          <span className="font-medium">{totalPages}</span>
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
