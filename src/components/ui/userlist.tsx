'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import EditUserModal from '@/components/ui/EditUserModal';
import DeleteUserDialog from '@/components/ui/DeleteUserDialog';
import { toast } from 'sonner';
import { getSession } from 'next-auth/react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [currentRole, setCurrentRole] = useState<string | null>(null);

  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    const data = await res.json();
    setUsers(data);
  };

  const fetchSession = async () => {
    const session = await getSession();
    setCurrentRole(session?.user?.role ?? null);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;
    try {
      const res = await fetch(`/api/users/${userToDelete.id}`, { method: 'DELETE' });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
        toast.success('User deleted successfully');
      } else {
        toast.error('Failed to delete user');
      }
    } catch (err) {
      toast.error('An error occurred');
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchSession();
  }, []);

  const hasPermission = currentRole === 'admin' || currentRole === 'owner';

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">User List</h1>
      <div className="flex gap-2">
        <Button asChild><a href="/admin/create-user">Add User</a></Button>
        <Link href="/dashboard"><Button>Back</Button></Link>
      </div>

      <div className="mt-4">
        <div className="overflow-x-auto border rounded-md">
          <table className="w-full text-sm">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="text-right space-x-2">
                    {hasPermission && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => {
                          setSelectedUser(user);
                          setModalOpen(true);
                        }}>
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            setUserToDelete(user);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onUpdate={fetchUsers}
        />
      )}

      <DeleteUserDialog
        user={userToDelete}
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDeleteUser}
      />
    </div>
  );
}
