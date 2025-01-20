import StravaActivityType from "@/types/strava/stravaActivityType";

function groupActivitiesBySportType (activities: StravaActivityType[]): StravaActivityType[][] {

    const grouped: Record<string, StravaActivityType[]> = {};

    activities.forEach(activity => {
        const { sport_type } = activity;
        if (!grouped[sport_type]) {
            grouped[sport_type] = [];
        }
        grouped[sport_type].push(activity);
    });

    return Object.values(grouped);
}

export default groupActivitiesBySportType;