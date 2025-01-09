'use client'

import {useCallback, useState} from "react";
import {getStravaAuthUrl} from "@/modules/getStravaAuthUrl";
import Image from "next/image";
import Link from "next/link";

const StravaConnect = () => {

    const [authToken, setAuthToken] = useState<string>();

    const signOut = useCallback(() => {
        setAuthToken(undefined);
    }, []);

    return (
        <>
            {authToken === undefined &&
                <Link
                    href={getStravaAuthUrl()}
                >
                    <Image
                        className={'h-12 w-auto'}
                        src={'/btn_strava_connectwith_orange.png'}
                        width={386}
                        height={96}
                        alt={'Connect with Strava'}
                    />
                </Link>
            }
            {authToken !== undefined && <button onClick={signOut}>Sign out</button>}
        </>
    )
}

export default StravaConnect;