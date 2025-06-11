import React from "react";

const FilterStatus = ({
  filteredCount,
  totalCount,
  districtFilter,
  suffixFilter,
}) => {
  return (
    <div className="mt-4 text-md text-gray-600">
      Showing {filteredCount} of {totalCount} roads
      {districtFilter && ` in ${districtFilter}`}
      {suffixFilter && ` with suffix ${suffixFilter}`}
    </div>
  );
};

export default FilterStatus;
