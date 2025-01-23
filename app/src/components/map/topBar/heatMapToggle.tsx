'use client';

import TopMenu from "@/components/map/topBar/topMenu";
import {faTemperatureLow} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useMap} from "@/components/contexts/mapContext";
import updateLayerLineColor from "@/modules/mapbox/updateLayerLineColor";
import React from "react";
import gpxLayerType from "@/types/mapbox/gpxLayerType";

interface HeatMapToggleProps {
    activitiesIdWithSportType: {id: number, sport_type: string}[];
}

const HeatMapToggle = ({activitiesIdWithSportType}: HeatMapToggleProps) => {

    const {map, setGpxLayer} = useMap()

    const lineStyle: {style: gpxLayerType, label: string }[] = [
        {style: 'bySportType', label: 'Par sport'},
        {style: 'bySportTypeHeat', label: 'Chaleur par sport' },
        {style: 'heatGlobal', label: 'Chaleur globale' },
        {style: 'stravaGlobal', label: 'Orange Strava'}
    ]

    return (
        <TopMenu btnLabel={<FontAwesomeIcon icon={faTemperatureLow}/>}>
            <div className={'w-full h-full p-2 flex gap-2 flex-wrap'}>
                {lineStyle.map((style, index) => (
                    <div
                        key={index}
                        className={'w-[calc(50%_-_0.25rem)] rounded-md h-40 border-2 border-text dark:border-background overflow-hidden cursor-pointer relative hover:border-blue-500 dark:hover:border-blue-500'}
                        onClick={() => {
                            if (!map) return;
                            map && updateLayerLineColor(style.style, activitiesIdWithSportType, map)
                            setGpxLayer(style.style)
                        }}
                    >
                        {/*<Image*/}
                        {/*    className={'w-full h-full object-cover rounded-md'}*/}
                        {/*    src={getPreviewStylesUrl(layer.preview, coords.lon, coords.lat)}*/}
                        {/*    alt={layer.label}*/}
                        {/*    width={300}*/}
                        {/*    height={300}*/}
                        {/*/>*/}
                        <div
                            className={'absolute bottom-0 left-0 w-full font-extralight flex justify-center bg-background dark:bg-text'}>{style.label}</div>
                    </div>
                ))}
            </div>
        </TopMenu>
    )
}

export default HeatMapToggle;