import StravaActivityType from "@/types/strava/stravaActivityType";
import polyline from "@mapbox/polyline";
import {GeoJSON} from "geojson";

function DisplayActivities(map: mapboxgl.Map, activities: StravaActivityType[]) {
    activities.forEach((activity) => {
        if (activity.map.summary_polyline) {
            const decodedPolyline = polyline.decode(activity.map.summary_polyline);
            const geojson = {
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: decodedPolyline.map(([lat, lng]) => [lng, lat]),
                },
            };

            map.addSource(activity.id.toString(), {
                type: 'geojson',
                data: geojson as GeoJSON,
            });

            map.addLayer({
                id: activity.id.toString(),
                type: 'line',
                source: activity.id.toString(),
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                },
                paint: {
                    'line-color': 'rgb(255,153,0)',
                    'line-width': 3,
                },
            });
        }
    });
}

export default DisplayActivities;