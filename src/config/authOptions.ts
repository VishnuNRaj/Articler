import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import login from "@/app/next-auth/login";
import { getUserData } from "@/utils/GetUser";
import { NextAuthOptions } from "next-auth";


const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: login,
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token }):Promise<any> {
            if (token.email) {
                const userData = await getUserData(token.email as string);

                if (!userData || userData?.status !== "active") {
                    return null;
                }

                token.id = userData.id;
                token.email = userData.email;
                token.name = userData.name;
                token.profile = userData.profile;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id as string,
                    email: token.email as string,
                    name: token.name as string,
                    image: token.profile as string || "",
                };
            }
            return session;
        },
    },
    debug: process.env.NODE_ENV === "development",
    secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions