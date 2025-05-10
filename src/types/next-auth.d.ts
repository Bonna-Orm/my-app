import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      role: string;
    };
  }

  interface User {
    id: string;
    email: string;
    user: string;
    //role: string; // ✅ Add this!
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string; // ✅ Add this too
  }
}
