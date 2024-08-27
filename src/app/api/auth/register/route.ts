"use server";

import sql from "@/database/Postgres";
import { ErrorManager } from "@/utils/ErrorManager";
import { BadRequestError } from "@/interfaces/Error";
import generateEmailTemplate, { generateRandomString } from "@/utils/CommonFunctions";
import UnverifiedUsers from "@/interfaces/auth";
import { QueryResult } from "@vercel/postgres";
import sendEmail from "@/utils/Mailer";
import { NextResponse } from "next/server";
import Path from "@/config/path";
import { hash } from "bcryptjs";



export async function POST(req: Request) {
    try {

        const { name, email, password, auth_type } = await req.json();
        if (!email || !password) {
            throw new BadRequestError('Email and password are required');
        }

        const verificationLink = generateRandomString(12);
        const timeout = new Date(Date.now() + 5 * 60 * 1000).toLocaleString();
        const htmlContent = await generateEmailTemplate(verificationLink, email);

        const result: QueryResult<UnverifiedUsers> = await sql`SELECT * FROM users WHERE email = ${email}`;
        console.log(result);

        if (result.rows.length > 0) {
            if (!result.rows[0].verified) {
                await sql`
                    UPDATE users
                    SET verification_link = ${verificationLink}, timeout = ${timeout}
                    WHERE email = ${email}
                `;

                await sendEmail({
                    to: email,
                    subject: 'Email Verification',
                    html: htmlContent,
                });

                return NextResponse.json({
                    message: "Not Yet Verified. A new verification link has been sent to your email \n Please verify your account through the link provided via email.",
                    status: 201
                });
            }
            throw new BadRequestError('User with this email already exists');
        }

        await sendEmail({
            to: email,
            subject: 'Email Verification',
            html: htmlContent,
        });
        const hashed = await hash(password, 10)
        const newUser = await sql`
            INSERT INTO users (name, email, password, auth_type, verification_link, timeout)
            VALUES (${name}, ${email}, ${hashed}, ${auth_type}, ${verificationLink}, ${timeout})
            RETURNING *;
        `;

        return NextResponse.json({
            message: "A verification link has been sent via email \n Please verify your account within 5 minutes.",
            status: 200
        });

    } catch (error: any) {
        const { status, message } = ErrorManager.handleError(error);
        return NextResponse.json({ message, status });
    }
};

export async function GET(req: Request) {
    return NextResponse.redirect(`${Path.BASE_URL}/register`)
}