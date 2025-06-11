import React from "react";

const SelectAllCheckbox = ({
  allSelected,
  isIndeterminate,
  isFiltered,
  onSelectAll,
}) => (
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
);

export default SelectAllCheckbox;
