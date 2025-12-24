"use client";

import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav
      style={{
        padding: "18px 28px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>💪 AI Fitness Coach</h2>
      <ThemeToggle />
    </nav>
  );
}
