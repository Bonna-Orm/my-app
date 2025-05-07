import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/index';
import { users } from '@/db/schema/user';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';


// Extend the User and AdapterUser types to include the `role` property
declare module 'next-auth' {
  interface User {
    role?: string | null;
  }

  interface AdapterUser {
    role?: string | null;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role?: string | null;
      image?: string | null;
    };
  }

  interface JWT {
    role?: string | null;
  }
}

export const runtime = 'nodejs';

// Define the NextAuth options
export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        // Check if the user exists
        const [user] = await db.select().from(users).where(eq(users.email, credentials.email));
        if (!user) {
          throw new Error('Invalid email or password');
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid email or password');
        }

        // Return the user object
        return { id: user.id, 
                 name: user.name, 
                 email: user.email, 
                 role: user.role 
                };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
       session.user={
        ...session.user,
        id:token.sub as string,
        role:token.role,
       }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role as string;
      }
      return token;
    },
  },
};

// Export the handler for Next.js API routes
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };