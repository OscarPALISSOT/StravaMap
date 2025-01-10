'use client'

import {getStravaAuthUrl} from "@/modules/getStravaAuthUrl";
import Image from "next/image";
import Link from "next/link";
import {useAuth} from "@/Contexts/authContext";

const StravaConnect = () => {

    const { isAuthenticated, signOut } = useAuth();

    return (
        <>
            {!isAuthenticated &&
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
            {isAuthenticated && <button onClick={signOut}>Sign out</button>}
        </>
    )
}

export default StravaConnect;