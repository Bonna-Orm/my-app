import { db } from '@/index';
import { users } from '@/db/schema/user';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Parse and validate the request body
    const { name, email, password, } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      role:'admin',
    });

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}