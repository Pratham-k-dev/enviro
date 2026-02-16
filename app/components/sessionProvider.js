"use client";

import { SessionProvider } from "next-auth/react";

export function Sessionprovider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
