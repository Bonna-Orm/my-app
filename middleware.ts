import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  // Not logged in
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const role = token.role;

  const path = req.nextUrl.pathname;

  if (path.startsWith('/admin') && role !== 'owner') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  if (path.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  if (path.startsWith('/cashier') && role !== 'cashier') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  if (path.startsWith('/user') && role !== 'user') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  return NextResponse.next();
}

// Apply to these routes only
export const config = {
  matcher: ['/owner/:path*','/admin/:path*', '/cashier/:path*', '/user/:path*'],
};
