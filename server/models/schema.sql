CREATE TABLE
    IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(30) NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        refresh_token TEXT
    );

CREATE TABLE
    IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(30) NOT NULL,
        description TEXT,
        category VARCHAR(15) NOT NULL,
        deadline_date TIMESTAMP DEFAULT NOW (),
        status VARCHAR(20) NOT NULL DEFAULT 'Not completed',
        user_id INTEGER NOT NULL,
        CONSTRAINT tasks_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );