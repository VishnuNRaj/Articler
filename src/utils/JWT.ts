"use server";

import { JWTVerifTToken } from "@/interfaces/auth";
import jwt from "jsonwebtoken";


const secret = process.env.NEXTAUTH_SECRET as string;

export async function JWTEncode(data: JWTVerifTToken): Promise<string> {
    if (!secret) {
        throw new Error('JWT secret is not defined');
    }
    const token = await jwt.sign(data, secret, { expiresIn: "5m" });
    return token;
}

export async function JWTDecode(token: string): Promise<JWTVerifTToken | null> {
    try {
        if (!secret) {
            throw new Error("JWT secret is not defined");
        }
        const decoded = await jwt.verify(token, secret) as JWTVerifTToken;
        return decoded;
    } catch (e: any) {
        console.error("Token verification failed:", e);
        return null;
    }
}