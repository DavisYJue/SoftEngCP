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

  const [filterText, setFilterText] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [suffixFilter, setSuffixFilter] = useState("");

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

  useEffect(() => {
    const filters = { filterText, districtFilter, suffixFilter };
    localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filters));
  }, [filterText, districtFilter, suffixFilter]);

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

  useEffect(() => {
    localStorage.setItem("selectedIds", JSON.stringify(selectedIds));
  }, [selectedIds]);

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

  const selectedItems = useMemo(() => {
    return originalData.filter((item) => selectedIds.includes(item.id));
  }, [originalData, selectedIds]);

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
