import SideNav from "@/components/map/sideNav";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {redirect} from "next/navigation";
import TopBar from "@/components/map/topBar";

export default async function Home() {

    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/');
    }
    return (
        <main className={'flex flex-row'}>
            <SideNav/>
            <div className={'h-screen w-full'}>
                <TopBar
                    username={session.user!.name as string}
                    picture={session.user!.image as string}
                />
            </div>

        </main>
    );
}
