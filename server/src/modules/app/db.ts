import Database from 'better-sqlite3';

export const db = new Database('task-manager.db', {
  timeout: 5000,
  verbose: console.log
});

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

try {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
  );

    CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(30) NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    deadlineDate TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Not completed',
    user_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  );
  
  `);
} catch (err) {
  if (err instanceof Error) {
    console.error(err.stack)
  }
}

