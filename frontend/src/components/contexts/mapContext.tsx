'use client';

import React, {createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState} from 'react';
import mapboxgl from "mapbox-gl";
import MapOptionsType from "@/types/mapbox/mapOptionsType";

interface MapContextType {
    map: mapboxgl.Map | null;
    setMap: (map: mapboxgl.Map) => void;
    mapOptions: MapOptionsType;
    setMapOptions: Dispatch<SetStateAction<MapOptionsType>>;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [map, setMap] = useState<mapboxgl.Map | null>(null);
    const [mapOptions, setMapOptions] = useState<MapOptionsType>({
        gpxLayer: 'bySportType',
        styleLayer: {
            layer: 'mapbox://styles/mapbox/standard',
            label: 'Standard',
            preview: 'mapbox/streets-v12'
        },
        showPOILabels: true,
        showPlaceLabels: true,
        showRoadLabels: true,
        showTransitLabels: true,
    })

    return (
        <MapContext.Provider value={{map, setMap, mapOptions, setMapOptions}}>
            {children}
        </MapContext.Provider>
    );
};

export const useMap = () => {
    const context = useContext(MapContext);
    if (!context) {
        throw new Error("useMap must be used within a MapProvider");
    }
    return context;
};