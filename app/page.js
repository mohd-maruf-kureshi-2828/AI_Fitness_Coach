"use client";

import { useState } from "react";
import UserForm from "../components/UserForm";
import AiResult from "../components/AiResult";

export default function Home() {
  const [plan, setPlan] = useState("");

  return (
    <>

      <main
        style={{
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        {/* FORM ONLY WHEN NO PLAN */}
        {!plan && (
          <UserForm onGenerate={setPlan} />
        )}

        {/* RESULT ONLY WHEN PLAN EXISTS */}
        {plan && (
          <AiResult plan={plan} onReset={() => setPlan("")} />
        )}
      </main>
    </>
  );
}

