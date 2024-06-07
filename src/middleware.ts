import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware ( req: NextRequest ) {
    const path = req.nextUrl.pathname
    const isPublicPath = path === '/ok' || path === '/hi'
    const token = req.cookies.get( 'token' )?.value || ''

    if ( isPublicPath ) {
        return NextResponse.redirect( new URL( '/signin', req.nextUrl ) );
    }

    // if (!isPublicPath) {
    //     return NextResponse.redirect(new URL('/signin', req.nextUrl));
    // }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [ '/', '/signin', '/signup', '/dashboard/:path*' ]
}