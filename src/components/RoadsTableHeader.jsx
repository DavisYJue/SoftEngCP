import React from "react";

const RoadsTableHeader = ({ columns }) => (
  <tr>
    <th className="py-3 px-4 text-center">Select</th>
    <th className="py-3 px-4 text-left">ID</th>
    {columns.map((column) => (
      <th key={column.id} className="py-3 px-4 text-left">
        {column.label}
      </th>
    ))}
  </tr>
);

export default RoadsTableHeader;
