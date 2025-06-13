export default function DistrictLegend({ colorMap }) {
  return (
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
            <span style={{ fontSize: "15px", color: "black" }}>{district}</span>
          </div>
        ))}
      </div>

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
  );
}
