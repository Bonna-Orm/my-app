import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default function UserPage() {
    return <div className="p-6">User Home</div>;
  }
  