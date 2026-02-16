import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    })
  ],
    
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
})

// import NextAuth from "next-auth"
// import Google from 'next-auth/providers/google'
// import { supabaseAdmin } from '@/lib/supabase'

// export const authConfig = {
//   providers: [
//     Google({
//       clientId: process.env.AUTH_GOOGLE_ID,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET,
//     }),
//   ],
//   pages: {
//     signIn: '/',
//     error: '/',
//   },
//   callbacks: {
//     async signIn({ user, profile }) {
//       // Check if user exists in database
//       const { data: existingUser } = await supabaseAdmin
//         .from('users')
//         .select('id')
//         .eq('email', user.email)
//         .single()

//       // If user doesn't exist, create them
//       if (!existingUser) {
//         await supabaseAdmin.from('users').insert([
//           {
//             email: user.email,
//             name: user.name,
//           },
//         ])
//       }

//       return true
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.email = user.email
//         token.name = user.name
//       }
//       return token
//     },
//     async session({ session, token }) {
//       session.user.email = token.email
//       session.user.name = token.name

//       // Fetch health profile from database
//       const { data: healthProfile } = await supabaseAdmin
//         .from('health_profiles')
//         .select('*')
//         .eq('email', session.user.email)
//         .single()

//       session.user.hasHealthProfile = !!healthProfile
//       session.user.healthProfile = healthProfile

//       return session
//     },
//   },
// }

// export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)