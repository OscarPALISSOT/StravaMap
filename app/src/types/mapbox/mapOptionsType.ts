import GpxLayerType from "@/types/mapbox/gpxLayerType";
import StyleLayerType from "@/types/mapbox/styleLayerType";

type MapOptionsType = {
    gpxLayer: GpxLayerType;
    styleLayer: StyleLayerType;
    showPlaceLabels: boolean;
    showRoadLabels: boolean;
    showPOILabels: boolean;
    showTransitLabels: boolean;
}

export default MapOptionsType;