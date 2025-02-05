'use client';

import TopMenu from "@/components/map/topBar/topMenu";
import {faRoad} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useMap} from "@/components/contexts/mapContext";
import MapOptionsType from "@/types/mapbox/mapOptionsType";
import {Dispatch, SetStateAction, useEffect} from "react";
import updateMapLabelsBaseMap from "@/modules/mapbox/updateMapLabelsBaseMap";

const MapLabelsSwitch = () => {

    const {mapOptions, setMapOptions, map} = useMap();

    const labels: {label: string, option: string}[] = [
        {label:"Rues", option: 'showPlaceLabels'},
        {label:"Points d'intérêt", option: 'showPOILabels'},
        {label:"Routes", option: 'showRoadLabels'},
        {label:"Transports", option: 'showTransitLabels'},
    ]


    useEffect(() => {
        if (map && mapOptions.styleLayer.label === 'Standard') {
            updateMapLabelsBaseMap(mapOptions, map)
        }
    }, [mapOptions, map]);


    return (
        <TopMenu btnLabel={<FontAwesomeIcon icon={faRoad} />}>
            <div className={'p-2'}>
                {labels.map((label, index) => (
                    <MapLabelSwitchWrapper label={label} setMapOptions={setMapOptions} key={index} />
                ))}
            </div>
        </TopMenu>
    )
}

interface MapLabelsSwitchWrapperProps {
    label: {label: string, option: string},
    setMapOptions: Dispatch<SetStateAction<MapOptionsType>>;
}

const MapLabelSwitchWrapper = ({label, setMapOptions}: MapLabelsSwitchWrapperProps) => {
    return (
        <div onClick={() => {
            setMapOptions((prevMapOptions: MapOptionsType) => ({
                ...prevMapOptions,
                [label.option as keyof MapOptionsType]: !prevMapOptions[label.option as keyof MapOptionsType],
            }));
        }}
        >
            <p>{label.label}</p>
        </div>
    )
}

export default MapLabelsSwitch;