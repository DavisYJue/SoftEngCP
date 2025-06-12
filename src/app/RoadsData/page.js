"use client";

import Template from "@/components/Template";
import FilterSection from "@/components/FilterSection";
import RoadsTable from "@/components/RoadsTable";
import { useRoadsData } from "@/hooks/useRoadsData";

const RoadsDataPage = () => {
  const {
    originalData,
    filteredData,
    filterText,
    setFilterText,
    districtFilter,
    setDistrictFilter,
    suffixFilter,
    setSuffixFilter,
    districts,
    currentPage,
    setCurrentPage,
    isLoading,
    error,
    ITEMS_PER_PAGE,
    selectedIds,
    setSelectedIds,
    selectedItems,
    visibleSelectedItems,
  } = useRoadsData();

  const clearFilters = () => {
    setFilterText("");
    setDistrictFilter("");
    setSuffixFilter("");
  };

  if (isLoading)
    return <div className="p-8 text-center">Loading road data...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <Template>
      <div className="container mx-auto p-4">
        <h1 className="flex justify-center items-center text-4xl text-black font-bold mb-6">
          Guangzhou Road Network Data
        </h1>

        <FilterSection
          filterText={filterText}
          districtFilter={districtFilter}
          suffixFilter={suffixFilter}
          districts={districts}
          onFilterChange={(e) => setFilterText(e.target.value)}
          onDistrictChange={(e) => setDistrictFilter(e.target.value)}
          onSuffixChange={(e) => setSuffixFilter(e.target.value)}
          onClearFilters={clearFilters}
          filteredCount={filteredData.length}
          totalCount={originalData.length}
        />

        <RoadsTable
          data={filteredData}
          originalData={originalData}
          columns={[
            { id: "name", label: "Road Name" },
            { id: "name_no_suffix", label: "Name Without Suffix" },
            { id: "suffix", label: "Suffix" },
            { id: "district_name", label: "District" },
            { id: "city", label: "City" },
            { id: "geometry_length", label: "Geometry Length" },
          ]}
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={filteredData.length}
          onPageChange={setCurrentPage}
        />
      </div>
    </Template>
  );
};

export default RoadsDataPage;
