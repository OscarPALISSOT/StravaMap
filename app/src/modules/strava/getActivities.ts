import StravaActivityType from "@/types/strava/stravaActivityType";
import axios from "axios";

const GetActivities = async (
    bearerToken: string,
    page: number = 1,
    perPage: number = 30
): Promise<StravaActivityType[]> => {
    const url = process.env.STRAVA_API_URL + '/athlete/activities';

    try {
        const response = await axios.get<StravaActivityType[]>(url, {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            },
            params: {
                page,
                per_page: perPage,
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Erreur lors de la récupération des activités Strava:", error.response?.data || error.message);
        throw new Error("Impossible de récupérer les activités Strava");
    }
};

export default GetActivities;