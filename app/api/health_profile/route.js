import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { healthProfileService } from "@/lib/healthProfileService"
import { supabaseAdmin } from "@/lib/supabase"
export async function POST(req) {
  const session = await auth()

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

// export async function GET(req) {
//   const email = req.headers.get('x-user-email')

//   if (!email) {
//     return NextResponse.json({ error: 'Missing email' }, { status: 400 })
//   }

//   // get user id
//   const { data: user } = await supabaseAdmin
//     .from('users')
//     .select('id')
//     .eq('email', email)
//     .single()

//   if (!user) {
//     return NextResponse.json({ profile: null })
//   }

//   // get profile
//   const { data: profile } = await supabaseAdmin
//     .from('health_profiles')
//     .select('*')
//     .eq('user_id', user.id)
//     .single()

//   return NextResponse.json({ profile })
// }
export async function GET(req) {
  try {
    const email = req.headers.get('x-user-email')
    if (!email) return new Response(JSON.stringify({ error: 'Missing email' }), { status: 400 })

    const { data: user, error: userErr } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (userErr || !user) {
      return new Response(JSON.stringify({ profile: null, error: userErr?.message }), { status: 200 })
    }

    const { data: profile, error: profileErr } = await supabaseAdmin
      .from('health_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (profileErr) {
      return new Response(JSON.stringify({ profile: null, error: profileErr.message }), { status: 200 })
    }
    console.log(profile)

    return new Response(JSON.stringify({ profile }), { status: 200 })
  } catch (err) {
    console.error('API Error:', err)
    return new Response(JSON.stringify({ profile: null, error: err.message }), { status: 500 })
  }
}
