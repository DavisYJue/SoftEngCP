"use client";

import React, { useState } from "react";
import PaginationInfo from "./PaginationInfo";
import PaginationControls from "./PaginationControls";
import SelectedRoadsActions from "./SelectedRoadsActions";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { usePageAnimation } from "@/hooks/animations";

const ITEMS_PER_PAGE = 10;

const SelectedRoadsTable = ({
  selectedItems,
  columns,
  onRemove,
  isFiltered,
  onDeselectFiltered,
  onDeselectAll,
  totalSelected,
  onShowMap,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Local state for fade-out animation
  const [isDeselecting, setIsDeselecting] = useState(false);
  const [deselectAction, setDeselectAction] = useState(null); // callback to call after animation
  const [pendingRemoveId, setPendingRemoveId] = useState(null); // id to remove after fade

  const totalItems = selectedItems.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const currentItems = selectedItems.slice(startIndex, endIndex);

  const router = useRouter();
  const { isExiting, exitTarget, startExit } = usePageAnimation();

  const handleShowMapClick = () => {
    startExit("/roadsmap");
  };

  const onPageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Bulk deselect handler with fade-out
  const handleDeselectClick = () => {
    setIsDeselecting(true);
    setDeselectAction(() => (isFiltered ? onDeselectFiltered : onDeselectAll));
  };

  // Individual remove handler with fade-out on last item
  const handleRemoveClick = (id) => {
    if (totalItems === 1) {
      // Last item — fade out before removing
      setIsDeselecting(true);
      setPendingRemoveId(id);
      setDeselectAction(() => () => onRemove(id));
    } else {
      // More than 1 item — remove immediately
      onRemove(id);
    }
  };

  // Called after fade-out animation completes
  const onAnimationComplete = () => {
    if (isDeselecting) {
      if (deselectAction) deselectAction();

      // Reset fade-out states
      setIsDeselecting(false);
      setDeselectAction(null);
      setPendingRemoveId(null);

      setCurrentPage(1);
    }

    if (isExiting && exitTarget) {
      router.push(exitTarget);
    }
  };

  if (totalItems === 0) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="selected-roads"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isDeselecting || isExiting ? 0 : 1,
          y: isDeselecting || isExiting ? 20 : 0,
        }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        onAnimationComplete={onAnimationComplete}
        className="mt-8 text-black"
      >
        <h2 className="text-xl font-semibold mb-2 px-1">
          Selected Road Segments ({totalItems}
          {typeof totalSelected === "number" ? ` of ${totalSelected}` : ""})
        </h2>

        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 border-b text-lg">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                {columns.map((column) => (
                  <th key={column.id} className="py-3 px-4 text-left">
                    {column.label}
                  </th>
                ))}
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((feature, index) => (
                <tr
                  key={feature.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } hover:bg-gray-100`}
                >
                  <td className="py-3 px-4 border-b">{feature.id}</td>
                  {columns.map((column) => (
                    <td key={column.id} className="py-3 px-4 border-b">
                      {feature.properties[column.id] ?? "-"}
                    </td>
                  ))}
                  <td className="py-3 px-4 border-b">
                    <button
                      className="px-3 py-1 mb-0.5 bg-rose-400 hover:bg-rose-700 text-lg font-bold rounded-xl shadow-lg hover:shadow-rose-500/100 transition duration-150"
                      onClick={() => handleRemoveClick(feature.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-50 border-t text-md text-gray-600 space-y-3 md:space-y-0">
            <SelectedRoadsActions
              isFiltered={isFiltered}
              onDeselectFiltered={handleDeselectClick}
              onDeselectAll={handleDeselectClick}
              onShowMap={onShowMap}
            />
            <PaginationInfo
              currentPage={currentPage}
              itemsPerPage={ITEMS_PER_PAGE}
              totalItems={totalItems}
            />
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SelectedRoadsTable;
