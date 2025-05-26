'use client';

import TopMenu from "@/components/map/topBar/topMenu";
import {faRoad} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useMap} from "@/components/contexts/mapContext";
import MapOptionsType from "@/types/mapbox/mapOptionsType";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import updateMapLabelsBaseMap from "@/modules/mapbox/updateMapLabelsBaseMap";

const MapLabelsSwitch = () => {

    const {mapOptions, setMapOptions, map, styleLoaded} = useMap();

    const labels: { label: string, option: string }[] = [
        {label: "Rues", option: 'showPlaceLabels'},
        {label: "Points d'intérêt", option: 'showPOILabels'},
        {label: "Routes", option: 'showRoadLabels'},
        {label: "Transports", option: 'showTransitLabels'},
    ]


    useEffect(() => {
        if (!styleLoaded) return;

        if (map && mapOptions.styleLayer.label === 'Standard') {
            updateMapLabelsBaseMap(mapOptions, map);
        }
        // } else if (map) {
        //     updateMapLabels(mapOptions, map);
        // }
    }, [mapOptions, map, styleLoaded]);


    return (
        <span className={`${mapOptions.styleLayer.label !== 'Standard' && 'hidden'}`}>
            <TopMenu btnLabel={<FontAwesomeIcon icon={faRoad}/>}>
                <div className={'p-2'}>
                    {labels.map((label, index) => (
                        <MapLabelSwitchWrapper label={label} setMapOptions={setMapOptions} mapOptions={mapOptions}
                                               key={index}/>
                    ))}
                </div>
            </TopMenu>
        </span>
    )
}

interface MapLabelsSwitchWrapperProps {
    label: { label: string, option: string },
    setMapOptions: Dispatch<SetStateAction<MapOptionsType>>;
    mapOptions: MapOptionsType;
}

const MapLabelSwitchWrapper = ({label, setMapOptions, mapOptions}: MapLabelsSwitchWrapperProps) => {

    const [active, setActive] = useState<boolean>(() => {
        const optionKey = label.option as keyof MapOptionsType;
        if (typeof mapOptions[optionKey] === 'boolean') {
            return mapOptions[optionKey];
        }
        return false;
    });

    useEffect(() => {
        setActive(() => {
            const optionKey = label.option as keyof MapOptionsType;
            if (typeof mapOptions[optionKey] === 'boolean') {
                return mapOptions[optionKey];
            }
            return false;
        })
    }, [mapOptions, label.option]);

    useEffect(() => {
        setMapOptions((prevMapOptions: MapOptionsType) => ({
            ...prevMapOptions,
            [label.option as keyof MapOptionsType]: !prevMapOptions[label.option as keyof MapOptionsType],
        }));
    }, [active, label.option, setMapOptions]);

    return (
        <div className={'flex flex-row gap-3 items-center'}>
            <input
                className={'cursor-pointer'}
                onChange={() => {
                    setActive(!active);
                }}
                type={'checkbox'}
                checked={active}
            />
            <p>{label.label}</p>
        </div>
    )
}

export default MapLabelsSwitch;