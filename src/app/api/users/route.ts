import { NextResponse } from 'next/server';
import { db } from '@/index'; // Import your database connection
import { users } from '@/db/schema/user'; // Import your user schema
import { stores } from '@/db/schema/store'; // Import your user schema
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export const runtime = 'nodejs';

// GET: Fetch all users
export async function GET() {
  try {
    const allUsers = await  db.select().from(users);
    return NextResponse.json(allUsers, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST: Create a new user
export async function POST(req: Request) {
  try {
    const { name, email, password, role, storeId } = await req.json();

    // Validate required fields
    if (!name || !email || !password || !role || !storeId) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check if storeId exists
    const storeExists = await db.select().from(stores).where(eq(stores.id, storeId));
    if (storeExists.length === 0) {
      return NextResponse.json({ error: 'Invalid storeId. Store does not exist.' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      role,
      storeId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error instanceof Error ? error.message : error }, { status: 500 });
  }
}

// PUT: Update a user by ID
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, email,password, role } = body;

    if (!id || !name || !email || !password || !role) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const updatedUser = await db
      .update(users)
      .set({ name, email,password, role })
      .where(eq(users.id, id))
      .returning();

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// DELETE: Delete a user by ID
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await db.delete(users).where(eq(users.id, id));
    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}