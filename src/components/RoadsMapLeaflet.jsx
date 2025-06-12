"use client";

import {
  MapContainer,
  TileLayer,
  Polyline,
  Popup,
  GeoJSON,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

// 12 distinct, vibrant colors for districts
const colorMap = {
  荔湾区: "#4c0519", // deep red
  越秀区: "#22c55e", // spring green
  海珠区: "#fcd34d", // yellow
  天河区: "#1d4ed8", // blue
  白云区: "#f97316", // orange
  黄埔区: "#911eb4", // purple
  番禺区: "#008080", // cyan
  花都区: "#f032e6", // magenta
  南沙区: "#e6194b", // pink/red
  从化区: "#006400", // dark green
  增城区: "#06b6d4", // sky blue
  博罗县: "#ff4500", // orange-red
};

// Helper component to fit map bounds to districts GeoJSON
function FitBoundsToDistricts({ districtsGeoJSON }) {
  const map = useMap();

  useEffect(() => {
    if (districtsGeoJSON) {
      const geojsonLayer = L.geoJSON(districtsGeoJSON);
      map.fitBounds(geojsonLayer.getBounds(), { padding: [50, 50] });
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

        {/* Districts */}
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
            {/* Fit bounds to show all districts */}
            <FitBoundsToDistricts districtsGeoJSON={districtsGeoJSON} />
          </>
        )}

        {/* Roads */}
        {dataToShow.map((feature) => {
          if (!feature.geometry || feature.geometry.type !== "LineString")
            return null;

          const latlngs = feature.geometry.coordinates.map(([lng, lat]) => [
            lat,
            lng,
          ]);

          return (
            <Polyline
              key={feature.id}
              positions={latlngs}
              color="black"
              weight={5}
            >
              <Popup>
                <div>
                  <strong>{feature.properties.name}</strong>
                  <br />
                  Length: {feature.properties.geometry_length} units
                  <br />
                  District: {feature.properties.district_name}
                </div>
              </Popup>
            </Polyline>
          );
        })}
      </MapContainer>

      {/* Floating Legend */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          background: "white",
          padding: "12px",
          borderRadius: "8px",
          boxShadow: "0 0 8px rgba(0,0,0,0.2)",
          color: "black",
          fontSize: "16px",
          zIndex: 1000,
        }}
      >
        <strong style={{ fontSize: "20px" }}>Districts</strong>
        <div style={{ marginTop: "10px" }}>
          {Object.entries(colorMap).map(([district, color]) => (
            <div
              key={district}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "6px",
              }}
            >
              <span
                style={{
                  width: "25px",
                  height: "25px",
                  background: color,
                  opacity: 0.5,
                  display: "inline-block",
                  marginRight: "10px",
                  border: "1px solid #999",
                }}
              />
              <span style={{ fontSize: "15px", color: "black" }}>
                {district}
              </span>
            </div>
          ))}
        </div>

        {/* Road Legend */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            userSelect: "none",
          }}
        >
          <div
            style={{
              flexShrink: 0,
              width: "25px",
              height: "3px",
              backgroundColor: "black",
              borderRadius: "2px",
              boxShadow: "0 0 4px rgba(0, 0, 0, 0.3)",
            }}
          />
          <span style={{ fontSize: "15px", color: "black" }}>Roads</span>
        </div>
      </div>
    </div>
  );
}
