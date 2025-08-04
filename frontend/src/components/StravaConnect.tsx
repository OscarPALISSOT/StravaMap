'use client'

import Image from "next/image";
import {signIn, signOut, useSession} from "next-auth/react";

const StravaConnect =  () => {

    const {data: session} = useSession();

    return (
        <>
            {!session &&
                <Image
                    className={'h-12 w-auto'}
                    src={'/btn_strava_connectwith_orange.png'}
                    width={386}
                    height={96}
                    alt={'Connect with Strava'}
                    onClick={() => signIn('strava', {callbackUrl: '/map'})}
                />
            }
            {session && <button onClick={() => signOut()} className={'text-black'}>Sign out</button>}
        </>
    )
}

export default StravaConnect;