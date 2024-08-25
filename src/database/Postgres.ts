//database/Postgres.ts
import { Pool } from 'pg';
import sqlConfig from '@/config/sql';
const pool = new Pool(sqlConfig);

export default pool;
