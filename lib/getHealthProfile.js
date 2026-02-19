import { supabaseAdmin } from '@/lib/supabase'

export async function getProfile(email) {
  const { data: user } = await supabaseAdmin
    .from('users')
    .select('id')
    .eq('email', email)
    .single()

  if (!user) return null

  const { data: profile } = await supabaseAdmin
    .from('health_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return profile
}
