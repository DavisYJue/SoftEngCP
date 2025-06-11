"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 10;

const SelectedRoadsTable = ({
  selectedItems,
  columns,
  onRemove,
  isFiltered,
  onDeselectFiltered,
  onDeselectAll,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const totalItems = selectedItems.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const currentItems = selectedItems.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (totalItems === 0) return null;

  return (
    <div className="mt-8 text-black">
      {/* Header above the styled container */}
      <h2 className="text-xl font-semibold mb-2 px-1">
        Selected Road Segments ({totalItems})
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
                    onClick={() => onRemove(feature.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination and action buttons */}
        <div className="flex justify-between items-center p-4 bg-gray-50 border-t text-md text-gray-600">
          {/* Left: Action buttons */}
          <div className="flex space-x-2">
            <button
              onClick={isFiltered ? onDeselectFiltered : onDeselectAll}
              className="px-3 py-1 bg-rose-400 hover:bg-rose-700 text-lg font-bold rounded-xl shadow-lg hover:shadow-rose-500/100 transition duration-150 text-black"
            >
              {isFiltered ? "Deselect Filtered" : "Deselect All"}
            </button>
            <button
              onClick={() => router.push("/RoadsMap")}
              className="px-4 py-1 bg-emerald-400 hover:bg-emerald-600 text-black text-lg font-bold rounded-xl shadow-lg hover:shadow-green-600/100 transition-transform duration-300"
            >
              Show Roads Mapping
            </button>
          </div>

          {/* Center: Pagination status */}
          <span>
            Showing {startIndex + 1} to {endIndex} of {totalItems}
          </span>

          {/* Right: Pagination controls */}
          <div className="flex space-x-2 items-center">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-indigo-300 hover:bg-indigo-400 text-gray-400 hover:text-gray-400 text-lg font-bold rounded-xl shadow-lg hover:shadow-violet-400/100 transition-transform duration-300 cursor-not-allowed"
                  : "bg-indigo-400 hover:bg-indigo-500 text-black text-lg font-bold rounded-xl shadow-lg hover:shadow-violet-500/100 transition-transform duration-300"
              }`}
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
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-indigo-300 hover:bg-indigo-400 text-gray-400 hover:text-gray-400 text-lg font-bold rounded-xl shadow-lg hover:shadow-violet-400/100 transition-transform duration-300 cursor-not-allowed"
                  : "bg-indigo-400 hover:bg-indigo-500 text-black text-lg font-bold rounded-xl shadow-lg hover:shadow-violet-500/100 transition-transform duration-300"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedRoadsTable;
