'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import LogoutButton from './LogoutButton';

export default function TopBar() {
  interface User {
    name: string;
    [key: string]: any; // Add other properties as needed
  }

  const [session, setSession] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/auth/session'); // Correct API route
        if (!res.ok) throw new Error('Failed to fetch session');
        const data = await res.json();
        console.log('Session data:', data); // Log the session data
        setSession(data.user); // Set only the user object
      } catch (error) {
        console.error('Error fetching session:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    console.log('Session state:', session); // Log the session state
  }, [session]);

  if (loading) {
    return (
      <header className="flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-gray-950">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold">
            MyApp
          </Link>
        </div>
        <div>Loading...</div>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-gray-950">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-xl font-bold">
          MyApp
        </Link>
      </div>

      <div>
        {session ? (
          <>
            <span>Welcome, {session.name}!</span>
            <LogoutButton />
          </>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </header>
  );
}