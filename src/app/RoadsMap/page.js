"use client";

import { useEffect } from "react";
import { useSelection } from "@/context/SelectionContext";
import { MapContainer, TileLayer, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function RoadsMap() {
  const { visibleSelectedItems, selectedItems } = useSelection();

  // If filtered, use visibleSelectedItems, else selectedItems
  const dataToShow = visibleSelectedItems.length
    ? visibleSelectedItems
    : selectedItems;

  // Calculate map center from data or default
  const center = dataToShow.length
    ? [
        dataToShow[0].geometry.coordinates[0][1],
        dataToShow[0].geometry.coordinates[0][0],
      ]
    : [23.1291, 113.2644]; // Default center: Guangzhou city coords

  return (
    <div className="h-screen w-full">
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {dataToShow.map((feature) => {
          if (!feature.geometry || feature.geometry.type !== "LineString")
            return null;

          // Extract latlngs for Polyline
          const latlngs = feature.geometry.coordinates.map(([lng, lat]) => [
            lat,
            lng,
          ]);

          return (
            <Polyline key={feature.id} positions={latlngs} color="blue">
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
    </div>
  );
}
