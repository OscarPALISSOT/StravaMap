import mapOptionsType from "@/types/mapbox/mapOptionsType";
import mapboxgl from "mapbox-gl";

function UpdateMapLabelsBaseMap(mapOptions: mapOptionsType, map: mapboxgl.Map) {
    map.setConfigProperty(
        'basemap',
        'showPlaceLabels',
        mapOptions.showPlaceLabels
    );
    map.setConfigProperty(
        'basemap',
        'showPointOfInterestLabels',
        mapOptions.showPOILabels
    );
    map.setConfigProperty(
        'basemap',
        'showRoadLabels',
        mapOptions.showRoadLabels
    );
    map.setConfigProperty(
        'basemap',
        'showTransitLabels',
        mapOptions.showTransitLabels
    );
}

export default UpdateMapLabelsBaseMap;