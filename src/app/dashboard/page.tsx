import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect ('/login');
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Hello, {session.user?.email}</h1>
      <Link href='/admin/create-user'>
        <Label>Create User</Label>
      </Link>
      
      <Link href='/admin'>
        <Label className='pt-5'>User List</Label>
      </Link>

      <Link href='/cashier'>
        <Label className='pt-5'>Cashier Page</Label>
      </Link>

      <Link href='/user'>
        <Label className='pt-5'>User Page</Label>
      </Link>
    </div>
  );
}
