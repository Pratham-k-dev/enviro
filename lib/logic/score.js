export function computeScore(env, profile) {
  let score = 100

  if (env.aqi >= 4) score -= 25
  if (env.pm25 > 35) score -= 20
  if (env.uv > 7) score -= 10
  if (env.temp > 38) score -= 10

  // health-sensitive penalties
  if (profile?.asthma && env.pm25 > 25) score -= 15
  if (profile?.heart_disease && env.aqi >= 3) score -= 15

  return Math.max(score, 0)
}
