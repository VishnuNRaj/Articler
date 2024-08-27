// types/next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id?: string;
    profile?: string;
  }

  interface Session {
    user: {
      id?: string;
      email?: string;
      name?: string;
      profile?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id?: string;
    email?: string;
    name?: string;
    profile?: string;
  }
}
