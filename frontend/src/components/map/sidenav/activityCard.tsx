'use client';

import StravaActivityType from "@/types/strava/stravaActivityType";
import SportIcon from "@/components/sportIcon";
import {useMap} from "@/components/contexts/mapContext";
import useFormattedDate from "@/hooks/useFormattedDate";

interface ActivityCardProps {
    activity: StravaActivityType;
}

const ActivityCard = ({activity}: ActivityCardProps) => {

    const {map} = useMap();

    const date = useFormattedDate(activity.start_date_local)

    return (
        <div
            onClick={() => {
                if (!map) return;
                map.flyTo({
                    center: [activity.start_latlng[1], activity.start_latlng[0]],
                    essential: true,
                    zoom: 12.5,
                })
            }}
            className={'group w-full h-16 truncate text-sm font-extralight hover:hover-glass hover:glass-border rounded-3xl p-1 pl-2 flex items-center justify-start gap-2'}
        >
            <SportIcon sport_type={activity.sport_type}/>
            <div className={'h-full w-full py-1 flex flex-col truncate pr-2'}>
                <p className={'truncate'}>{activity.name}</p>
                <span className={'flex justify-between text-xs'}>
                    <p>{date}</p>
                    <p>{Math.round(activity.distance / 100) / 10} km</p>
                </span>
            </div>
        </div>
    )
}

export default ActivityCard;