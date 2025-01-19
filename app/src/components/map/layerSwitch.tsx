'use client';

import {useMap} from "@/components/contexts/mapContext";
import Button from "@/components/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLayerGroup} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import {useClickOutside} from "@/hooks/useClickOutside";
import OptionsWrapper from "@/components/map/topBar/optionsWrapper";
import getPreviewStylesUrl from "@/modules/mapbox/getMapPreviewStylesUrl";
import Image from "next/image";
import StyleLayerType from "@/types/mapbox/styleLayerType";

const LayerSwitch = () => {
    const [isVisible, setIsVisible] = useState(false);

    const wrapperRef = useClickOutside(() => {
        setIsVisible(false)
    });

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
    }, {layer: 'mapbox://styles/mapbox/dark-v11', label: 'Dark', preview: 'mapbox/dark-v11'}]

    return (
        <>
            <Button
                label={<FontAwesomeIcon icon={faLayerGroup}/>}
                onClick={() => setIsVisible(!isVisible)}
            />
            <OptionsWrapper
                ref={wrapperRef}
                isVisible={isVisible}
            >
                <div className={'w-full h-full p-2 flex gap-2 flex-wrap'}>
                    {layers.map((layer, index) => (
                        <LayerWrapper layer={layer} key={index}/>
                    ))}
                </div>
            </OptionsWrapper>
        </>

    )
}

interface LayerWrapperProps {
    layer: StyleLayerType;
}

const LayerWrapper = ({layer}: LayerWrapperProps) => {

    const {map} = useMap();
    const defaultCoords = {lon: 2.3522, lat: 48.8566};
    const [coords, setCoords] = useState(defaultCoords);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;
                    setCoords({lat: latitude, lon: longitude});
                },
                () => {
                    console.warn("Unable to access geolocation. Default coordinates used.");
                    setCoords(defaultCoords);
                }
            );
        } else {
            console.warn("Geolocation is not supported!");
            setCoords(defaultCoords);
        }
    }, []);

    return (
        <div
            className={'w-[calc(50%_-_0.25rem)] rounded-md h-40 border-2 border-text dark:border-background overflow-hidden cursor-pointer relative hover:border-blue-500 dark:hover:border-blue-500'}
            onClick={() => {
                if (!map) return;
                map.setStyle(layer.layer)
            }}
        >
            <Image
                className={'w-full h-full object-cover rounded-md'}
                src={getPreviewStylesUrl(layer.preview, coords.lon, coords.lat)}
                alt={layer.label}
                width={300}
                height={300}
            />
            <div className={'absolute bottom-0 left-0 w-full font-extralight flex justify-center bg-background dark:bg-text'}>{layer.label}</div>
        </div>
    )
}

export default LayerSwitch;