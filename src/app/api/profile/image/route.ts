"use server";

import { NextResponse } from "next/server";

export async function POST(_req: Request) {
    try {
        // const { image } = await req.json()
        return NextResponse.json({message:"Complete"})
    } catch (e) {
        return NextResponse.json({message:"Complete"})
    }
}