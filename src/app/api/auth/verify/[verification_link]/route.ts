"use server";

import { JWTDecode } from "@/utils/JWT";
import { NextRequest, NextResponse } from "next/server";
import sql from "@/database/Postgres";
import { QueryResult } from "@vercel/postgres";
import UnverifiedUsers from "@/interfaces/auth";

export async function GET(req: NextRequest) {
    try {
        const {pathname} = new URL(req.url);
        const link = pathname.split("/")[pathname.split("/").length-1]
        console.log("__dsds-----",link)
        if (!link) {
            return NextResponse.json({ error: 'Verification link is required' }, { status: 400 });
        }

        const decodedToken: any = await JWTDecode(link);

        if (!decodedToken) {
            return NextResponse.json({ error: 'Invalid verification link' }, { status: 400 });
        }

        const { email, verificationLink } = decodedToken;
        console.log(email,verificationLink,":::::")
        const result: QueryResult<UnverifiedUsers> = await sql`
            SELECT * FROM users WHERE email = ${email} AND verification_link = ${verificationLink};
        `;
        console.log(result.rows,"Verified")
        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'User not found or already verified' }, { status: 404 });
        }

        const user = result.rows[0];

        const timeoutDate = new Date(user.timeout);
        const currentDate = new Date();
        console.log(timeoutDate.toLocaleTimeString(),currentDate.toLocaleTimeString())
        if (timeoutDate < currentDate) {
            return NextResponse.json({ error: 'Verification link has expired' }, { status: 400 });
        }

        await sql`
            UPDATE users
            SET verified = true, verification_link = null, timeout = null
            WHERE email = ${email} AND verification_link = ${verificationLink};
        `;

        await sql`
            INSERT INTO verified_users (name, email)
            VALUES (${user.name}, ${user.email});
        `;

        return NextResponse.json({ message: 'Account verified successfully' },{status:200});

    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}
