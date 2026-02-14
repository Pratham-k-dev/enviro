"use client";

import { SessionProvider } from "next-auth/react";

export function sessionProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
