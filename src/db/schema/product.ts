import { pgTable, serial, text, integer, timestamp, boolean, uuid, decimal } from "drizzle-orm/pg-core";
import { stores } from "./store";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  storeId: integer("store_id").references(() => stores.id).notNull(),
  Image: text("image"),
  brandname: text("name").notNull(),
  description: text("description"),
  category: text("category"),
  ItemCode: text("item_code").notNull(),
  barcode: text("barcode").notNull(),
  sku: text("sku").unique(),
  cost: decimal("cost", { precision: 10, scale: 2 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  stock: integer("stock").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});