import { authOptions } from "@/lib/auth"
import NextAuth from "next-auth"
// [...nextauth is a catch all route] any amount of / it'll catch all in this file
const handler = NextAuth(authOptions) // not writing options as it should be used at other places as well

export { handler as GET, handler as POST } 