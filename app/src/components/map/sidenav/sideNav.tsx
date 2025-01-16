import SearchBar from "@/components/searchBar";
import StravaActivityType from "@/types/strava/stravaActivityType";
import ActivityCard from "@/components/map/sidenav/activityCard";

interface SideNavProps {
    activities: StravaActivityType[];
}

const SideNav = ({activities}: SideNavProps) => {
    return (
        <div className={'h-screen w-80 min-w-60 border-r border-text dark:border-background max-w-96 flex flex-col'}>
            <div className={'h-14 flex items-center justify-center shrink-0'}>
                <SearchBar placeholder={'Rechercher une activité'}/>
            </div>
            <div className={'px-2 py-1 overflow-y-scroll [&::-webkit-scrollbar-track]:bg-yellow-500'}>
                {activities.map((activity: StravaActivityType, index: number) => (
                    <ActivityCard key={index} activity={activity}/>
                ))}
            </div>
        </div>
    )
}

export default SideNav;