type StravaActivityType = {
    id: number;
    type: string;
    sport_type: string;
    name: string;
    distance: number;
    location_city: string;
    location_state: string;
    location_country: string;
    total_elevation_gain: number;
    start_date: string;
    start_date_local: string;
    timezone: string;
}

export default StravaActivityType;