import { Polyline, Popup } from "react-leaflet";

export default function RoadPolyline({ feature }) {
  if (!feature.geometry || feature.geometry.type !== "LineString") return null;

  const latlngs = feature.geometry.coordinates.map(([lng, lat]) => [lat, lng]);

  return (
    <Polyline key={feature.id} positions={latlngs} color="black" weight={5}>
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
}
