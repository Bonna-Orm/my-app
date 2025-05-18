import { NextResponse } from "next/server";
import { db } from "@/index"; // Import your database connection
import { stores } from "@/db/schema/store"; // Import your store schema
import { eq } from "drizzle-orm"; // Import the eq function for equality checks

// GET: Fetch all stores
export async function GET() {
  try {
    const allStores = await db.select().from(stores);
    return NextResponse.json(
      { success: true, data: allStores, message: "Stores fetched successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching stores:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stores" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, location } = await req.json();

    // Validate input
    if (!name || !location) {
      return NextResponse.json(
        { success: false, error: "Name and location are required" },
        { status: 400 }
      );
    }

    // Insert the new store into the database
    const newStore = await db.insert(stores).values(
        {  
            name,
            storecode: "", // Provide a default value or generate one as needed
            description: "",
            location,
            address: "",
            phone: "",
            email: "",
            website: "",
            Image: "",
            isActive: true,
            city: "",
            country: "",
            currency: "",
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    );
    return NextResponse.json(
      { success: true, data: newStore, message: "Store created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating store:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create store" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing store
export async function PUT(req: Request) {
  try {
    const { id, name, location } = await req.json();

    // Validate input
    if (!id || !name || !location) {
      return NextResponse.json(
        { success: false, error: "ID, name, and location are required" },
        { status: 400 }
      );
    }

    // Update the store in the database
    const updatedStore = await db
      .update(stores)
      .set({ name, location })
      .where(eq(stores.id, id));
    return NextResponse.json(
      { success: true, data: updatedStore, message: "Store updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating store:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update store" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a store
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    // Validate input
    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      );
    }

    // Delete the store from the database
    await db.delete(stores).where(eq(stores.id, id));
    return NextResponse.json(
      { success: true, message: "Store deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting store:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete store" },
      { status: 500 }
    );
  }
}