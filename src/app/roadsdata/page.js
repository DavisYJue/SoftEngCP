"use client";

import Template from "@/components/Template";
import FilterSection from "@/components/FilterSection";
import RoadsTable from "@/components/RoadsTable";
import LoadingIcon from "@/components/LoadingIcon";
import { useRoadsData } from "@/hooks/useRoadsData";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { usePageAnimation } from "@/hooks/animations";
import SelectedRoadsActions from "@/components/SelectedRoadsActions";

const RoadsDataPage = () => {
  const router = useRouter();
  const { isExiting, exitTarget, variants, transition, startExit } =
    usePageAnimation();

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
  } = useRoadsData();

  const clearFilters = () => {
    setFilterText("");
    setDistrictFilter("");
    setSuffixFilter("");
  };

  const handleBackClick = () => {
    startExit("/");
  };

  const handleShowMapClick = () => {
    startExit("/roadsmap");
  };

  const onExitComplete = () => {
    if (isExiting && exitTarget) {
      router.push(exitTarget);
    }
  };

  if (isLoading) return <LoadingIcon />;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <Template>
      <AnimatePresence mode="wait">
        <motion.div
          key="roads-data-page"
          initial="initial"
          animate={isExiting ? "exit" : "animate"}
          exit="exit"
          variants={variants}
          transition={transition}
          className="z-10 size-full"
          onAnimationComplete={onExitComplete}
        >
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
              onShowMap={handleShowMapClick}
            />

            <button
              onClick={handleBackClick}
              disabled={isExiting}
              className="flex w-50 justify-center items-center space-x-2 px-4 py-2 bg-indigo-400 hover:bg-indigo-500 text-black text-lg font-bold rounded-xl shadow-lg hover:shadow-violet-500/100 transition-transform duration-300 mt-6 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Back to Main Page</span>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </Template>
  );
};

export default RoadsDataPage;
