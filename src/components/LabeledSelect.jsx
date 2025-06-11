import React from "react";

const LabeledSelect = ({ label, value, onChange, options, defaultOption }) => (
  <div>
    <label className="block text-lg font-semibold text-gray-700 mb-1">
      {label}
    </label>
    <select
      value={value}
      onChange={onChange}
      className="h-10.5 w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">{defaultOption}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default LabeledSelect;
