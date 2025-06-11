import React from "react";

const LabeledInput = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="block text-lg font-semibold text-gray-700 mb-1">
      {label}
    </label>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default LabeledInput;
