"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";

const SelectionContext = createContext();

export const useSelection = () => useContext(SelectionContext);

const FILTERS_STORAGE_KEY = "roads_filters";

export const SelectionProvider = ({ children }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  // Filters moved here and persisted
  const [filterText, setFilterText] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [suffixFilter, setSuffixFilter] = useState("");

  // Load filters from localStorage on mount
  useEffect(() => {
    try {
      const storedFilters = localStorage.getItem(FILTERS_STORAGE_KEY);
      if (storedFilters) {
        const { filterText, districtFilter, suffixFilter } =
          JSON.parse(storedFilters);
        setFilterText(filterText || "");
        setDistrictFilter(districtFilter || "");
        setSuffixFilter(suffixFilter || "");
      }
    } catch (e) {
      console.warn("Failed to load filters from localStorage", e);
    }
  }, []);

  // Persist filters to localStorage when changed
  useEffect(() => {
    const filters = { filterText, districtFilter, suffixFilter };
    localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filters));
  }, [filterText, districtFilter, suffixFilter]);

  // Load selectedIds from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("selectedIds");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setSelectedIds(parsed);
      } catch (e) {
        console.warn("Failed to parse selectedIds from localStorage", e);
      }
    }
  }, []);

  // Persist selectedIds to localStorage when changed
  useEffect(() => {
    localStorage.setItem("selectedIds", JSON.stringify(selectedIds));
  }, [selectedIds]);

  // Compute filteredData based on originalData + filters
  const filteredData = useMemo(() => {
    if (!originalData.length) return [];

    let filtered = [...originalData];

    if (filterText.trim()) {
      const searchTerm = filterText.toLowerCase();
      filtered = filtered.filter((item) => {
        const props = item.properties;
        return (
          item.id?.toString().includes(searchTerm) ||
          props.name?.toLowerCase().includes(searchTerm)
        );
      });
    }

    if (districtFilter) {
      filtered = filtered.filter(
        (item) => item.properties.district_name === districtFilter
      );
    }

    if (suffixFilter) {
      filtered = filtered.filter(
        (item) => item.properties.suffix === suffixFilter
      );
    }

    return filtered;
  }, [originalData, filterText, districtFilter, suffixFilter]);

  // All selected items
  const selectedItems = useMemo(() => {
    return originalData.filter((item) => selectedIds.includes(item.id));
  }, [originalData, selectedIds]);

  // Selected items visible under current filter
  const visibleSelectedItems = useMemo(() => {
    return filteredData.filter((item) => selectedIds.includes(item.id));
  }, [filteredData, selectedIds]);

  const resetSelection = () => {
    setSelectedIds([]);
    localStorage.removeItem("selectedIds");
  };

  return (
    <SelectionContext.Provider
      value={{
        selectedIds,
        setSelectedIds,
        originalData,
        setOriginalData,
        filteredData,
        filterText,
        setFilterText,
        districtFilter,
        setDistrictFilter,
        suffixFilter,
        setSuffixFilter,
        selectedItems,
        visibleSelectedItems,
        resetSelection,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};
