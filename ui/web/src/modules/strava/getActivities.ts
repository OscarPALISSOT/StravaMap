import StravaActivityType from "@/types/strava/stravaActivityType";
import axios from "axios";

const GetActivities = async (
    bearerToken: string,
    page: number = 1,
    perPage: number = 150
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
    } catch (error) {
        if (error instanceof Error) {
            console.error("Erreur lors de la récupération des activités Strava:", error.message);
        }
        throw new Error("Impossible de récupérer les activités Strava");
    }
};

export default GetActivities;