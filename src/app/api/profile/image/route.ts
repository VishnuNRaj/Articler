"use server";

// src/app/api/profile/image/route.ts
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import sql from "@/database/Postgres";

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { url } = await req.json();
        const email = session.user.email;
        await sql`UPDATE verified_users SET profile = ${url} WHERE email = ${email}`
        session.user.image = url;
        return NextResponse.json({ message: "Profile image updated successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update profile image" }, { status: 500 });
    }
}

