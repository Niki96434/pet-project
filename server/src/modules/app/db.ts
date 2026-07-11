import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT || '5432', 10),
  database: process.env.PGDATABASE,
  max: 20
});

pool.on('error', (err: Error) => {
  console.error('Unexpected error on idle client', err);
});

