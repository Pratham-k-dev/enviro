// 'use client'
import "./globals.css";
import { AuthProvider } from './components/AuthProvider'

import { Sessionprovider } from "./components/sessionProvider";


export const metadata = {
  title: 'Environmental Health Dashboard',
  description: 'Personalized environmental health recommendations',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
       
      >


        <Sessionprovider>
        <AuthProvider>

        {children}
        </AuthProvider> 
        </Sessionprovider>
      </body>
    </html>
  );
}
