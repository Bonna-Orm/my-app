import { pgTable, serial, text, integer, timestamp, boolean, uuid, decimal } from "drizzle-orm/pg-core";

export const stores = pgTable("stores", {
  id: serial("id").primaryKey(),
  storecode: text("store_code").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  location: text("location"),
  address: text("address"),
  phone: text("phone"),
  email: text("email"),
  website: text("website"),
  Image: text("image"),
  isActive: boolean("is_active").default(true),
  city: text("city"),
  country: text("country"),
  currency: text("currency"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});