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
    <div className="flex flex-col md:flex-row md:justify-between md:items-center p-4 bg-gray-50 border-t text-md text-gray-600 space-y-2 md:space-y-0">
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
              ? "bg-indigo-300 hover:bg-indigo-400 text-gray-400 hover:text-gray-400 text-lg font-bold rounded-xl shadow-lg hover:shadow-violet-400/100 transition-transform duration-300 cursor-not-allowed"
              : "bg-indigo-400 hover:bg-indigo-500 text-black text-lg font-bold rounded-xl shadow-lg hover:shadow-violet-500/100 transition-transform duration-300"
          }`}
        >
          Previous
        </button>

        <div className="flex items-center">
          <span className="mx-2">Page</span>
          <span className="font-medium">{currentPage}</span>
          <span className="mx-1">of</span>
          <span className="font-medium mr-2">{totalPages}</span>
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? "bg-indigo-300 hover:bg-indigo-400 text-gray-400 hover:text-gray-400 text-lg font-bold rounded-xl shadow-lg hover:shadow-violet-400/100 transition-transform duration-300 cursor-not-allowed"
              : "bg-indigo-400 hover:bg-indigo-500 text-black text-lg font-bold rounded-xl shadow-lg hover:shadow-violet-500/100 transition-transform duration-300"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
