import { NextResponse } from "next/server";

// OpenAI API key .env.local me hona chahiye
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(req) {
  try {
    const body = await req.json();

    // Example: simple AI response without real OpenAI call (temporary)
    const plan = `
🤖 Your AI Fitness Plan

🏋️ Workout Plan for ${body.name}:
- Goal: ${body.goal}
- Level: ${body.level}
- Daily Routine: 30 min cardio + 30 min strength

🥗 Diet Plan:
- Preference: ${body.diet}
- Breakfast: Oats with fruits
- Lunch: Grilled chicken + veggies
- Dinner: Protein shake + salad

🔥 Tip: Consistency beats motivation!
`;

    return NextResponse.json({ plan });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
  }
}

