'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const res = await signIn('credentials', {
      email: form.get('email'),
      password: form.get('password'),
      redirect: false,
    });

    if (res?.error) {
      setError('Invalid credentials');
      return;
    }

    // Fetch the user's session to get their role
    const sessionRes = await fetch('/api/auth/session');
    const session = await sessionRes.json();

    if (session?.user?.role === 'admin' && session?.user.role !=='owner') {
      router.push('/dashboard');
    } else {
      router.push('/user');
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-6">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="email" name="email" placeholder="Email" required />
          <Input type="password" name="password" placeholder="Password" required />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full">Login</Button>
          <Link href='/register'>
        <Label className='pt-5'>Don't have an account register here.</Label>
      </Link>
        </form>
      </CardContent>
    </Card>
  );
}