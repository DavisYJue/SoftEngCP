// SelectedRoadsActions.jsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";

const SelectedRoadsActions = ({
  isFiltered,
  onDeselectFiltered,
  onDeselectAll,
}) => {
  const router = useRouter();

  return (
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
  );
};

export default SelectedRoadsActions;
