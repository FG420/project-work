import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

const protectedPaths = ['/dashboard'];

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET),
};

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value || '';

  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path),
  );

  if (!token && isProtectedPath) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  try {
    const verify = await jose.jwtVerify(token, jwtConfig.secret);
    console.log(verify);
  } catch (error) {}

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/signin', '/signup', '/dashboard/:path*'],
};
