import mapOptionsType from "@/types/mapbox/mapOptionsType";
import mapboxgl from "mapbox-gl";

function UpdateMapLabels(mapOptions: mapOptionsType, map: mapboxgl.Map) {

    const labelLayers = {
        showPlaceLabels: "place-label",
        showRoadLabels: "road-label",
        showPOILabels: "poi-label",
        showTransitLabels: "transit-label",
    };

    if (!map || !map.isStyleLoaded()) return;

    // map.getStyle()?.layers?.filter(layer => layer['source-layer']?.includes('label')).map(item => {
    //     console.log(item['source-layer'])
    // })

    Object.entries(labelLayers).forEach(([option, keyword]) => {
        const isVisible = mapOptions[option as keyof mapOptionsType] ? "visible" : "none";
        map.getStyle()?.layers?.filter(layer => layer['source-layer']?.includes(keyword)).forEach((layer) => {
            map.setLayoutProperty(layer.id, "visibility", isVisible);
        });
    });
}

export default UpdateMapLabels;