'use client';

import {faLayerGroup} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useMap} from "@/components/contexts/mapContext";
import updateLayerLineColor from "@/modules/mapbox/updateLayerLineColor";
import React from "react";
import gpxLayerType from "@/types/mapbox/gpxLayerType";
import OptionsWrapper from "@/components/map/topBar/optionsWrapper";
import OptionsItem from "@/components/map/topBar/optionsItem";
import MapOptionsType from "@/types/mapbox/mapOptionsType";

interface HeatMapWrapperProps {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    activitiesIdWithSportType: { id: number, sport_type: string }[];
}

const HeatMapWrapper = ({activitiesIdWithSportType, setIsVisible, isVisible}: HeatMapWrapperProps) => {

    const {map, mapOptions, setMapOptions} = useMap()

    const lineStyle: { style: gpxLayerType, label: string }[] = [
        {style: 'bySportType', label: 'Par sport'},
        {style: 'bySportTypeHeat', label: 'Chaleur par sport'},
        {style: 'heatGlobal', label: 'Chaleur globale'},
        {style: 'stravaGlobal', label: 'Orange Strava'}
    ]

    return (
        <OptionsWrapper isVisible={isVisible} setIsVisible={setIsVisible}>
            {lineStyle.map((style, index) => (
                <OptionsItem
                    key={index}
                    icon={<FontAwesomeIcon icon={faLayerGroup}/>}
                    label={style.label}
                    selected={style.style === mapOptions.gpxLayer}
                    onClick={() => {
                        if (!map) return;
                        updateLayerLineColor(style.style, activitiesIdWithSportType, map)
                        setMapOptions((prevMapOptions: MapOptionsType) => ({
                            ...prevMapOptions,
                            gpxLayer: style.style
                        }));
                    }}>
                </OptionsItem>
            ))}
        </OptionsWrapper>
    )
}

export default HeatMapWrapper;