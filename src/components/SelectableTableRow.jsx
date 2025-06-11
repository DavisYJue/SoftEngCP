import React from "react";

const SelectableTableRow = ({
  feature,
  columns,
  index,
  isSelected,
  onClick,
}) => {
  const featureId = feature.id;
  const selected = isSelected(featureId);
  const bgColor = selected
    ? "bg-blue-100"
    : index % 2 === 0
    ? "bg-white"
    : "bg-gray-100";

  return (
    <tr
      className={`cursor-pointer ${bgColor}`}
      onClick={() => onClick(featureId)}
    >
      <td
        className="py-3 px-4 border-b text-center"
        onClick={(e) => {
          e.stopPropagation();
          onClick(featureId);
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
      {columns.map((col) => (
        <td key={col.id} className="py-3 px-4 border-b">
          {feature.properties[col.id] ?? "-"}
        </td>
      ))}
    </tr>
  );
};

export default SelectableTableRow;
