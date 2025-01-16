import StravaActivityType from "@/types/strava/stravaActivityType";
import SportIcon from "@/components/sportIcon";

interface ActivityCardProps {
    activity: StravaActivityType;
}

const ActivityCard = ({activity}: ActivityCardProps) => {
    return (
        <div
            className={'group w-full h-16 truncate text-sm font-extralight cursor-pointer hover:bg-primary dark:hover:bg-primaryDark rounded-md p-1 flex items-center justify-start gap-2'}>
            <SportIcon sport_type={activity.sport_type}/>
            <div className={'h-full w-full py-1 flex flex-col truncate pr-2'}>
                <p className={'truncate'}>{activity.name}</p>
                <span className={'flex justify-between text-xs'}>
                    <p>{new Date(activity.start_date_local).toLocaleDateString()}</p>
                    <p>{Math.round(activity.distance / 100) / 10} km</p>
                </span>
            </div>
        </div>
    )
}

export default ActivityCard;