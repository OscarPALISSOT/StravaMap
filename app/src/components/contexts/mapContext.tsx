'use client';

import React, {createContext, useContext, useState} from 'react';
import mapboxgl from "mapbox-gl";
import gpxLayerType from "@/types/mapbox/gpxLayerType";

interface MapContextType {
    map: mapboxgl.Map | null;
    setMap: (map: mapboxgl.Map) => void;
    gpxLayer: gpxLayerType;
    setGpxLayer: (gpxLayer: gpxLayerType) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [map, setMap] = useState<mapboxgl.Map | null>(null);
    const [gpxLayer, setGpxLayer] = useState<gpxLayerType>('bySportType');

    return (
        <MapContext.Provider value={{map, setMap, gpxLayer, setGpxLayer}}>
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