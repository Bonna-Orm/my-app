import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import UserList from '@/components/ui/userlist';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/login');
  // if (session.user.role !== 'admin' && session.user.role !== 'owner') {
  //   redirect('/login');
  // }

  return (
    <div className="p-6 space-y-4">
      <UserList />
    </div>
  );
}
