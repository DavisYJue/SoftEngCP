// pages/roads.js
"use client";
import { useState, useEffect } from "react";
import RoadsTable from "../../components/RoadsTable";
import FilterSection from "../../components/FilterSection";
import Template from "@/components/Template";

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

const RoadsDataPage = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const roadColumns = [
    { id: "name", label: "Road Name" },
    { id: "name_no_suffix", label: "Name Without Suffix" },
    { id: "suffix", label: "Suffix" },
    { id: "district_name", label: "District" },
    { id: "city", label: "City" },
    { id: "geometry_length", label: "Geometry Length" },
  ];

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
          props.name.toLowerCase().includes(searchTerm) ||
          (props.name_no_suffix &&
            props.name_no_suffix.toLowerCase().includes(searchTerm))
        );
      });
    }

    if (districtFilter) {
      result = result.filter(
        (feature) => feature.properties.district_name === districtFilter
      );
    }

    setFilteredData(result);
    setCurrentPage(1);
  }, [filterText, districtFilter, originalData]);

  const handleFilterChange = (e) => setFilterText(e.target.value);
  const handleDistrictChange = (e) => setDistrictFilter(e.target.value);
  const handlePageChange = (newPage) => setCurrentPage(newPage);
  const clearFilters = () => {
    setFilterText("");
    setDistrictFilter("");
  };

  if (isLoading)
    return <div className="p-8 text-center">Loading road data...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!originalData.length)
    return <div className="p-8">No road data available</div>;

  return (
    <Template>
      <div className="container mx-auto p-4">
        <h1 className="flex justify-center items-center text-4xl text-black font-bold mb-6">
          Guangzhou Road Network Data
        </h1>

        <FilterSection
          filterText={filterText}
          districtFilter={districtFilter}
          districts={districts}
          onFilterChange={handleFilterChange}
          onDistrictChange={handleDistrictChange}
          onClearFilters={clearFilters}
          filteredCount={filteredData.length}
          totalCount={originalData.length}
        />

        <RoadsTable
          data={filteredData}
          columns={roadColumns}
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={filteredData.length}
          onPageChange={handlePageChange}
        />
      </div>
    </Template>
  );
};

export default RoadsDataPage;
