import 'dotenv/config';
// import { drizzle } from 'drizzle-orm/node-postgres';

// const db = drizzle(process.env.DATABASE_URL!);

// export { db };

import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.DATABASE_URL!,
});
await client.connect();

const db = drizzle(client); // ✅ this is what DrizzleAdapter needs

export { db };