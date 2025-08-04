'use client';

import {useMap} from "@/components/contexts/mapContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLayerGroup} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import StyleLayerType from "@/types/mapbox/styleLayerType";
import updateLayerLineColor from "@/modules/mapbox/updateLayerLineColor";
import MapOptionsType from "@/types/mapbox/mapOptionsType";
import OptionsItem from "@/components/map/topBar/optionsItem";
import OptionsWrapper from "@/components/map/topBar/optionsWrapper";

interface LayerWrapperProps {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    activitiesIdWithSportType: { id: number, sport_type: string }[];
}

const LayerWrapper = ({activitiesIdWithSportType, setIsVisible, isVisible}: LayerWrapperProps) => {

    const layers: StyleLayerType[] = [{
        layer: 'mapbox://styles/mapbox/standard',
        label: 'Standard',
        preview: 'mapbox/streets-v12'
    }, {
        layer: 'mapbox://styles/mapbox/satellite-streets-v12',
        label: 'Satellite',
        preview: 'mapbox/satellite-streets-v12'
    }, {
        layer: 'mapbox://styles/mapbox/outdoors-v12',
        label: 'Outdoor',
        preview: 'mapbox/outdoors-v12'
    }]

    const {map, mapOptions, setMapOptions, setStyleLoaded} = useMap();

    return (
        <>
            <OptionsWrapper isVisible={isVisible} setIsVisible={setIsVisible}>
                {layers.map((layer, index) => (
                    <OptionsItem
                        key={index}
                        icon={<FontAwesomeIcon icon={faLayerGroup}/>}
                        label={layer.label}
                        selected={mapOptions.styleLayer.label === layer.label}
                        onClick={() => {
                            if (!map) return;
                            setStyleLoaded(false);
                            setMapOptions((prevMapOptions: MapOptionsType) => ({
                                ...prevMapOptions,
                                styleLayer: layer
                            }));
                            map.setStyle(layer.layer)
                            updateLayerLineColor(mapOptions.gpxLayer, activitiesIdWithSportType, map)
                        }}
                    />
                ))}
            </OptionsWrapper>
        </>
    )
}

export default LayerWrapper;