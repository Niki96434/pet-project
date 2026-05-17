import Database from 'better-sqlite3';

export interface UserType {
    id: number;
    username: string;
    password_hash: string;
}

export const users = new Database('users.db', {
    timeout: 5000
});

users.pragma('journal_mode = WAL');

try {
    users.exec(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
  );
  `);
} catch (err) {
    if (err instanceof Error) {
        console.error(err.stack)
    }
}

