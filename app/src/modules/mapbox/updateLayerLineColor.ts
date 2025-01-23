import mapboxgl from "mapbox-gl";
import gpxHexToRGB from "@/modules/gpxHexToRGB";
import getSportColor from "@/modules/getSportColor";
import gpxLayerType from "@/types/mapbox/gpxLayerType";

function UpdateLayerLineColor(gpxLayer: gpxLayerType, activitiesIdWithSportType: {id: number, sport_type: string}[], map: mapboxgl.Map) {
    activitiesIdWithSportType.forEach(activityIdWithSportType => {
        map.setPaintProperty(activityIdWithSportType.id.toString(), 'line-color', gpxHexToRGB(getSportColor(activityIdWithSportType.sport_type), gpxLayer))
    })
}

export default UpdateLayerLineColor;