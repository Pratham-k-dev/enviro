// app/api/auth/[...nextauth]/route.js
import { handlers } from "@/lib/auth"

const { GET: _GET, POST: _POST } = handlers

export const GET = _GET
export const POST = _POST