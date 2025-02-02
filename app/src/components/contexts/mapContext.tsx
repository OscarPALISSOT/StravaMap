'use client';

import React, {createContext, useContext, useState} from 'react';
import mapboxgl from "mapbox-gl";
import mapOptionsType from "@/types/mapbox/mapOptionsType";

interface MapContextType {
    map: mapboxgl.Map | null;
    setMap: (map: mapboxgl.Map) => void;
    mapOptions: mapOptionsType;
    setMapOptions: (mapOptions: mapOptionsType) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [map, setMap] = useState<mapboxgl.Map | null>(null);
    const [mapOptions, setMapOptions] = useState<mapOptionsType>({
        gpxLayer: 'bySportType',
        styleLayer: {
            layer: 'mapbox://styles/mapbox/standard',
            label: 'Standard',
            preview: 'mapbox/streets-v12'
        }
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