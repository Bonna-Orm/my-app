// components/EditUserModal.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface EditUserModalProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  open: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export default function EditUserModal({ user, open, onClose, onUpdate }: EditUserModalProps) {
  const [formData, setFormData] = useState(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const res = await fetch(`/api/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      onUpdate();
      onClose();
    } else {
      alert('Failed to update user');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
          <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <select name="role" value={formData.role} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="user">User</option>
            <option value="cashier">Cashier</option>
            <option value="admin">Admin</option>
            <option value="owner">Owner</option>
          </select>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
