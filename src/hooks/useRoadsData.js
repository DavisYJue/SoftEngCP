// src/hooks/useRoadsData.js
import { useState, useEffect } from "react";

const ITEMS_PER_PAGE = 20;

const computeGeometryLength = (geometry) => {
  if (!geometry || geometry.type !== "LineString") return 0;
  let length = 0;
  for (let i = 1; i < geometry.coordinates.length; i++) {
    const [x1, y1] = geometry.coordinates[i - 1];
    const [x2, y2] = geometry.coordinates[i];
    const dx = x2 - x1;
    const dy = y2 - y1;
    length += Math.sqrt(dx * dx + dy * dy);
  }
  return parseFloat(length.toFixed(4));
};

export function useRoadsData() {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [suffixFilter, setSuffixFilter] = useState(""); // new suffix filter state
  const [districts, setDistricts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roadsResponse = await fetch("/data/final_gz_roads_ID.geojson");
        const roadsJson = await roadsResponse.json();

        const processedFeatures = roadsJson.features.map((feature) => {
          const length = computeGeometryLength(feature.geometry);
          return {
            ...feature,
            properties: {
              ...feature.properties,
              geometry_length: length,
            },
          };
        });

        setOriginalData(processedFeatures);
        setFilteredData(processedFeatures);

        const districtsResponse = await fetch(
          "/data/final_gz_districts.geojson"
        );
        const districtsJson = await districtsResponse.json();

        const uniqueDistricts = Array.from(
          new Set(districtsJson.features.map((f) => f.properties.district_name))
        ).sort();

        setDistricts(uniqueDistricts);
      } catch (err) {
        setError("Failed to load road data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!originalData.length) return;

    let result = [...originalData];

    if (filterText.trim()) {
      const searchTerm = filterText.toLowerCase();
      result = result.filter((feature) => {
        const props = feature.properties;
        return (
          feature.id?.toString().includes(searchTerm) ||
          props.name?.toLowerCase().includes(searchTerm)
        );
      });
    }

    if (districtFilter) {
      result = result.filter(
        (feature) => feature.properties.district_name === districtFilter
      );
    }

    if (suffixFilter) {
      result = result.filter(
        (feature) => feature.properties.suffix === suffixFilter
      );
    }

    setFilteredData(result);
    setCurrentPage(1);
  }, [filterText, districtFilter, suffixFilter, originalData]);

  return {
    originalData,
    filteredData,
    filterText,
    setFilterText,
    districtFilter,
    setDistrictFilter,
    suffixFilter, // expose suffix filter state
    setSuffixFilter, // expose suffix filter setter
    districts,
    currentPage,
    setCurrentPage,
    isLoading,
    error,
    ITEMS_PER_PAGE,
  };
}
