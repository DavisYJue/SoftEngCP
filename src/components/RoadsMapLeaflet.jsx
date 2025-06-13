"use client";

import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

import RoadPolyline from "@/components/RoadPolyline";
import DistrictLegend from "@/components/DistrictLegend";

const colorMap = {
  荔湾区: "#4c0519",
  越秀区: "#22c55e",
  海珠区: "#fcd34d",
  天河区: "#1d4ed8",
  白云区: "#f97316",
  黄埔区: "#911eb4",
  番禺区: "#008080",
  花都区: "#f032e6",
  南沙区: "#e6194b",
  从化区: "#006400",
  增城区: "#06b6d4",
  博罗县: "#ff4500",
};

function FitBoundsToDistricts({ districtsGeoJSON }) {
  const map = useMap();

  useEffect(() => {
    if (districtsGeoJSON) {
      const geojsonLayer = L.geoJSON(districtsGeoJSON);
      const bounds = geojsonLayer.getBounds();
      map.fitBounds(bounds, { padding: [50, 50] });

      setTimeout(() => {
        map.setZoom(map.getZoom() + 1);
      }, 500);
    }
  }, [districtsGeoJSON, map]);

  return null;
}

export default function RoadsMapLeaflet({
  dataToShow,
  center,
  districtsGeoJSON,
}) {
  if (!dataToShow.length && !districtsGeoJSON) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No roads or districts to display.
      </div>
    );
  }

  const mapKey = dataToShow.map((f) => f.id).join("-");

  const districtStyle = (feature) => {
    const name = feature.properties.district_name;
    return {
      color: colorMap[name] || "#999",
      weight: 1,
      fillOpacity: 0.3,
      interactive: false,
    };
  };

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <MapContainer
        key={mapKey}
        center={center}
        zoom={11}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {districtsGeoJSON && (
          <>
            <GeoJSON
              data={districtsGeoJSON}
              style={districtStyle}
              onEachFeature={(feature, layer) => {
                const name = feature.properties.district_name;
                layer.bindPopup(`<strong>${name}</strong>`);
              }}
            />
            <FitBoundsToDistricts districtsGeoJSON={districtsGeoJSON} />
          </>
        )}

        {dataToShow.map((feature) => (
          <RoadPolyline key={feature.id} feature={feature} />
        ))}
      </MapContainer>

      <DistrictLegend colorMap={colorMap} />
    </div>
  );
}
