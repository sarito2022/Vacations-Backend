import mysql, { RowDataPacket } from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: '',
    password: '',
    port: 3306,
    database: 'mydb'
});

export function execute<T>(query: string, params?: any[]) {
    return pool.promise().execute<T & RowDataPacket[]>(query, params);
}