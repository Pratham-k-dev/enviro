export function generateSuggestions(env, profile) {
  const tips = []

  if (env.aqi >= 4) {
    tips.push("Avoid outdoor activities today")
  }

  if (env.pm25 > 30 && profile?.asthma) {
    tips.push("Wear a mask outside")
  }

  if (env.uv > 7) {
    tips.push("Use sunscreen and limit sun exposure")
  }

  if (env.temp > 35) {
    tips.push("Stay hydrated and avoid peak afternoon heat")
  }

  if (tips.length === 0) {
    tips.push("Conditions are safe today")
  }

  return tips
}
