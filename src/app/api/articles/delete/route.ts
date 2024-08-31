// File: api/articles/delete/route.ts
import { NextRequest, NextResponse } from 'next/server';
import sql from '@/database/Postgres';
import { getServerSession } from 'next-auth';
import { QueryResult } from 'pg';

export async function DELETE(req: NextRequest) {
    try {
        const link = req.nextUrl.searchParams.get('link') || '';
        if (!link) {
            return NextResponse.json({ error: 'Article ID required',status:400 }, { status: 400 });
        }

        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized',status:401 }, { status: 401 });
        }

        const userEmail = session.user.email;

        const userResult: QueryResult = await sql`
            SELECT id FROM verified_users WHERE email = ${userEmail}
        `;

        if (userResult.rows.length === 0) {
            return NextResponse.json({ error: 'User not found',status:404 }, { status: 404 });
        }

        const userId = userResult.rows[0].id;

        const result: QueryResult = await sql`
            DELETE FROM articles
            WHERE link = ${link} AND author_id = ${userId}
        `;
        if (result.rowCount === 0) {
            return NextResponse.json({ error: 'Article not found',status:404 }, { status: 404 });
        }

        return NextResponse.json({ message: 'Article deleted successfully',status:200 }, { status: 200 });
    } catch (error) {
        console.error('Error handling article:', error);
        return NextResponse.json({ error: 'Failed to handle article',status:500 }, { status: 500 });
    }
}
