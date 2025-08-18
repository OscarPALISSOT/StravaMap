'use client';

import Image from "next/image";
import TopButton from "@/components/map/topBar/topButton";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGear, faLayerGroup, faRoad, faTemperatureLow} from '@fortawesome/free-solid-svg-icons'
import ThemeSwitch from "@/components/themeSwitch";
import LayerWrapper from "@/components/map/topBar/options/layerWrapper";
import HeatMapWrapper from "@/components/map/topBar/options/heatMapWrapper";
import MapLabelsWrapper from "@/components/map/topBar/options/mapLabelsWrapper";
import React, {useState} from "react";

interface TopBarProps {
    username: string;
    picture: string;
    activitiesIdWithSportType: { id: number, sport_type: string }[];
}

const TopBar = ({username, picture, activitiesIdWithSportType}: TopBarProps) => {

    const [layerIsVisible, setLayerIsVisible] = useState(false);
    const [heatMapIsVisible, setHeatMapIsVisible] = useState(false);
    const [mapLabelIsVisible, setMapLabelIsVisible] = useState(false);

    return (
        <>
            <div
                className={'fixed glass z-50 left-80 right-0 h-14 px-3 border-b border-primary dark:border-primaryDark flex items-center justify-between'}>
                <span className={'h-full flex items-center'}>
                    <span className={'h-full flex items-center p-3'}>
                        <Image
                            className={'h-full w-auto object-cover rounded-full drop-shadow shadow-inner'}
                            src={picture}
                            alt={username}
                            width={64}
                            height={64}
                        />
                    </span>
                    <span className={'font-semibold'}>{username}</span>
                </span>
                <span className={'h-full flex items-center gap-2'}>
                    <TopButton label={<FontAwesomeIcon icon={faRoad}/>}
                               onClick={() => setMapLabelIsVisible(!mapLabelIsVisible)}/>
                    <TopButton label={<FontAwesomeIcon icon={faTemperatureLow}/>}
                               onClick={() => setHeatMapIsVisible(!heatMapIsVisible)}/>
                    <TopButton label={<FontAwesomeIcon icon={faLayerGroup}/>}
                               onClick={() => setLayerIsVisible(!layerIsVisible)}/>
                    <ThemeSwitch/>
                    <TopButton label={<FontAwesomeIcon icon={faGear}/>}/>
                </span>
            </div>
            <div className={'relative ml-80'}>
                <MapLabelsWrapper isVisible={mapLabelIsVisible} setIsVisible={setMapLabelIsVisible}/>
                <LayerWrapper activitiesIdWithSportType={activitiesIdWithSportType} setIsVisible={setLayerIsVisible}
                              isVisible={layerIsVisible}/>
                <HeatMapWrapper activitiesIdWithSportType={activitiesIdWithSportType} setIsVisible={setHeatMapIsVisible}
                                isVisible={heatMapIsVisible}/>
            </div>
        </>
    )
}

export default TopBar;