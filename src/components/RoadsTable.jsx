"use client";

import React, { useState } from "react";
import Pagination from "./Pagination";
import SelectedRoadsTable from "./SelectedRoadsTable";
import SelectableTable from "./SelectableTable";
import NoDataMessage from "./NoDataMessage";
import { useSelection } from "@/context/SelectionContext";
import { motion, AnimatePresence } from "framer-motion";

const RoadsTable = ({
  data,
  originalData,
  columns,
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  onShowMap,
}) => {
  const isFiltered = data.length !== originalData.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = data.slice(startIndex, endIndex);

  const { selectedIds, setSelectedIds, selectedItems, visibleSelectedItems } =
    useSelection();

  const [isDeselecting, setIsDeselecting] = useState(false);
  const [deselectAction, setDeselectAction] = useState(null);
  const [pendingRemoveId, setPendingRemoveId] = useState(null);

  const isSelected = (featureId) => selectedIds.includes(featureId);

  const handleRowClick = (featureId) => {
    setSelectedIds((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleRemoveClick = (id) => {
    if (visibleSelectedItems.length === 1) {
      setIsDeselecting(true);
      setPendingRemoveId(id);
      setDeselectAction(
        () => () => setSelectedIds((prev) => prev.filter((d) => d !== id))
      );
    } else {
      setSelectedIds((prev) => prev.filter((d) => d !== id));
    }
  };

  const handleDeselectClick = (filtered) => {
    setIsDeselecting(true);
    setDeselectAction(() =>
      filtered
        ? () =>
            setSelectedIds((prev) =>
              prev.filter((id) => !data.some((item) => item.id === id))
            )
        : () => setSelectedIds([])
    );
  };

  const handleFadeComplete = () => {
    if (isDeselecting) {
      if (deselectAction) deselectAction();
      setIsDeselecting(false);
      setDeselectAction(null);
      setPendingRemoveId(null);
    }
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

      <AnimatePresence mode="wait">
        {visibleSelectedItems.length > 0 && (
          <motion.div
            key="selected-table"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isDeselecting ? 0 : 1,
              y: isDeselecting ? 20 : 0,
            }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            onAnimationComplete={handleFadeComplete}
            className="overflow-x-auto rounded-lg text-black mb-6"
          >
            <SelectedRoadsTable
              selectedItems={visibleSelectedItems}
              columns={columns}
              onRemove={handleRemoveClick}
              onDeselectFiltered={() => handleDeselectClick(true)}
              onDeselectAll={() => handleDeselectClick(false)}
              isFiltered={isFiltered}
              totalSelected={selectedItems.length}
              onShowMap={onShowMap}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoadsTable;
