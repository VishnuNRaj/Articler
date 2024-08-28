import { NextRequest, NextResponse } from 'next/server';
import sql from '@/database/Postgres';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { QueryResult } from 'pg';
import Users from '@/interfaces/articles';

export async function GET(req: NextRequest, { params }: { params: { skip: string } }) {
    const searchQuery = req.nextUrl.searchParams.get('search') || '';
    const skip = parseInt(params.skip, 10);
    const limit = 12;

    const sanitizedQuery = `%${searchQuery}%`;

    try {
        const [result, countResult] = await Promise.all([
            sql.query(`
                SELECT 
                    *
                FROM 
                    articles a
                JOIN 
                    verified_users u ON a.author_id = u.id
                WHERE 
                    (a.title ILIKE $1 OR a.content::text ILIKE $1) AND a.published = true
                ORDER BY 
                    a.created_at DESC
                LIMIT $2 OFFSET $3;
            `, [sanitizedQuery, limit, skip]),

            sql.query(`
                SELECT 
                    COUNT(*) AS total
                FROM 
                    articles a
                WHERE 
                    (a.title ILIKE $1 OR a.content::text ILIKE $1) AND a.published = true;
            `, [sanitizedQuery])
        ]);

        const total = countResult.rows[0].total;
        const articles = result.rows;

        return NextResponse.json({ total, articles });
    } catch (error) {
        console.error('Error fetching articles:', error);
        return NextResponse.json({ error: 'An error occurred while fetching articles' }, { status: 500 });
    }
}
