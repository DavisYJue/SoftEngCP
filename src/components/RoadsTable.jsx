import React from "react";
import Pagination from "./Pagination";
import SelectedRoadsTable from "./SelectedRoadsTable";
import SelectableTable from "./SelectableTable";
import NoDataMessage from "./NoDataMessage";
import { useSelection } from "@/context/SelectionContext";

const RoadsTable = ({
  data,
  originalData,
  columns,
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}) => {
  const isFiltered = data.length !== originalData.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = data.slice(startIndex, endIndex);

  const { selectedIds, setSelectedIds, selectedItems, visibleSelectedItems } =
    useSelection();

  const isSelected = (featureId) => selectedIds.includes(featureId);

  const handleRowClick = (featureId) => {
    setSelectedIds((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleRemoveSelected = (featureId) => {
    setSelectedIds((prev) => prev.filter((id) => id !== featureId));
  };

  const handleSelectAll = () => {
    const filteredIds = data.map((item) => item.id);
    const allSelected = filteredIds.every((id) => selectedIds.includes(id));

    setSelectedIds((prev) =>
      allSelected
        ? prev.filter((id) => !filteredIds.includes(id))
        : [...prev, ...filteredIds.filter((id) => !prev.includes(id))]
    );
  };

  const allFilteredIds = data.map((feature) => feature.id);
  const allSelected =
    selectedIds.length > 0 &&
    allFilteredIds.every((id) => selectedIds.includes(id));
  const isIndeterminate =
    selectedIds.length > 0 && selectedIds.length < allFilteredIds.length;

  if (!data.length) return <NoDataMessage />;

  return (
    <div>
      <SelectableTable
        data={currentItems}
        columns={columns}
        isSelected={isSelected}
        onRowClick={handleRowClick}
      />

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

      {visibleSelectedItems.length > 0 && (
        <div className="overflow-x-auto rounded-lg text-black mb-6">
          <SelectedRoadsTable
            selectedItems={visibleSelectedItems}
            columns={columns}
            onRemove={handleRemoveSelected}
            onDeselectFiltered={() =>
              setSelectedIds((prev) =>
                prev.filter((id) => !data.some((item) => item.id === id))
              )
            }
            onDeselectAll={() => setSelectedIds([])}
            isFiltered={isFiltered}
            totalSelected={selectedItems.length}
          />
        </div>
      )}
    </div>
  );
};

export default RoadsTable;
