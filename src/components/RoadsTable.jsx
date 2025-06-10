import React, { useState } from "react";
import Pagination from "./Pagination";

const RoadsTable = ({
  data,
  columns,
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}) => {
  const [selectedIds, setSelectedIds] = useState([]);

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

  if (!data.length) {
    return (
      <div className="py-6 px-4 text-center text-black">
        No matching roads found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow text-black">
      {/* Main Table */}
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="py-3 px-4 text-left">Select</th>
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
                    : "bg-gray-50"
                }`}
                onClick={() => handleRowClick(featureId)}
              >
                <td
                  className="py-3 px-4 border-b"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => handleRowClick(featureId)}
                    className="w-4 h-4 m-3"
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
      />

      {/* Selected Table */}
      {selectedItems.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">
            Selected Road Segments ({selectedItems.length})
          </h2>
          <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 border-b">
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
                {selectedItems.map((feature) => (
                  <tr key={feature.id} className="bg-white hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">{feature.id}</td>
                    {columns.map((column) => (
                      <td key={column.id} className="py-3 px-4 border-b">
                        {feature.properties[column.id] ?? "-"}
                      </td>
                    ))}
                    <td className="py-3 px-4 border-b">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                        onClick={() => handleRemoveSelected(feature.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadsTable;
