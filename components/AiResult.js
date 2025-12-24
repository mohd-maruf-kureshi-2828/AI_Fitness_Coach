"use client";

import { useRef, useState } from "react";
import jsPDF from "jspdf";

export default function AiResult({ plan, onReset }) {
  const planRef = useRef(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Download PDF (emojis & special characters fix)
  const downloadPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");

    // Render HTML content into PDF
    await pdf.html(planRef.current, {
      x: 10,
      y: 10,
      width: 190,
      windowWidth: 800,
      html2canvas: {
        scale: 0.95,
        useCORS: true,
      },
    });

    pdf.save("AI_Fitness_Plan.pdf");
  };

  // Copy plan with modern toast popup
  const copyPlan = () => {
    navigator.clipboard.writeText(plan);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000); // hide after 2 sec
  };

  return (
    <div
      style={{
        background: "var(--card)",
        padding: "34px",
        borderRadius: "28px",
        maxWidth: "620px",
        width: "100%",
        color: "var(--text)",
        animation: "slideUp 0.7s ease",
        boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
        position: "relative",
      }}
    >
      {/* Header */}
      <h2
        style={{
          textAlign: "center",
          fontSize: "26px",
          fontWeight: "800",
          marginBottom: "6px",
        }}
      >
        🤖 AI Fitness Blueprint
      </h2>

      <p
        style={{
          textAlign: "center",
          fontSize: "13px",
          color: "var(--muted, #94a3b8)",
          marginBottom: "18px",
        }}
      >
        Personalized • Smart • Goal-Based Plan
      </p>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "var(--border)",
          marginBottom: "20px",
        }}
      />

      {/* Result */}
      <div
        ref={planRef}
        style={{
          maxHeight: "340px",
          overflowY: "auto",
          paddingRight: "6px",
        }}
      >
        <pre
          style={{
            whiteSpace: "pre-wrap",
            fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            fontSize: "14.5px",
            lineHeight: "1.8",
            margin: 0,
            color: "var(--text)",
          }}
        >
          {plan}
        </pre>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          marginTop: "26px",
        }}
      >
        <button
          onClick={downloadPDF}
          style={btnStyle("linear-gradient(135deg,#22d3ee,#38bdf8)")}
        >
          📄 Download PDF
        </button>

        <button
          onClick={copyPlan}
          style={btnStyle("linear-gradient(135deg,#a78bfa,#f472b6)")}
        >
          📋 Copy Plan
        </button>
      </div>

      {/* Reset */}
      <button
        onClick={onReset}
        style={{
          marginTop: "16px",
          width: "100%",
          padding: "14px",
          borderRadius: "16px",
          border: "none",
          cursor: "pointer",
          background: "linear-gradient(135deg,#f59e0b,#f97316)",
          color: "#020617",
          fontWeight: "800",
          fontSize: "15px",
        }}
      >
        🔁 Generate New Plan
      </button>

      {/* Toast popup for copy */}
      {copySuccess && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "linear-gradient(135deg,#4ade80,#22c55e)",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: "12px",
            fontWeight: "700",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            zIndex: 999,
            animation: "fadeInOut 2s forwards",
          }}
        >
          ✅ Plan copied to clipboard!
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}

// Button style helper
const btnStyle = (bg) => ({
  padding: "14px",
  borderRadius: "16px",
  border: "none",
  cursor: "pointer",
  background: bg,
  color: "#020617",
  fontWeight: "800",
  fontSize: "14px",
});




