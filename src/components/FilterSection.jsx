import React from "react";
import LabeledInput from "./LabeledInput";
import LabeledSelect from "./LabeledSelect";
import FilterStatus from "./FilterStatus";

const FilterSection = ({
  filterText,
  districtFilter,
  suffixFilter,
  districts,
  onFilterChange,
  onDistrictChange,
  onSuffixChange,
  onClearFilters,
  filteredCount,
  totalCount,
}) => {
  const suffixOptions = [
    "快速路",
    "大桥",
    "桥",
    "高架",
    "大道",
    "路",
    "街",
    "巷",
    "道",
    "里",
    "线",
    "支路",
    "高速",
    "快速",
    "大道东",
    "大道南",
    "大道西",
    "大道北",
    "大道中",
    "立交",
    "出口",
    "入口",
    "坊",
    "岗",
    "平台",
    "路段",
    "其他",
  ];

  return (
    <div className="bg-gray-50 px-8 py-4 rounded-lg mb-6 shadow text-black">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <LabeledInput
          label="Search by ID or Name"
          value={filterText}
          onChange={onFilterChange}
          placeholder="Search by ID or name..."
        />

        <LabeledSelect
          label="Filter by District"
          value={districtFilter}
          onChange={onDistrictChange}
          options={districts}
          defaultOption="All Districts"
        />

        <LabeledSelect
          label="Filter by Suffix"
          value={suffixFilter}
          onChange={onSuffixChange}
          options={suffixOptions}
          defaultOption="All Suffixes"
        />

        <div className="flex items-end">
          <button
            onClick={onClearFilters}
            className="w-full py-2 px-4 bg-rose-400 hover:bg-rose-700 text-lg font-bold rounded-xl shadow-lg hover:shadow-rose-500/100 transition duration-150"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <FilterStatus
        filteredCount={filteredCount}
        totalCount={totalCount}
        districtFilter={districtFilter}
        suffixFilter={suffixFilter}
      />
    </div>
  );
};

export default FilterSection;
