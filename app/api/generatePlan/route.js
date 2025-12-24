import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, age, height, weight, goal, level, diet } = body;

    // -----------------------------
    // VALIDATION & LIMITS
    // -----------------------------
    if (
      !name ||
      age < 10 || age > 75 ||
      height < 100 || height > 230 ||
      weight < 30 || weight > 250
    ) {
      return NextResponse.json(
        { error: "Invalid input values" },
        { status: 400 }
      );
    }

    // -----------------------------
    // BMI CALCULATION
    // -----------------------------
    const heightM = height / 100;
    const bmi = +(weight / (heightM * heightM)).toFixed(1);

    let bodyType =
      bmi < 18.5 ? "Underweight" :
      bmi < 25 ? "Fit" :
      bmi < 30 ? "Overweight" :
      "Obese";

    // -----------------------------
    // CALORIES & MACROS
    // -----------------------------
    let calories, protein, carbs, fats;
    if (goal === "Muscle Gain") {
      calories = "High (Surplus)";
      protein = `${Math.round(weight * 2)} g/day`;
      carbs = "50–55%";
      fats = "20–25%";
    } else if (goal === "Weight Loss") {
      calories = "Low (Deficit)";
      protein = `${Math.round(weight * 1.6)} g/day`;
      carbs = "35–40%";
      fats = "20%";
    } else {
      calories = "Balanced";
      protein = `${Math.round(weight * 1.4)} g/day`;
      carbs = "45–50%";
      fats = "25%";
    }

    // -----------------------------
    // SLEEP & WATER
    // -----------------------------
    let sleep, water;
    if (goal === "Muscle Gain") {
      sleep = "8–9 hours";
      water = "4–5 liters/day";
    } else if (goal === "Weight Loss") {
      sleep = "7–8 hours";
      water = "3–4 liters/day";
    } else {
      sleep = "7–8 hours";
      water = "3 liters/day";
    }

    // -----------------------------
    // WORKOUT SPLIT
    // -----------------------------
    const workoutPlan = {
      Beginner: { days: "3–4 days/week", plan: "Full Body (Strength + Cardio)" },
      Intermediate: { days: "5 days/week", plan: "Upper / Lower Split + Cardio" },
      Advanced: { days: "6 days/week", plan: "Push / Pull / Legs Split" },
    };

    // -----------------------------
    // PROGRESS PREDICTION
    // -----------------------------
    let progress;
    if (goal === "Weight Loss") progress = "0.5–1 kg fat loss/week";
    else if (goal === "Muscle Gain") progress = "0.3–0.6 kg muscle gain/week";
    else progress = "Improved stamina & body composition";

    // -----------------------------
    // DIET DATABASE
    // -----------------------------
    const dietDB = {
      Veg: {
        breakfast: ["Oats + Milk", "Poha + Peanuts", "Paneer Paratha"],
        lunch: ["Dal + Rice", "Rajma + Roti", "Paneer Sabzi"],
        dinner: ["Vegetable Khichdi", "Roti + Sabzi"],
        protein: ["Paneer", "Dal", "Curd", "Soy"],
      },
      "Non-Veg": {
        breakfast: ["Egg Omelette", "Boiled Eggs"],
        lunch: ["Chicken Curry + Rice", "Egg Curry + Roti"],
        dinner: ["Grilled Chicken", "Fish Curry"],
        protein: ["Eggs", "Chicken", "Fish"],
      },
      Vegan: {
        breakfast: ["Fruit Bowl + Seeds", "Peanut Butter Toast"],
        lunch: ["Chickpeas + Rice", "Veg Stir Fry"],
        dinner: ["Lentil Soup"],
        protein: ["Chickpeas", "Lentils", "Seeds"],
      },
      Keto: {
        breakfast: ["Boiled Eggs"],
        lunch: ["Chicken + Salad"],
        dinner: ["Paneer / Fish"],
        protein: ["Eggs", "Chicken", "Fish", "Paneer"],
      },
    };
    const selectedDiet = dietDB[diet];

    // -----------------------------
    // AI COACH NOTE
    // -----------------------------
    const coachNote = `
Your plan is based on your age, BMI, goal, and fitness level.
Focus on consistency, proper sleep & hydration, and progressive overload.
`;

    // -----------------------------
    // FINAL PLAN
    // -----------------------------
    const plan = `
🤖 AI FITNESS & NUTRITION PLAN

👤 Name: ${name}
📊 Age: ${age}
🧮 BMI: ${bmi} (${bodyType})
🎯 Goal: ${goal}
🏋️ Level: ${level}

--------------------------------
🔥 CALORIES & MACROS
• Calories: ${calories}
• Protein: ${protein}
• Carbs: ${carbs}
• Fats: ${fats}

--------------------------------
😴 RECOVERY & HYDRATION
• Sleep: ${sleep}
• Water: ${water}

--------------------------------
🏋️ WORKOUT STRUCTURE
• Frequency: ${workoutPlan[level].days}
• Split: ${workoutPlan[level].plan}

--------------------------------
📈 EXPECTED PROGRESS
• ${progress}

--------------------------------
🥗 DIET PLAN (${diet})
Breakfast: ${selectedDiet.breakfast.join(", ")}
Lunch: ${selectedDiet.lunch.join(", ")}
Dinner: ${selectedDiet.dinner.join(", ")}

--------------------------------
💪 PROTEIN SOURCES
${selectedDiet.protein.join(", ")}

--------------------------------
🧠 AI COACH INSIGHT
${coachNote}

✅ Indian Diet
✅ Science-Based
✅ Goal Optimized
`;

    return NextResponse.json({ plan });

  } catch (error) {
    console.error("AI ENGINE ERROR:", error);
    return NextResponse.json({ error: "AI engine failed" }, { status: 500 });
  }
}
