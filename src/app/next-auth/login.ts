"use server";

import { RequestInternal, User } from "next-auth";
import sql from "@/database/Postgres";
import { compare } from "bcryptjs";
import { QueryResult } from "pg";
import UnverifiedUsers from "@/interfaces/auth";

export default async function login(credentials: Record<"email" | "password", string> | undefined, req: Pick<RequestInternal, "body" | "headers" | "method" | "query">): Promise<null | User> {
    if (!credentials) {
        throw new Error("Credentials are required");
    }
    
    const { email, password } = credentials;

    try {
        const result: QueryResult<UnverifiedUsers> = await sql`SELECT * FROM users WHERE email = ${email}`;

        if (result.rows.length === 0) {
            return null;
        }

        const user = result.rows[0];
        const isValidPassword = await compare(password, user.password);

        if (!isValidPassword) {
            return null;
        }
        const userData: QueryResult<User> = await sql`SELECT * FROM verified_users WHERE email = ${email}`;
        return userData.rows[0]
    } catch (error) {
        console.error("Error during login:", error);
        return null;
    }
}
