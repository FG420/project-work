'use client';

import { useEffect, useState } from 'react';

export default function Login () {
    const [ payload, setPayload ] = useState( null );

    useEffect( () => {
        const terminalInit = async () => {
            const MojoAuth = ( await import( 'mojoauth-web-sdk' ) ).default;
            const mojoauth = new MojoAuth( `${ process.env.NEXT_PUBLIC_MOJO_AUTH_API_KEY }`, {
                language: 'en',
                redirect_url: `${ process.env.NEXT_PUBLIC_REDIRECT_URL_PROD }`,
                source: [
                    { type: 'email', feature: 'magiclink' },
                    { type: 'phone', feature: 'otp' },
                ],
            } );
            // @ts-ignore
            mojoauth.signIn().then( ( payload ) => {
                setPayload( payload );
            } );
        };

        if ( !payload ) {
            terminalInit();
        }
    }, [ payload ] );

    return <div id="mojoauth-passwordless-form"></div>;
}
