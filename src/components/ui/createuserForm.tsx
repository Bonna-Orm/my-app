'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function CreateUserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    password: '',
    storeId: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.email || !formData.password || !formData.storeId) {
      setError('All fields are required');
      return;
    }

    if (isNaN(Number(formData.storeId))) {
      setError('Store Id must be a number');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        storeId: Number(formData.storeId),
      };

      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create user');
      }

      setSuccess('User created successfully!');
      setFormData({ name: '', email: '', role: 'user', storeId: '', password: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-15 border rounded-md">
      <h2 className="text-lg font-semibold">Create User</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}

      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          required
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium">
          Role
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
        >
          <option value="user">User</option>
          <option value="cashier">Cashier</option>
          <option value="admin">Admin</option>
          <option value="owner">Owner</option>
        </select>
      </div>

      <div>
        <label htmlFor="storeId" className="block text-sm font-medium">
          Store Id
        </label>
        <Input
          id="storeId"
          name="storeId"
          value={formData.storeId}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
          placeholder="Enter store id"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <Input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
        />
      </div>

      <div className="float-right flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </Button>
        <Link href='/admin'>
          <Button className='bg-red-500' type="button">
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  );
}