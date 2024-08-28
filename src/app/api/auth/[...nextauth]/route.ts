// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import authOptions from "@/config/authOptions";


const nextAuth = NextAuth(authOptions);

export { nextAuth as GET, nextAuth as POST };
