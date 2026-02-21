import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { healthProfileService } from "@/lib/healthProfileService"
import { supabaseAdmin } from "@/lib/supabase"
export async function POST(req) {
  const session = await auth()
console.log(session)
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const profile = await req.json()

  try {
    await healthProfileService.saveProfile(session.user.email, profile)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to save profile" }, { status: 500 })
  }
}

export async function GET(req) {
  const email = req.headers.get('x-user-email')

  if (!email) {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 })
  }

  // get user id
  const { data: user } = await supabaseAdmin
    .from('users')
    .select('id')
    .eq('email', email)
    .single()

  if (!user) {
    return NextResponse.json({ profile: null })
  }

  // get profile
  const { data: profile } = await supabaseAdmin
    .from('health_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return NextResponse.json({ profile })
}


// export async function GET(req) {
//   try {
//     // 1️⃣ Get session automatically (no need for manual headers)
//     const session = await auth();
    
//     if (!session?.user?.email) {
//       return Response.json({ error: "Not authenticated" }, { status: 401 });
//     }

//     // 2️⃣ Get user ID
//     const { data: user, error: userErr } = await supabaseAdmin
//       .from("users")
//       .select("id")
//       .eq("email", session.user.email)
//       .single();

//     if (userErr || !user) {
//       return Response.json({ profile: null, error: "User not found" }, { status: 404 });
//     }

//     // 3️⃣ Get profile
//     const { data: profile, error: profileErr } = await supabaseAdmin
//       .from("health_profiles")
//       .select("*")
//       .eq("user_id", user.id)
//       .single();

//     // If no profile exists yet, return an empty object instead of failing
//     if (profileErr) {
//       return Response.json({ profile: null, message: "No profile found" }, { status: 200 });
//     }

//     return Response.json({ profile }, { status: 200 });
//   } catch (err) {
//     console.error("API Error:", err);
//     return Response.json({ error: "Server error" }, { status: 500 });
//   }
// }