import SideNav from "@/components/map/sidenav/sideNav";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {redirect} from "next/navigation";
import TopBar from "@/components/map/topBar";
import SessionType from "@/types/session";
import getActivities from "@/modules/strava/getActivities";

export default async function Home() {

    const session = (await getServerSession(authOptions)) as SessionType;
    if (!session) {
        redirect('/');
    }

    const activities = await getActivities(session!.access_token);
    return (
        <main className={'flex flex-row'}>
            <SideNav
                activities={activities}
            />
            <div className={'h-screen w-full flex flex-col'}>
                <TopBar
                    username={session.user!.name as string}
                    picture={session.user!.image as string}
                />
                <div className={'h-full w-full overflow-hidden bg-gray-400'}>
                </div>
            </div>
        </main>
    );
}
