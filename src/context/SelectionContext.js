"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

const SelectionContext = createContext();

export const useSelection = () => useContext(SelectionContext);

export const SelectionProvider = ({ children }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const selectedItems = useMemo(() => {
    return originalData.filter((item) => selectedIds.includes(item.id));
  }, [originalData, selectedIds]);

  const visibleSelectedItems = useMemo(() => {
    return filteredData.filter((item) => selectedIds.includes(item.id));
  }, [filteredData, selectedIds]);

  const filteredSelections = useMemo(() => {
    const map = {};
    for (const item of selectedItems) {
      const suffix = item.properties.suffix;
      if (!suffix) continue;
      if (!map[suffix]) map[suffix] = [];
      map[suffix].push(item);
    }
    return map;
  }, [selectedItems]);

  return (
    <SelectionContext.Provider
      value={{
        selectedIds,
        setSelectedIds,
        originalData,
        setOriginalData,
        filteredData,
        setFilteredData,
        selectedItems,
        visibleSelectedItems,
        filteredSelections,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};
