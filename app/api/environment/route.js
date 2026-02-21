// export async function GET(req) {
//   try {
//     const lat = req.nextUrl.searchParams.get("lat")
//     const lon = req.nextUrl.searchParams.get("lon")
//     const city = req.nextUrl.searchParams.get("city")

//     let finalLat = lat
//     let finalLon = lon

//     // 1️⃣ If lat/lon not provided → geocode city
//     if ((!finalLat || !finalLon) && city) {
//       const geoRes = await fetch(
//         `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.OPENWEATHER_KEY}`
//       )

//       const geo = await geoRes.json()

//       if (!geo.length) {
//         return Response.json({ error: "City not found" }, { status: 404 })
//       }

//       finalLat = geo[0].lat
//       finalLon = geo[0].lon
//     }

//     if (!finalLat || !finalLon) {
//       return Response.json({ error: "Missing coordinates" }, { status: 400 })
//     }

//     // 2️⃣ Fetch weather data
//     const weatherRes = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?lat=${finalLat}&lon=${finalLon}&units=metric&appid=${process.env.OPENWEATHER_KEY}`
//     )

//     const weather = await weatherRes.json()

//     return Response.json(weather)
//   } catch (err) {
//     return Response.json({ error: "Server error" }, { status: 500 })
//   }
// }


// export async function GET(req) {
//   try {
//     const lat = req.nextUrl.searchParams.get("lat")
//     const lon = req.nextUrl.searchParams.get("lon")
//     const city = req.nextUrl.searchParams.get("city")

//     let finalLat = lat
//     let finalLon = lon

//     // 1️⃣ If coordinates missing → geocode city
//     if ((!finalLat || !finalLon) && city) {
//       const geoRes = await fetch(
//         `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.OPENWEATHER_KEY}`
//       )

//       const geo = await geoRes.json()

//       if (!geo.length) {
//         return Response.json({ error: "City not found" }, { status: 404 })
//       }

//       finalLat = geo[0].lat
//       finalLon = geo[0].lon
//     }

//     if (!finalLat || !finalLon) {
//       return Response.json({ error: "Missing coordinates" }, { status: 400 })
//     }

//     // 2️⃣ Fetch weather
//     const weatherPromise = fetch(
//       `https://api.openweathermap.org/data/2.5/weather?lat=${finalLat}&lon=${finalLon}&units=metric&appid=${process.env.OPENWEATHER_KEY}`
//     ).then(r => r.json())

//     // 3️⃣ Fetch AQI
//     const airPromise = fetch(
//       `https://api.waqi.info/feed/geo:${finalLat};${finalLon}/?token=${process.env.WAQI_TOKEN}`
//     ).then(r => r.json())

//     const [weather, air] = await Promise.all([weatherPromise, airPromise])

//     // 4️⃣ Normalize output for frontend
//     const env = {
//       location: weather?.name || city || null,
//       temperature: weather?.main?.temp ?? null,
//       humidity: weather?.main?.humidity ?? null,
//       wind: weather?.wind?.speed ?? null,
//       condition: weather?.weather?.[0]?.main ?? null,
//       aqi: air?.data?.aqi ?? null,
//       pm25: air?.data?.iaqi?.pm25?.v ?? null,
//       lat: finalLat,
//       lon: finalLon
//     }

//     return Response.json(env)

//   } catch (err) {
//     console.error(err)
//     return Response.json({ error: "Server error" }, { status: 500 })
//   }
// }

//.....................................................
import { auth } from "@/lib/auth"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET(req) {
  try {
    // 1️⃣ Get logged-in user
    const session = await auth()

    if (!session?.user?.email) {
      return Response.json({ error: "Not authenticated" }, { status: 401 })
    }

    // 2️⃣ Get user's saved location from DB
    const { data: user } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("email", session.user.email)
      .single()

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 })
    }

    const { data: profile } = await supabaseAdmin
      .from("health_profiles")
      .select("location")
      .eq("user_id", user.id)
      .single()

    if (!profile?.location) {
      return Response.json({ error: "No saved location" }, { status: 400 })
    }

    // 3️⃣ Convert city → lat/lon
    const geoRes = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${profile.location}&limit=1&appid=${process.env.OPENWEATHER_KEY}`
    )
    const geo = await geoRes.json()

    if (!geo.length) {
      return Response.json({ error: "City not found" }, { status: 404 })
    }

    const finalLat = geo[0].lat
    const finalLon = geo[0].lon

    // 4️⃣ Fetch WEATHER
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${finalLat}&lon=${finalLon}&units=metric&appid=${process.env.OPENWEATHER_KEY}`
    )
    const weather = await weatherRes.json()
    
    // 5️⃣ Fetch AQI
    const aqiRes = await fetch(
      `https://api.waqi.info/feed/geo:${finalLat};${finalLon}/?token=${process.env.WAQI_TOKEN}`
    )
    const aqi = await aqiRes.json()
    console.log(aqi)

    // 6️⃣ Fetch UV
    const uvRes = await fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${finalLat}&longitude=${finalLon}&current=uv_index`
)
    const uv = await uvRes.json()
    console.log(uv)
    // 7️⃣ Final unified response
    const combined = {
      location: weather.name,
      coordinates: { lat: finalLat, lon: finalLon },

      weather: {
        temp: weather?.main?.temp ?? 0,
        humidity: weather?.main?.humidity ?? 0,
        wind: weather?.wind?.speed ?? 0,
        condition: weather?.weather?.[0]?.main ?? 0,
      },

      air: {
        
        aqi: aqi?.data?.aqi ?? 0,
        pm25: aqi?.data?.iaqi?.pm25?.v ?? 0,
        pm10: aqi?.data?.iaqi?.pm10?.v ?? 0,
        so2: aqi?.data?.iaqi?.so2?.v ?? 0, 
        no2: aqi?.data?.iaqi?.no2?.v ?? 0,   
        co: aqi?.data?.iaqi?.co?.v ?? 0
      },

      uv: {
        index: uv?.current?.uv_index ?? 0,
      },
    }

    return Response.json(combined)

  } catch (err) {
    console.error(err)
    return Response.json({ error: "Server error" }, { status: 500 })
  }
}

