import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool({
    user: "siyabonga",
    host: "localhost",
    database: "sqltodo_db",
    password: "Siya@100",
    port: 5432,
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
