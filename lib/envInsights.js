export function getAQIInsight(aqi) {
  if (!aqi) return "Air quality data unavailable.";
  if (aqi <= 50) return "Air is crisp and clean—like a fresh morning in the mountains.";
  if (aqi <= 100) return "Acceptable air, but sensitive lungs might feel a slight 'heaviness' today.";
  if (aqi <= 150) return "The air today carries a load similar to standing near a busy highway.";
  if (aqi <= 200) return "Atmospheric stress today is comparable to sitting in a room with a smoker.";
  return "Hazardous levels—breathing this air is like smoking half a pack of cigarettes today.";
}

export function getUVInsight(uv) {
  if (uv == null) return "UV data unavailable.";
  if (uv < 3) return "Low risk. Great for a walk without worrying about the sun's bite.";
  if (uv < 6) return "The sun is active. 30 minutes of exposure is enough to start the tanning process.";
  if (uv < 8) return "High intensity. Your skin's protective barrier can be overwhelmed in 15-20 mins.";
  return "Extreme radiation. Skin damage begins almost instantly without high-grade SPF.";
}

export function getTempInsight(temp) {
  if (temp < 10) return "Cold air is 'thicker' and requires more energy for your lungs to warm up.";
  if (temp < 30) return "A 'Goldilocks' zone—not too hot, not too cold. Ideal for movement.";
  if (temp < 37) return "The body is working harder to cool down. Water is your best fuel right now.";
  return "Thermal stress zone. Your heart is pumping faster just to maintain your core temperature.";
}

export function getHumidityInsight(humidity) {
  if (humidity > 75) return "Thick air makes sweat evaporation difficult, increasing 'felt' heat.";
  if (humidity < 25) return "Dry air can dehydrate your mucous membranes and irritate your throat.";
  return "Humidity is balanced, aiding comfortable respiration.";
}