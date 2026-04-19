import Database from 'better-sqlite3';

export const db = new Database('tasks.db', {
  verbose: console.log,
  timeout: 5000
});

db.pragma('journal_mode = WAL');

try {
  db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL
  );
  `);
} catch (err) {
  if (err instanceof Error) {
    console.error(err.message)
  }
}

