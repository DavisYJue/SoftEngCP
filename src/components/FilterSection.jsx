// components/FilterSection.jsx
import React from "react";

const FilterSection = ({
  filterText,
  districtFilter,
  districts,
  onFilterChange,
  onDistrictChange,
  onClearFilters,
  filteredCount,
  totalCount,
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6 shadow text-black">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-md font-medium text-gray-700 mb-1">
            Search Road Names
          </label>
          <input
            type="text"
            placeholder="Search by road name..."
            value={filterText}
            onChange={onFilterChange}
            className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-md font-medium text-gray-700 mb-1">
            Filter by District
          </label>
          <select
            value={districtFilter}
            onChange={onDistrictChange}
            className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Districts</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={onClearFilters}
            className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded transition duration-150"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Showing {filteredCount} of {totalCount} roads
        {districtFilter && ` in ${districtFilter}`}
      </div>
    </div>
  );
};

export default FilterSection;
