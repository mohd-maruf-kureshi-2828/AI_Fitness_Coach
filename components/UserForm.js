"use client";

import { useState } from "react";

export default function UserForm({ onGenerate, theme }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    goal: "",
    level: "",
    diet: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Empty field validation
    for (let key in form) {
      if (!form[key]) {
        setError("⚠️ Please fill all fields before generating the plan");
        return;
      }
    }

    setError("");

    try {
      // API Call (replace /api/generatePlan with your backend route)
      const response = await fetch("/api/generatePlan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      onGenerate(data.plan); // Pass plan to AiResult
    } catch (err) {
      setError("❌ Error generating plan. Try again!");
    }
  };

  return (
    <div
      style={{
        background: "var(--card)",
        padding: "28px",
        borderRadius: "24px",
        maxWidth: "460px",
        width: "100%",
        display: "grid",
        gap: "14px",
        animation: "fadeUp 0.6s ease",
      }}
    >
      <h2 style={{ textAlign: "center", color: "var(--text)" }}>
        AI Fitness Plan Generator 🧠
      </h2>

      {error && (
        <p style={{ color: "#f87171", fontSize: "14px", textAlign: "center" }}>
          {error}
        </p>
      )}

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        style={{
          padding: "14px",
          borderRadius: "14px",
          border: "1px solid var(--border)",
          background: "var(--card)",
          color: "var(--text)",
        }}
      />
      <input
        name="age"
        type="number"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
        style={{
          padding: "14px",
          borderRadius: "14px",
          border: "1px solid var(--border)",
          background: "var(--card)",
          color: "var(--text)",
        }}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          name="height"
          placeholder="Height (cm)"
          value={form.height}
          onChange={handleChange}
          style={{
            padding: "14px",
            borderRadius: "14px",
            border: "1px solid var(--border)",
            background: "var(--card)",
            color: "var(--text)",
            flex: 1,
          }}
        />
        <input
          name="weight"
          placeholder="Weight (kg)"
          value={form.weight}
          onChange={handleChange}
          style={{
            padding: "14px",
            borderRadius: "14px",
            border: "1px solid var(--border)",
            background: "var(--card)",
            color: "var(--text)",
            flex: 1,
          }}
        />
      </div>

      <select
        name="goal"
        value={form.goal}
        onChange={handleChange}
        style={{
          padding: "14px",
          borderRadius: "14px",
          border: "1px solid var(--border)",
          background: "var(--card)",
          color: "var(--text)",
        }}
      >
        <option value="">Fitness Goal</option>
        <option>Weight Loss</option>
        <option>Muscle Gain</option>
        <option>Stay Fit</option>
      </select>

      <select
        name="level"
        value={form.level}
        onChange={handleChange}
        style={{
          padding: "14px",
          borderRadius: "14px",
          border: "1px solid var(--border)",
          background: "var(--card)",
          color: "var(--text)",
        }}
      >
        <option value="">Fitness Level</option>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>

      <select
        name="diet"
        value={form.diet}
          onChange={handleChange}
        style={{
          padding: "14px",
          borderRadius: "14px",
          border: "1px solid var(--border)",
          background: "var(--card)",
          color: "var(--text)",
        }}
        
      >
        <option value="">Diet Preference</option>
        <option>Veg</option>
        <option>Non-Veg</option>
        <option>Vegan</option>
        <option>Keto</option>
      </select>

      <button
        onClick={handleSubmit}
        style={{
          marginTop: "10px",
          padding: "14px",
          borderRadius: "14px",
          border: "none",
          cursor: "pointer",
          background: "linear-gradient(135deg,#22d3ee,#38bdf8)",
          color: "#020617",
          fontWeight: "bold",
        }}
      >
        Generate AI Plan 🚀
      </button>
    </div>
  );
}

