import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import CreateUserButton from "@/components/ui/CreateUserButton";
import Link from "next/link";
import { Label } from "@/components/ui/label";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Hello, {session.user?.email}</h1>
      <CreateUserButton userRole={session.user.role ?? ""} />

      <Link href="/admin">
        <Label className="pt-5">User List</Label>
      </Link>

      {/* Conditionally render the Cashier Page link */}
      {session.user.role === "cashier" && "admin" && (
        <Link href="/cashier">
          <Label className="pt-5">Cashier Page</Label>
        </Link>
      )}
      
      {session.user.role === "user" && "admin" && (
        <Link href="/user">
        <Label className="pt-5">User Page</Label>
      </Link>
      )}
    </div>
  );
}