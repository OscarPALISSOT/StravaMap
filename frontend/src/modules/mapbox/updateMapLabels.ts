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

    Object.entries(labelLayers).forEach(([option, layer]) => {
        const isVisible = mapOptions[option as keyof mapOptionsType] ? "visible" : "none";
        if (map.getLayer(layer)) {
            map.setLayoutProperty(layer, "visibility", isVisible);
        }
    });

    map.style.stylesheet.layers.forEach(function(layer) {
        if (layer.type === 'symbol') {
            map.removeLayer(layer.id);
        }
    });
}

export default UpdateMapLabels;