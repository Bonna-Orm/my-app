import { pgTable, varchar, timestamp, uuid, serial, text,integer } from 'drizzle-orm/pg-core';
import { stores } from './store';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  storeId: integer("store_id").references(() => stores.id),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  role:varchar('role',{ length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});
