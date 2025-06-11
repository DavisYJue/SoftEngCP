import React from "react";

const PaginationInfo = ({ currentPage, itemsPerPage, totalItems }) => {
  const start = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems);
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="text-center w-full md:w-auto">
      Showing {start} to {end} of {totalItems} roads
    </div>
  );
};

export default PaginationInfo;
