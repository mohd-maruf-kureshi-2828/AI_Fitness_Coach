"use client";

import { useState } from "react";
import Navbar from "./ClientNavbar";
import UserForm from "./UserForm";
import AiResult from "./AiResult";

export default function Home() {
  const [plan, setPlan] = useState("");

  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div style={{ display: "grid", gap: "20px" }}>
          <UserForm onGenerate={setPlan} />
          {plan && <AiResult plan={plan} />}
        </div>
      </main>
    </>
  );
}
