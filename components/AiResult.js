"use client";

export default function AiResult({ plan, onReset }) {
  return (
    <div
      style={{
        background: "var(--card)",
        padding: "32px",
        borderRadius: "26px",
        maxWidth: "520px",
        width: "100%",
        color: "var(--text)",
        animation: "fadeUp 0.6s ease",
        boxShadow:
          "0 20px 40px rgba(0,0,0,0.25)",
      }}
    >
      {/* Title */}
      <h2
        style={{
          textAlign: "center",
          fontSize: "22px",
          fontWeight: "700",
          marginBottom: "18px",
          letterSpacing: "0.4px",
        }}
      >
        🤖 Your AI Fitness Plan
      </h2>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "var(--border)",
          marginBottom: "18px",
        }}
      />

      {/* Result Text */}
      <pre
        style={{
          whiteSpace: "pre-wrap",
          fontFamily:
            "Inter, system-ui, -apple-system, sans-serif",
          fontSize: "15px",
          lineHeight: "1.7",
          color: "var(--text)",
          background: "transparent",
          margin: 0,
        }}
      >
        {plan}
      </pre>

      {/* Footer actions */}
      <button
        onClick={onReset}
        style={{
          marginTop: "26px",
          width: "100%",
          padding: "14px",
          borderRadius: "14px",
          border: "none",
          cursor: "pointer",
          background:
            "linear-gradient(135deg,#f472b6,#fb7185)",
          color: "#020617",
          fontWeight: "700",
          fontSize: "15px",
        }}
      >
        🔁 Create New Plan
      </button>
    </div>
  );
}



