import StravaActivityType from "@/types/strava/stravaActivityType";
import polyline from "@mapbox/polyline";
import {GeoJSON} from "geojson";
import GpxLayerType from "@/types/mapbox/gpxLayerType";
import gpxHexToRGB from "@/modules/gpxHexToRGB";
import getSportColor from "@/modules/getSportColor";

function DisplayActivity(map: mapboxgl.Map, activity: StravaActivityType, gpxLayer: GpxLayerType) {
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
                'line-width': 3,
                'line-color': gpxHexToRGB(getSportColor(activity.sport_type), gpxLayer),
                'line-emissive-strength': 1,
            },
        });
    }
}

export default DisplayActivity;