import React, { useState } from "react";
import Pagination from "./Pagination";
import SelectedRoadsTable from "./SelectedRoadsTable";

const RoadsTable = ({
  data,
  columns,
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  originalData, // full unfiltered data array
}) => {
  const [selectedIds, setSelectedIds] = useState([]);

  // Detect if a filter is applied by comparing lengths
  const isFiltered = data.length !== originalData.length;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = data.slice(startIndex, endIndex);

  const handleRowClick = (featureId) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(featureId)
        ? prevSelected.filter((id) => id !== featureId)
        : [...prevSelected, featureId]
    );
  };

  const handleRemoveSelected = (featureId) => {
    setSelectedIds((prevSelected) =>
      prevSelected.filter((id) => id !== featureId)
    );
  };

  const isSelected = (featureId) => selectedIds.includes(featureId);
  const selectedItems = data.filter((feature) =>
    selectedIds.includes(feature.id)
  );

  const allFilteredIds = data.map((feature) => feature.id);
  const allSelected =
    selectedIds.length > 0 &&
    allFilteredIds.every((id) => selectedIds.includes(id));
  const isIndeterminate =
    selectedIds.length > 0 && selectedIds.length < allFilteredIds.length;

  const handleSelectAll = () => {
    const filteredIds = data.map((item) => item.id);
    const allSelected =
      filteredIds.length > 0 &&
      filteredIds.every((id) => selectedIds.includes(id));
    const isIndeterminate =
      filteredIds.some((id) => selectedIds.includes(id)) && !allSelected;
    const isFiltered = originalData.length !== data.length; // passed from props

    setSelectedIds((prev) => {
      const allAlreadySelected = filteredIds.every((id) => prev.includes(id));

      if (allAlreadySelected) {
        // Unselect all filtered
        return prev.filter((id) => !filteredIds.includes(id));
      } else {
        // Add filtered items (avoiding duplicates)
        const newIds = filteredIds.filter((id) => !prev.includes(id));
        return [...prev, ...newIds];
      }
    });
  };

  if (!data.length) {
    return (
      <div className="py-6 px-4 text-center text-black">
        No matching roads found
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto rounded-lg shadow text-black">
        {/* Main Table */}
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 border-b text-lg">
            <tr>
              <th className="py-3 px-4 text-center">Select</th>
              <th className="py-3 px-4 text-left">ID</th>
              {columns.map((column) => (
                <th key={column.id} className="py-3 px-4 text-left">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((feature, index) => {
              const featureId = feature.id;
              const selected = isSelected(featureId);

              return (
                <tr
                  key={featureId}
                  className={`cursor-pointer ${
                    selected
                      ? "bg-blue-100"
                      : index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-100"
                  }`}
                  onClick={() => handleRowClick(featureId)}
                >
                  <td
                    className="py-3 px-4 border-b cursor-pointer text-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRowClick(featureId);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      readOnly
                      className="w-5 h-5 mt-1.5 pointer-events-none"
                    />
                  </td>

                  <td className="py-3 px-4 border-b">{featureId}</td>
                  {columns.map((column) => (
                    <td key={column.id} className="py-3 px-4 border-b">
                      {feature.properties[column.id] ?? "-"}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onPageChange={onPageChange}
          onSelectAll={handleSelectAll}
          allSelected={allSelected}
          isIndeterminate={isIndeterminate}
          isFiltered={isFiltered}
        />
      </div>

      {/* Selected Table */}
      <div className="overflow-x-auto rounded-lg text-black">
        {selectedItems.length > 0 && (
          <div className="mb-6">
            <SelectedRoadsTable
              selectedItems={selectedItems}
              columns={columns}
              onRemove={handleRemoveSelected}
              onDeselectFiltered={() =>
                setSelectedIds((prev) =>
                  prev.filter(
                    (id) => !data.some((item) => item.id === id) // use filtered data from current props `data`
                  )
                )
              }
              onDeselectAll={() => setSelectedIds([])}
              isFiltered={isFiltered}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadsTable;
