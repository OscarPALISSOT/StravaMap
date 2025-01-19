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
    start_date: number;
    start_date_local: number;
    timezone: string;
    start_latlng: number[];
    map: {
        id: number;
        summary_polyline: string;
    }
}

export default StravaActivityType;