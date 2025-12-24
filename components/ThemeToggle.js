"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light"
    );
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      style={{
        padding: "8px 16px",
        borderRadius: "20px",
        border: "none",
        cursor: "pointer",
        background: "var(--card)",
        color: "var(--text)",
      }}
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}


