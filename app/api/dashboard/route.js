// import { auth } from "@/lib/auth"

// export async function GET(req) {
//   try {
//     const session = await auth()

//     if (!session?.user?.email) {
//       return Response.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     const email = session.user.email

//     // 1️⃣ get health profile from your own API
//     const profileRes = await fetch(
//       `${process.env.NEXT_PUBLIC_APP_URL}/api/health_profile`,
//       { headers: { "x-user-email": email } }
//     )

//     const profileData = await profileRes.json()

//     if (!profileData.profile) {
//       return Response.json({ needsProfile: true })
//     }

//     const profile = profileData.profile

//     // 2️⃣ get location params from frontend
//     const lat = req.nextUrl.searchParams.get("lat")
//     const lon = req.nextUrl.searchParams.get("lon")
//     const city = req.nextUrl.searchParams.get("city")

//     // 3️⃣ call your existing environment route
//     const envUrl = new URL("/api/environment", req.url)
//     const envRes = await fetch(
//       envUrl, {
//   headers: {
//     cookie: req.headers.get("cookie") || "",
//   },
//   cache: "no-store",
// }
//     )

//     const env = await envRes.json()

//     if (!env || env.error) {
//         if(!env) console.log("env not found")
//             else console.log(env.error)
//       return Response.json({ error: "Env fetch failed" }, { status: 500 })
//     }

//     // 4️⃣ compute score
//     let score = 85

//     if (env.air.aqi > 150) score -= 30
//     if (env.uv.index > 7) score -= 15
//     if (env.weather.temp > 38) score -= 10

//     if (profile.asthma && env.air.aqi > 80) score -= 20
//     if (profile.smoker && env.air.aqi > 60) score -= 10

//     score = Math.max(score, 0)

//     // 5️⃣ suggestions
//     const tips = []

//     if (env.air.aqi > 120) tips.push("Avoid outdoor exercise")
//     if (env.uv.index > 7) tips.push("Use sunscreen and avoid direct sun")
//     if (env.weather.temp > 38) tips.push("Stay hydrated")

//     if (profile.asthma && env.air.aqi > 80)
//       tips.push("Carry inhaler before stepping out")

//     // 6️⃣ return dashboard object
//     return Response.json({
//       env,
//       profile,
//       score,
//       tips
//     })

//   } catch (err) {
//     console.error(err)
//     return Response.json({ error: "Dashboard failed" }, { status: 500 })
//   }
// }


    // import { auth } from "@/lib/auth";
    // import { calculateDashboardData } from "@/lib/healthEngine";

// export async function GET(req) {
//   try {
//     const session = await auth();
//     if (!session?.user?.email) return Response.json({ error: "Unauthorized" }, { status: 401 });

//     const email = session.user.email;

//     // 1. Fetch Profile (Ensure keys match your SQL: asthma, heart_disease, etc.)
//     const profileRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/health_profile`, {
//       headers: { "x-user-email": email }
//     });
//     const profileData = await profileRes.json();
//     const profile = profileData.profile;

//     if (!profile) return Response.json({ needsProfile: true });

//     // 2. Fetch Environment
//     const envRes = await fetch(new URL("/api/environment", req.url), {
//       headers: { cookie: req.headers.get("cookie") || "" },
//       cache: "no-store"
//     });
//     const env = await envRes.json();

//     // 3. Run the Logic Engine
//     const { score, aiInsights } = calculateDashboardData(env, profile);

//     // 4. Action Plan (Old + New Logic)
//     const actionPlan = [
//       env.air?.aqi > 100 && "Limit outdoor exposure",
//       env.uv?.index > 6 && "Wear protective clothing",
//       profile.asthma && env.air?.aqi > 70 && "Carry rescue inhaler",
//       (profile.hypertension || profile.heart_disease) && env.weather.temp > 32 && "Stay in air-conditioned spaces",
//     ].filter(Boolean);

//     return Response.json({
//       env,
//       profile,
//       score: score,
//       aiInsights,
//       tips: actionPlan
//     });

//   } catch (err) {
//     console.error(err);
//     return Response.json({ error: "Dashboard Fetch Failed" }, { status: 500 });
//   }
// }

import { auth } from "@/lib/auth"

export async function GET(req) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const email = session.user.email

    // 1️⃣ get health profile from your own API
    const profileRes = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/health_profile`,{ headers: { 'x-user-email': email || '' }}
    )

    const profileData = await profileRes.json()
    // console.log(profileData)

    if (!profileData.profile) {
      return Response.json({ needsProfile: true })
    }

    const profile = profileData.profile

    // 2️⃣ get location params from frontend
    const lat = req.nextUrl.searchParams.get("lat")
    const lon = req.nextUrl.searchParams.get("lon")
    const city = req.nextUrl.searchParams.get("city")

    // 3️⃣ call your existing environment route
    const envUrl = new URL("/api/environment", req.url)
    const envRes = await fetch(
      envUrl, {
  headers: {
    cookie: req.headers.get("cookie") || "",
  },
  cache: "no-store",
}
    )

    const env = await envRes.json()

    if (!env || env.error) {
        if(!env) console.log("env not found")
            else console.log(env.error)
      return Response.json({ error: "Env fetch failed" }, { status: 500 })
    }

    // 4️⃣ compute score
    let score = 85

    if (env.air.aqi > 150) score -= 30
    if (env.uv.index > 7) score -= 15
    if (env.weather.temp > 38) score -= 10

    if (profile.asthma && env.air.aqi > 80) score -= 20
    if (profile.smoker && env.air.aqi > 60) score -= 10

    score = Math.max(score, 0)

    // 5️⃣ suggestions
    const tips = []

    if (env?.air.aqi > 120) tips.push("Avoid outdoor exercise")
    if (env?.uv.index > 7) tips.push("Use sunscreen and avoid direct sun")
    if (env.weather.temp > 38) tips.push("Stay hydrated")

    if (profile?.asthma && env.air.aqi > 80)
      tips.push("Carry inhaler before stepping out")

    // 6️⃣ return dashboard object
    return Response.json({
      env,
      profile,
      score,
      tips
    })

  } catch (err) {
    console.error(err)
    return Response.json({ error: "Dashboard failed" }, { status: 500 })
  }
}


// import { auth } from "@/lib/auth";
// import { calculateDashboardData } from "@/lib/healthEngine";

// export async function GET(req) {
//   try {
//     const session = await auth();
//     if (!session?.user?.email) return Response.json({ error: "Unauthorized" }, { status: 401 });

//     const email = session.user.email;

//     // 1. Fetch Profile (Ensure keys match your SQL: asthma, heart_disease, etc.)
//     const profileRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/health_profile`, {
//       headers: { "x-user-email": email }
//     });
//     const profileData = await profileRes.json();
//     const profile = profileData.profile;

//     if (!profile) return Response.json({ needsProfile: true });

//     // 2. Fetch Environment
//     const envRes = await fetch(new URL("/api/environment", req.url), {
//       headers: { cookie: req.headers.get("cookie") || "" },
//       cache: "no-store"
//     });
//     const env = await envRes.json();

//     // 3. Run the Logic Engine
//     const { score, aiInsights } = calculateDashboardData(env, profile);

//     // 4. Action Plan (Old + New Logic)
//     const actionPlan = [
//       env.air?.aqi > 100 && "Limit outdoor exposure",
//       env.uv?.index > 6 && "Wear protective clothing",
//       profile.asthma && env.air?.aqi > 70 && "Carry rescue inhaler",
//       (profile.hypertension || profile.heart_disease) && env.weather.temp > 32 && "Stay in air-conditioned spaces",
//     ].filter(Boolean);
// console.log(env);
//     return Response.json({
//       env,
//       profile,
//       score: score,
//       aiInsights,
//       tips: actionPlan
//     });

//   } catch (err) {
//     console.error(err);
//     return Response.json({ error: "Dashboard Fetch Failed" }, { status: 500 });
//   }
// }