import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import CreateUserForm from '@/components/ui/createuserForm';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export default async function CreateUserPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  // if (session.user.role !== 'admin' && session.user.role !== 'owner') {
  //   return (
  //     <div className="max-w-md mx-auto mt-10">
  //       <Alert variant="destructive">
  //         <ExclamationTriangleIcon className="h-4 w-4" />
  //         <AlertTitle>Access Denied</AlertTitle>
  //         <AlertDescription>
  //           You do not have permission to create a user.
  //         </AlertDescription>
  //       </Alert>
  //     </div>
  //   );
  // }

  return (
    <div className="p-6">
      <CreateUserForm />
    </div>
  );
}
