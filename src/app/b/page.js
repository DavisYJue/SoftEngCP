"use client";

import dynamic from "next/dynamic";
import { useSelection } from "@/context/SelectionContext";
import { useMemo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Template from "@/components/Template";

// Dynamic import with no SSR for Leaflet map
const RoadsMapLeaflet = dynamic(() => import("@/components/RoadsMapLeaflet"), {
  ssr: false,
});

export default function RoadsMap() {
  const router = useRouter();
  const { visibleSelectedItems, selectedItems, setOriginalData } =
    useSelection();
  const [districtsGeoJSON, setDistrictsGeoJSON] = useState(null);

  // State to track if component is mounted on client
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Load original roads data once on mount
  useEffect(() => {
    fetch("/data/final_gz_roads_ID.geojson")
      .then((res) => res.json())
      .then((data) => {
        if (data.features && Array.isArray(data.features)) {
          setOriginalData(data.features); // <-- set array of features here
        } else {
          console.error("Invalid GeoJSON roads data:", data);
          setOriginalData([]);
        }
      })
      .catch((err) => console.error("Failed to load roads data:", err));
  }, [setOriginalData]);

  // Load districts GeoJSON on mount
  useEffect(() => {
    fetch("/data/final_gz_districts.geojson")
      .then((res) => res.json())
      .then((data) => setDistrictsGeoJSON(data))
      .catch((err) => console.error("Failed to load district GeoJSON:", err));
  }, []);

  // Data to show on map: visibleSelectedItems if any, otherwise all selectedItems
  const dataToShow =
    visibleSelectedItems?.length > 0
      ? visibleSelectedItems
      : selectedItems || [];

  // Find the major road (longest) to center map
  const majorRoad = useMemo(() => {
    if (!dataToShow.length) return null;
    return dataToShow.reduce((max, curr) =>
      curr.properties.geometry_length > max.properties.geometry_length
        ? curr
        : max
    );
  }, [dataToShow]);

  const center = useMemo(() => {
    if (
      majorRoad?.geometry?.coordinates?.[0]?.[1] &&
      majorRoad?.geometry?.coordinates?.[0]?.[0]
    ) {
      return [
        majorRoad.geometry.coordinates[0][1],
        majorRoad.geometry.coordinates[0][0],
      ];
    }
    return [23.1291, 113.2644]; // Guangzhou default
  }, [majorRoad]);

  return (
    <Template>
      <div
        className="w-full m-5 bg-white rounded-lg shadow p-6 flex flex-col space-y-4"
        style={{ height: "calc(100vh - 80px)" }}
      >
        {/* Back button */}
        <button
          onClick={() => router.push("/RoadsData")}
          className="flex w-1/20 text-center items-center space-x-2 px-4 py-2 bg-indigo-400 hover:bg-indigo-500 text-black text-xl font-bold rounded-xl shadow-lg hover:shadow-violet-500/100 transition-transform duration-300"
        >
          <span>Back</span>
        </button>

        {/* Map container */}
        <div className="rounded-lg overflow-hidden flex-grow">
          {hasMounted && (
            <RoadsMapLeaflet
              dataToShow={dataToShow}
              center={center}
              districtsGeoJSON={districtsGeoJSON}
            />
          )}
        </div>
      </div>
    </Template>
  );
}
