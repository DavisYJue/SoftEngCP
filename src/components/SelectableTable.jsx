import React from "react";
import SelectableTableRow from "./SelectableTableRow";
import RoadsTableHeader from "./RoadsTableHeader";

const SelectableTable = ({ data, columns, isSelected, onRowClick }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow text-black">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100 border-b text-lg">
          <RoadsTableHeader columns={columns} />
        </thead>
        <tbody>
          {data.map((feature, index) => (
            <SelectableTableRow
              key={feature.id}
              feature={feature}
              columns={columns}
              index={index}
              isSelected={isSelected}
              onClick={onRowClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectableTable;
