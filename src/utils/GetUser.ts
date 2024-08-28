// src/utils/getUserData.ts

import sql from "@/database/Postgres"; // Assume you have a utility to interact with the database
import UnverifiedUsers from "@/interfaces/auth";
import { QueryResult } from "pg";

interface UserStatus {
    id: string;
    email: string;
    name: string;
    profile?: string;
    status: "active" | "suspended" | "terminated";
}

export async function getUserData(email: string): Promise<UserStatus | null> {
    const userStatusResult: QueryResult<UnverifiedUsers> = await sql`SELECT * FROM users WHERE email = ${email}`

    if (userStatusResult.rows.length === 0) {
        return null;
    }

    const { suspended, terminated } = userStatusResult.rows[0];

    if (terminated || suspended) {
        return { id: "", email, name: "", status: terminated ? "terminated" : "suspended" };
    }

    const userDetailsResult = await sql
        `SELECT name, profile,email,id FROM verified_users WHERE email = ${email}`

    if (userDetailsResult.rows.length === 0) {
        return null;
    }

    const { name, profile, id } = userDetailsResult.rows[0];
    return { id, email, name, profile, status: "active" };
}
