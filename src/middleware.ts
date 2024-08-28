export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserData } from "@/utils/GetUser";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    const userData = await getUserData(token.email as string);
    if (!userData || userData.status !== "active") {
        return NextResponse.redirect(new URL(`/${userData?.status}`, req.url));
    }
    return NextResponse.next();
}

export const config = { matcher: ["/","/profile","/settings","/article","/add-article"] }

