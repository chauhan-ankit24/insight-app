import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth-token');

  if (!authCookie && request.nextUrl.pathname.startsWith('/metrics')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/metrics/:path*', '/settings/:path*'],
};
