// SelectedRoadsTable.js
import React from "react";

const SelectedRoadsTable = ({ selectedItems, columns, onRemove }) => (
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
                  onClick={() => onRemove(feature.id)}
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
);

export default SelectedRoadsTable;
