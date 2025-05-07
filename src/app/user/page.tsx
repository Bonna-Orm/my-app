import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function UserPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
      return redirect('/login');
    }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Hello, {session.user?.email}</h1>
      <div className="p-6">User Dashboard</div>
      
      <Link href='/dashboard'>
        <Button>Back To Dashboard</Button>
      </Link>
    </div>
  );
  }
  