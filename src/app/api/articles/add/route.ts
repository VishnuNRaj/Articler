import { NextRequest, NextResponse } from 'next/server';
import sql from '@/database/Postgres';
import { uploadFile } from '@/utils/FilesUpload';
import { getServerSession } from 'next-auth';
import Users, { Add_Article, Content } from '@/interfaces/articles';
import { QueryResult } from 'pg';

export async function POST(req: NextRequest) {
    try {
        const { title, content, published } = await req.json();
        console.log(title, content, published)
        const session = await getServerSession();
        const userId = session?.user?.email;
        console.log(session)
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const user: QueryResult<Users> = await sql`SELECT * FROM verified_users WHERE email = ${userId}`
        if (user.rows.length === 0) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        const time = new Date().toLocaleString()
        const result = await sql`
            INSERT INTO articles (title, content, author_id, published,created_at, updated_at)
            VALUES (${title}, ${JSON.stringify(content)}, ${user.rows[0].id}, ${published},${time},${time})
            RETURNING id;
        `;

        return NextResponse.json({ message: 'Article created', articleId: result.rows[0].id });

    } catch (error) {
        console.error('Error creating article:', error);
        return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
    }
}
