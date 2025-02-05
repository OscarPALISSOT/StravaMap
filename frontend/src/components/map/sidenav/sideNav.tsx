'use client';

import SearchBar from "@/components/searchBar";
import StravaActivityType from "@/types/strava/stravaActivityType";
import ActivityCard from "@/components/map/sidenav/activityCard";
import {useState} from "react";

interface SideNavProps {
    activities: StravaActivityType[];
}

const SideNav = ({activities}: SideNavProps) => {

    const [displayActivities, setDisplayActivities] = useState<StravaActivityType[]>(activities);
    const [searchValue, setSearchValue] = useState<string>('');

    const searchActivity = (value: string) => {
        if (value.length < 2) {
            setDisplayActivities(activities);
            return;
        }
        const lowerCasedValue = value.toLowerCase();
        setDisplayActivities(
            activities.filter(activity =>
                activity.name.toLowerCase().includes(lowerCasedValue) ||
                new Date(activity.start_date_local).toLocaleDateString().toLowerCase().includes(lowerCasedValue)
            )
        );
    }


    return (
        <div className={'h-screen w-80 min-w-60 border-r border-text dark:border-background max-w-96 flex flex-col'}>
            <div className={'px-3 h-14 flex items-center justify-center shrink-0'}>
                <SearchBar
                    placeholder={'Rechercher une activité'}
                    setSearchValue={searchActivity}
                    value={searchValue}
                    setValue={setSearchValue}
                />
            </div>
            <div className={'px-2 py-1 overflow-y-scroll'}>
                {displayActivities.map((activity: StravaActivityType, index: number) => (
                    <ActivityCard key={index} activity={activity}/>
                ))}
            </div>
        </div>
    )
}

export default SideNav;