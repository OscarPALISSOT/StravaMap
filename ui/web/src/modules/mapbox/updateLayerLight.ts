import lightPresetType from "@/types/mapbox/lightPreset";
import mapboxgl from "mapbox-gl";

function UpdateLayerLight(lightpreset: lightPresetType, map: mapboxgl.Map) {
    if (map && map.getStyle()?.name === 'Mapbox Standard') {
        return;
    }
    map.setConfigProperty('basemap', 'lightPreset', lightpreset);
}

export default UpdateLayerLight;