import pkg from 'pg';
const { Pool } = pkg;

import dotenv from 'dotenv';
dotenv.config({ path: '../.DS_STORE/.env' })

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,

});

async function connectDb() {
    try {
        await pool.connect();
        console.log("Database connected successfully!!!");
    } catch (error) {
        console.error("Failed to connect:", error.message);
    }
}
connectDb();

export default pool;
