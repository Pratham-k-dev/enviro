// import NextAuth from "next-auth"
// import Google from "next-auth/providers/google"
 
// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers: [
//     Google({
//       clientId: process.env.AUTH_GOOGLE_ID,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET,
//     })
//   ],
    
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.AUTH_SECRET,
// })
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { supabaseAdmin } from "@/lib/supabase"

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  pages: {
    signIn: "/",
    error: "/",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {

    // 🔹 Runs when user signs in
    async signIn({ user }) {
      if (!user?.email) return false

      // Check if user exists
      const { data: existingUser, error: fetchError } =
        await supabaseAdmin
          .from("users")
          .select("id")
          .eq("email", user.email)
          .single()

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("User lookup failed:", fetchError)
        return false
      }

      // Insert if first login
      if (!existingUser) {
        const { error: insertError } = await supabaseAdmin
          .from("users")
          .insert([
            {
              email: user.email,
              name: user.name,
            },
          ])

        if (insertError) {
          console.error("User insert failed:", insertError)
          return false
        }
      }

      return true
    },

    // 🔹 Inject profile flag into session
    async session({ session }) {
      if (!session?.user?.email) return session

      // 1. Get user id
      const { data: dbUser } = await supabaseAdmin
        .from("users")
        .select("id")
        .eq("email", session.user.email)
        .single()

      if (!dbUser) {
        session.user.hasHealthProfile = false
        return session
      }

      // 2. Check health profile via FK
      const { data: profile } = await supabaseAdmin
        .from("health_profiles")
        .select("id")
        .eq("user_id", dbUser.id)
        .single()

      session.user.hasHealthProfile = !!profile

      return session
    },
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
