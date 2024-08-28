import { NextRequest, NextResponse } from 'next/server';
import sql from '@/database/Postgres';
import { getServerSession } from 'next-auth';
import authOptions from '@/config/authOptions';
import { QueryResult } from 'pg';
import Users from '@/interfaces/articles';

export async function GET(req: NextRequest, { params }: { params: { skip: string } }) {
    const searchQuery = req.nextUrl.searchParams.get('search') || '';
    const skip = parseInt(params.skip, 10);
    const limit = 12;

    const sanitizedQuery = `%${searchQuery}%`;

    try {
        // Get the user session
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userEmail = session.user.email;
        const userResult: QueryResult<Users> = await sql.query(`
            SELECT id FROM verified_users WHERE email = $1;
        `, [userEmail]);

        if (userResult.rows.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const userId = userResult.rows[0].id;

        const [result, countResult] = await Promise.all([
            sql.query(`
                SELECT 
                    *
                FROM 
                    articles
                WHERE 
                    (title ILIKE $1 OR content::text ILIKE $1) AND author_id = $2
                ORDER BY 
                    created_at DESC
                LIMIT $3 OFFSET $4;
            `, [sanitizedQuery, userId, limit, skip]),

            sql.query(`
                SELECT 
                    COUNT(*) AS total
                FROM 
                    articles
                WHERE 
                    (title ILIKE $1 OR content::text ILIKE $1) AND author_id = $2;
            `, [sanitizedQuery, userId])
        ]);

        const total = countResult.rows[0].total;
        const articles = result.rows;

        return NextResponse.json({ total, articles });
    } catch (error) {
        console.error('Error fetching articles:', error);
        return NextResponse.json({ error: 'An error occurred while fetching articles' }, { status: 500 });
    }
}
