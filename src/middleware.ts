import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function authenticationMiddleware(request: NextRequest) {
    if (!request.cookies.get('authenticated=true')) {
      // Redirect to the login page
      return NextResponse.redirect('/login');
    }
    return NextResponse.next();
  }
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}