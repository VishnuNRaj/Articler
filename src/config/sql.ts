import { PoolConfig } from "pg";

const sqlConfig = <PoolConfig>{
    user: process.env.NEXT_APP_SQL_USER,
    password: process.env.NEXT_APP_SQL_PASSWORD,
    port: process.env.NEXT_APP_SQL_PORT,
    database: process.env.NEXT_APP_SQL_DATABASE,
    host: process.env.NEXT_APP_SQL_HOST,
}

export default sqlConfig;