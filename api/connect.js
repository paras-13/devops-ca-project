// import mysql from "mysql";
// import dotenv from "dotenv";

// dotenv.config();

// export const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   port: process.env.DB_PORT,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });
// db.connect((err) => {
//   if (err) {
//     console.error("❌ Database connection failed:", err.stack);
//     return;
//   }
//   console.log("✅ Connected to MySQL as ID", db.threadId);
// });

import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log("✅ Connected to MySQL as ID", connection.threadId);
    connection.release();
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
}

testConnection();
