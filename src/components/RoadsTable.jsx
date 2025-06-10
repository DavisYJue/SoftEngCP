// components/RoadsTable.jsx
import React from "react";
import Pagination from "./Pagination";

const RoadsTable = ({
  data,
  columns,
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}) => {
  if (!data.length) {
    return (
      <div className="py-6 px-4 text-center text-black">
        No matching roads found
      </div>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = data.slice(startIndex, endIndex);

  return (
    <div className="overflow-x-auto rounded-lg shadow text-black">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="py-3 px-4 text-left">ID</th>
            {columns.map((column) => (
              <th key={column.id} className="py-3 px-4 text-left">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((feature, index) => (
            <tr
              key={feature.id || index}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="py-3 px-4 border-b">{startIndex + index + 1}</td>
              {columns.map((column) => (
                <td key={column.id} className="py-3 px-4 border-b">
                  {feature.properties[column.id] || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default RoadsTable;
