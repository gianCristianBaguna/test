import mysql from "mysql2";

const db = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'root',
    database: 'librarydb',
    port: 3306,
});

export default db;