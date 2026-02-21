// lib/healthEngine.js

export function getAQIInsight(aqi) {
  if (!aqi) return "Data unavailable.";
  if (aqi <= 50) return "Air is crisp—like a fresh morning in the mountains. Deep breathing is encouraged.";
  if (aqi <= 100) return "Acceptable air, but sensitive lungs might feel a slight 'heaviness' today.";
  if (aqi <= 150) return "The air carries a load similar to standing near a busy highway. Limit long runs.";
  if (aqi <= 200) return "Atmospheric stress today is comparable to sitting in a room with a smoker.";
  return "Hazardous levels—breathing this air is like smoking half a pack of cigarettes today.";
}

export function getUVInsight(uv) {
  if (uv == null) return "Data unavailable.";
  if (uv < 3) return "Low risk. Great for a walk without worrying about the sun's bite.";
  if (uv < 6) return "The sun is active. 30 minutes of exposure is enough to start the tanning process.";
  if (uv < 8) return "High intensity. Your skin's protective barrier can be overwhelmed in 15 mins.";
  return "Extreme radiation. Skin damage begins almost instantly without high-grade SPF.";
}

export function calculateDashboardData(env, profile) {
    if(!env || !profile){
         return {
    score: 0,
    aiInsights:[],
    actionPlan:[],
    fact: ""
  };
    }
  let score = 95;
  const aiInsights = [];
  const actionPlan = [];

  // --- 1. Scoring & Active Alerts ---
  const aqi = env?.air.aqi || 0;
  if (aqi > 50) {
    let penalty = (aqi - 50) * 0.4;
    if (profile.asthma || profile.smoker) penalty *= 1.6;
    score -= penalty;
    if (aqi > 70) aiInsights.push({ type: "warning", title: "Air Load", text: "Particulates are elevated. Your lungs are working harder to filter oxygen." });
  } else {
    aiInsights.push({ type: "success", title: "Optimal Air", text: "Current air quality supports peak physical performance and recovery." });
  }

  const temp = env?.weather.temp || 0;
  if (temp > 32) {
    score -= (temp - 32) * 2;
    if (profile.hypertension || profile.heart_disease) {
      aiInsights.push({ type: "critical", title: "Thermal Strain", text: "Heat expands blood vessels, putting extra load on your cardiovascular system." });
    }
  }

  // --- 2. Action Plan (Always 4 items to keep UI full) ---
  if (aqi > 80) actionPlan.push("Wear a mask if commuting");
  else actionPlan.push("Open windows for ventilation");

  if (env?.uv.index > 5) actionPlan.push("Apply SPF 30+ immediately");
  else actionPlan.push("Enjoy natural Vitamin D exposure");

  if (profile.asthma) actionPlan.push("Keep emergency inhaler nearby");
  else actionPlan.push("Practice deep breathing today");

  if (temp > 30 || profile.diabetes) actionPlan.push("Increase water intake by 500ml");
  else actionPlan.push("Standard hydration is sufficient");

  // --- 3. Educational "Did You Know" (Randomized feel) ---
  const facts = [
    "Snake plants in your room can produce oxygen even at night, helping with respiratory recovery.",
    "Humidity over 70% makes it harder for your body to cool down because sweat can't evaporate.",
    "UV rays can penetrate clouds; even on grey days, skin sensitivity is a factor.",
    "High wind speeds can carry pollen from up to 50 miles away, affecting hayfever."
  ];

  return {
    score: Math.max(Math.min(Math.round(score), 100), 0),
    aiInsights,
    actionPlan,
    fact: facts[Math.floor(Math.random() * facts.length)]
  };
}

// Add this to your existing healthEngine.js
export const POLLUTANT_DEFINITIONS = {
  pm25: {
    name: "Fine Particles (PM2.5)",
    alias: "The Invisible Traveler",
    description: "Tiny soot and smoke particles that can enter your bloodstream.",
    hazard: "Commonly from vehicle exhaust and distant industrial fires.",
    impact: (profile) => profile.heart_disease ? "High risk of vascular inflammation." : "May cause mild fatigue and lung irritation."
  },
  pm10: {
    name: "Coarse Dust (PM10)",
    alias: "The Gritty Invader",
    description: "Larger dust particles that settle in your throat and eyes.",
    hazard: "High levels detected near mining, quarries, or construction sites.",
    impact: (profile) => "Expect scratchy eyes and potential sinus congestion."
  },
  so2: {
    name: "Sulfur Dioxide (SO2)",
    alias: "The Industrial Acid",
    description: "A sharp gas that irritates the skin and respiratory lining.",
    hazard: "Usually traced back to coal plants or metal smelting factories.",
    impact: (profile) => profile.asthma ? "CRITICAL: Likely to trigger immediate airway constriction." : "Can cause a 'burnt' sensation in the throat."
  }
};