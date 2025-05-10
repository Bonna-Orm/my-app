'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
// import { User } from '@/types/next-auth' // Adjust path based on where your User type is
// Define a minimal User type here if not available elsewhere
type User = {
  name?: string;
  // Add other properties as needed
};

interface DeleteUserDialogProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteUserDialog({
  user,
  open,
  onClose,
  onConfirm,
}: DeleteUserDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure! you want to delete <strong>{user?.name}</strong>?
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Delete</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
