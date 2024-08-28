import { NextRequest, NextResponse } from 'next/server';
import sql from '@/database/Postgres';

export async function GET(req: NextRequest, { params }: { params: { link: string } }) {
    const link = req.nextUrl.searchParams.get('link') || '';
    console.log(link, "????");

    try {
        const result = await sql`
            SELECT 
                *
            FROM 
                articles a
            JOIN 
                verified_users u ON a.author_id = u.id
            WHERE 
                a.link = ${link} AND a.published = true
        `;

        const article = result.rows[0];

        return NextResponse.json({ article });
    } catch (error) {
        console.error('Error fetching articles:', error);
        return NextResponse.json({ error: 'An error occurred while fetching articles' }, { status: 500 });
    }
}
