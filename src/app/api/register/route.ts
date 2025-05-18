import { db } from '@/index';
import { users } from '@/db/schema/user';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    // Parse and validate the request body
    const { name, email, password, storeId } = await req.json();

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Name, email, password, are required" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      return NextResponse.json(
        { success: false, error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const newUser = await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      role: "owner", // Default role
      storeId, // Ensure storeId is valid
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Return a success response
    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    // Log the error for debugging
    console.error("Error registering user:", error);

    // Return an error response
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}