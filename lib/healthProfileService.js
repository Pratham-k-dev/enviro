import { supabase, supabaseAdmin } from '@/lib/supabase'

export const healthProfileService = {
  async saveProfile(userEmail, profileData) {
    // Get user ID
    let { data: user } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', userEmail)
      .single()

    if (!user) {
  const { data: newUser } = await supabaseAdmin
    .from('users')
    .insert([{ email: userEmail,name:profileData.firstName }])
    .select()
    .single()

  user = newUser
}


    // Check if profile exists
    const { data: existingProfile } = await supabaseAdmin
      .from('health_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single()

    const profilePayload = {
      user_id: user.id,
      first_name: profileData.firstName,
      age: profileData.age,
      location: profileData.location,
      asthma: profileData.asthma,
      heart_disease: profileData.heartDisease,
      hypertension: profileData.hypertension,
      diabetes: profileData.diabetes,
      smoker: profileData.smoker,
      obesity: profileData.obesity,
      allergy_type: profileData.allergyType,
      hayfever: profileData.hayfever,
      skin_sensitivity: profileData.skinSensitivity,
      outdoor_activity_level: profileData.outdoorActivityLevel,
      respiratory_level: Number(profileData.respiratoryLevel ?? 0),
      health_level: Number(profileData.healthLevel ?? 0),
    }

    if (existingProfile) {
      // Update
      return await supabaseAdmin
        .from('health_profiles')
        .update(profilePayload)
        .eq('id', existingProfile.id)
    } else {
      // Insert
      return await supabaseAdmin.from('health_profiles').insert([profilePayload])
    }
  },

  async getProfile(userEmail) {
    const { data: user } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', userEmail)
      .single()

    if (!user) return null

    const { data: profile } = await supabaseAdmin
      .from('health_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    return profile
  },
}