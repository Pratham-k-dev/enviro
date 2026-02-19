export const envService = {
  async getEnvironment(lat, lon) {
    try {
      const weatherPromise = fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,uv_index`
      ).then(r => r.json())

      const airPromise = fetch(
        `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${process.env.WAQI_TOKEN}`
      ).then(r => r.json())

      const [weather, air] = await Promise.allSettled([
        weatherPromise,
        airPromise
      ])

      const env = {
        temperature: null,
        humidity: null,
        wind: null,
        uv: null,
        aqi: null,
        pm25: null,
        status: "ok"
      }

      // weather
      if (weather.status === "fulfilled") {
        const w = weather.value?.current
        env.temperature = w?.temperature_2m ?? null
        env.humidity = w?.relative_humidity_2m ?? null
        env.wind = w?.wind_speed_10m ?? null
        env.uv = w?.uv_index ?? null
      }

      // air quality
      if (air.status === "fulfilled") {
        const a = air.value?.data
        env.aqi = a?.aqi ?? null
        env.pm25 = a?.iaqi?.pm25?.v ?? null
      }

      // mark degraded if missing important values
      if (env.aqi === null || env.temperature === null) {
        env.status = "partial"
      }

      return env

    } catch (err) {
      console.error("Env service error:", err)
      return {
        temperature: null,
        humidity: null,
        wind: null,
        uv: null,
        aqi: null,
        pm25: null,
        status: "error"
      }
    }
  }
}
