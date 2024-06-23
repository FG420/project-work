import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

// const protectedPaths = [ '/dashboard' ];

// const jwtConfig = {
//     secret: new TextEncoder().encode( process.env.NEXT_PUBLIC_JWT_SECRET ),
// };

// export async function middleware ( req: NextRequest ) {
//     const token = req.cookies.get( 'token' )?.value || '';

//     const isProtectedPath = protectedPaths.some( ( path ) =>
//         req.nextUrl.pathname.startsWith( path ),
//     );

//     if ( !token && !isProtectedPath ) {
//         return NextResponse.redirect( new URL( '/signin', req.url ) );
//     }

//     try {
//         const verify = await jose.jwtVerify( token, jwtConfig.secret );
//     } catch ( error ) { }

//     return NextResponse.next();
// }

export function middleware ( req: NextRequest ) {
    const path = req.nextUrl.pathname
    const isPublicPath = path === '/signup' || path === '/signin' || path === '/verify-email/:path*'
    const token = req.cookies.get( 'token' )?.value || ''

    if ( isPublicPath && token ) {
        return NextResponse.redirect( new URL( '/dashboard', req.nextUrl ) );
    }

    if ( !isPublicPath && !token ) {
        return NextResponse.redirect( new URL( '/signin', req.nextUrl ) );
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [ '/:path*', '/signin', '/signup', '/dashboard/:path*' ],
};
