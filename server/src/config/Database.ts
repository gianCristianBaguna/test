import mysql from "mysql2";

const db = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'root',
    database: 'librarydb'
});

export default db;