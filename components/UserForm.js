"use client";

import { useState } from "react";

export default function UserForm({ onGenerate }) {
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

  // Normal change (NO LIMIT HERE)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // LIMIT ONLY WHEN USER LEAVES FIELD
  const handleBlur = (e) => {
    const { name, value } = e.target;
    let v = Number(value);

    if (name === "height") {
      if (v < 100) v = 100;
      if (v > 230) v = 230;
    }

    if (name === "weight") {
      if (v < 30) v = 30;
      if (v > 200) v = 200;
    }

    if (value !== "") {
      setForm({ ...form, [name]: v });
    }
  };

  const handleSubmit = async () => {
    for (let key in form) {
      if (!form[key]) {
        setError("⚠️ Please fill all fields before generating the plan");
        return;
      }
    }

    setError("");

    try {
      const response = await fetch("/api/generatePlan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (data.plan) onGenerate(data.plan);
      else setError("❌ Error generating plan. Try again!");
    } catch {
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
        style={inputStyle}
      />

      <input
        name="age"
        type="number"
        inputMode="numeric"
        placeholder="Age (10–75)"
        value={form.age}
        onChange={handleChange}
        style={inputStyle}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          name="height"
          type="number"
          inputMode="numeric"
          placeholder="Height (cm, 100–230)"
          value={form.height}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ ...inputStyle, flex: 1 }}
        />

        <input
          name="weight"
          type="number"
          inputMode="numeric"
          placeholder="Weight (kg, 30–200)"
          value={form.weight}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ ...inputStyle, flex: 1 }}
        />
      </div>

      {/* LISTS SAME AS BEFORE */}
      <select
        name="goal"
        value={form.goal}
        onChange={handleChange}
        style={inputStyle}
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
        style={inputStyle}
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
        style={inputStyle}
      >
        <option value="">Diet Preference</option>
        <option>Veg</option>
        <option>Non-Veg</option>
        <option>Vegan</option>
        <option>Keto</option>
      </select>

      <button onClick={handleSubmit} style={btnStyle}>
        Generate AI Plan 🚀
      </button>

      {/* REMOVE NUMBER ARROWS */}
      <style jsx global>{`
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}

const inputStyle = {
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid var(--border)",
  background: "var(--card)",
  color: "var(--text)",
};

const btnStyle = {
  marginTop: "10px",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  cursor: "pointer",
  background: "linear-gradient(135deg,#22d3ee,#38bdf8)",
  color: "#020617",
  fontWeight: "bold",
};



