import SideNav from "@/components/map/sidenav/sideNav";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {redirect} from "next/navigation";
import TopBar from "@/components/map/topBar/topBar";
import SessionType from "@/types/session";
import getActivities from "@/modules/strava/getActivities";
import Map from "@/components/map/map";
import {MapProvider} from "@/components/contexts/mapContext";

export default async function Home() {

    const session = (await getServerSession(authOptions)) as SessionType;

    if (!session || session.expires_at < (Date.now()/1000 as number)) {
        redirect('/');
    }

    const activities = await getActivities(session!.access_token);
    const simplifiedActivities = activities.map(activity => ({
        id: activity.id,
        sport_type: activity.sport_type
    }));
    return (
        <MapProvider>
            <main className={'flex flex-row'}>
                <SideNav
                    activities={activities}
                />
                <div className={'h-screen w-full flex flex-col relative'}>
                    <TopBar
                        username={session.user!.name as string}
                        picture={session.user!.image as string}
                        activitiesIdWithSportType={simplifiedActivities}
                    />
                    <div className={'h-full w-full overflow-hidden'}>
                        <Map activities={activities} />
                    </div>
                </div>
            </main>
        </MapProvider>
    );
}
