import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import login from "@/app/next-auth/login";
import { NextAuthOptions } from "next-auth";
import { string } from "yup";

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            image?: string;
        }
    }

    interface User {
        id?: string;
        email: string;
        name: string;
        profile?: string;
    }

    interface JWT {
        id?: string;
        email?: string;
        name?: string;
        profile?: string;
    }
}


const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: login,
        }),
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.profile = user.profile;
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
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.NEXTAUTH_SECRET,
};

const nextAuth = NextAuth(authOptions);

export { nextAuth as GET, nextAuth as POST };

