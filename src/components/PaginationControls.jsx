import React from "react";

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex space-x-2 items-center justify-center md:justify-end">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className={`px-3 py-1 rounded ${
        currentPage === 1
          ? "bg-indigo-300 text-gray-400 cursor-not-allowed"
          : "bg-indigo-400 hover:bg-indigo-500 text-black"
      } text-lg font-bold rounded-xl shadow-lg transition-transform duration-300`}
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
          ? "bg-indigo-300 text-gray-400 cursor-not-allowed"
          : "bg-indigo-400 hover:bg-indigo-500 text-black"
      } text-lg font-bold rounded-xl shadow-lg transition-transform duration-300`}
    >
      Next
    </button>
  </div>
);

export default PaginationControls;
