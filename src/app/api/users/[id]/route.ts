// app/api/users/[id]/route.ts

import { db } from '@/index';
import { users } from '@/db/schema/user';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

interface Params {
  params: { id: string };
}

export async function DELETE(req: Request, { params }: Params) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    await db.delete(users).where(eq(users.id, id));
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const data = await req.json();

  try {
    await db.update(users).set({
      name: data.name,
      email: data.email,
      role: data.role,
    }).where(eq(users.id, id));

    return NextResponse.json({ message: 'User updated' });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

