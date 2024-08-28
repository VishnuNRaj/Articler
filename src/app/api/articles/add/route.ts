// File: app/api/articles/route.ts
import { NextRequest, NextResponse } from 'next/server';
import sql from '@/database/Postgres';
import { getServerSession } from 'next-auth';
import Users from '@/interfaces/articles';
import { QueryResult } from 'pg';
import { generateRandomString } from '@/utils/CommonFunctions';

export async function POST(req: NextRequest) {
    try {
        const { title, content, published, content_type, description, thumbnail } = await req.json();
        console.log(title, content, published, content_type, description, thumbnail);

        const session = await getServerSession();
        const userEmail = session?.user?.email;

        console.log(session);

        if (!userEmail) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user: QueryResult<Users> = await sql`SELECT * FROM verified_users WHERE email = ${userEmail}`;

        if (user.rows.length === 0) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const link = generateRandomString(12)
        const time = new Date().toLocaleString();

        const result = await sql`
            INSERT INTO articles (title, content, author_id, published, created_at, updated_at, content_type, description, thumbnail,link)
            VALUES (${title}, ${JSON.stringify(content)}, ${user.rows[0].id}, ${published}, ${time}, ${time}, ${content_type}, ${description}, ${thumbnail}, ${link})
            RETURNING link;
        `;

        return NextResponse.json({ message: 'Article uploaded successfully', articleId: result.rows[0].link });

    } catch (error) {
        console.error('Error creating article:', error);
        return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
    }
}
