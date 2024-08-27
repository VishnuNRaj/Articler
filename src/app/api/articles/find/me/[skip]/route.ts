// File: app/api/articles/[skip]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import sql from '@/database/Postgres';

export async function GET(req: NextRequest, { params }: { params: { skip: string } }) {
    const searchQuery = req.nextUrl.searchParams.get('search') || '';
    const skip = parseInt(params.skip, 10); 
    const limit = 12; 

    const sanitizedQuery = `%${searchQuery}%`;

    try {
        const [result, countResult] = await Promise.all([
            sql.query(`
                SELECT 
                    a.id,
                    a.title,
                    a.content,
                    a.created_at,
                    a.updated_at,
                    a.published,
                    v.id AS author_id,
                    v.username AS author_username
                FROM 
                    articles a
                WHERE 
                    a.title ILIKE $1 OR a.content::text ILIKE $1
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
                    a.title ILIKE $1 OR a.content::text ILIKE $1;
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
