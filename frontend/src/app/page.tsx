import StravaConnect from "@/components/StravaConnect";

export default async  function Home() {

    return (
        <main>
            <h1 className={'text-black'}>Strava Map</h1>
            <StravaConnect/>
        </main>
    );
}
