import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import LogoutButton from '@/components/ui/LogoutButton';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div className="text-center mt-10">You must be logged in</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Hello, {session.user?.email}</h1>
      <LogoutButton />
    </div>
  );
}
