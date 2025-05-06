// app/admin/page.tsx or similar

import { db } from '@/index'; // Make sure this points to your actual db file
import { users } from '@/db/schema/user'; // Your Drizzle table schema
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/ui/LogoutButton';
import { Button } from '@/components/ui/button';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/login');
  if (session.user.role !== 'admin' && session.user.role !== 'owner') {
    redirect('/login');
  }

  let usersList: User[] = [];

  try {
    usersList = (await db.select().from(users)).map((user) => ({
      id: user.id,
      name: user.name ?? 'Unknown',
      email: user.email,
      role: user.role ?? 'user',
    }));
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Hello, {session.user.email}</h1>
      <LogoutButton />
      <Button asChild>
        <a href="/admin/create-user">Add User</a>
      </Button>

      <div className="mt-4">
        <div className="overflow-x-auto border rounded-md">
          <table className="w-full text-sm">
            <TableHeader>
              <TableRow>
                <TableHead>User Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersList.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="destructive">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </table>
        </div>
      </div>
    </div>
  );
}
