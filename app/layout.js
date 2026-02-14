// 'use client'
import "./globals.css";
import { AuthProvider } from './components/AuthProvider'

import { sessionProvider } from "./components/sessionProvider";


export const metadata = {
  title: 'Environmental Health Dashboard',
  description: 'Personalized environmental health recommendations',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
       
      >


        <sessionProvider>
        <AuthProvider>

        {children}
        </AuthProvider> 
        </sessionProvider>
      </body>
    </html>
  );
}
