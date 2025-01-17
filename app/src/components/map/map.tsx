'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import {useEffect, useRef} from "react";
import mapboxgl from 'mapbox-gl'
import StravaActivityType from "@/types/strava/stravaActivityType";
import {useTheme} from "next-themes";
import {useMap} from "@/components/contexts/mapContext";
import displayActivities from "@/modules/mapbox/displayActivities";

interface MapProps {
    activities?: StravaActivityType[];
}

const Map = ({activities}: MapProps) => {

    const mapContainerRef = useRef<HTMLDivElement>(null);

    const {resolvedTheme} = useTheme();
    const {map, setMap} = useMap();

    useEffect(() => {

        if (map) return;
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

        const initMap = (lngLat: [number, number]) =>{
            if (mapContainerRef.current) {
                const map = new mapboxgl.Map({
                    container: mapContainerRef.current,
                    zoom: 10,
                    maxZoom: 17,
                    center: [lngLat[0], lngLat[1]],
                    style: 'mapbox://styles/mapbox/standard'
                });

                map.addControl(new mapboxgl.NavigationControl(), "top-right");

                map.on('style.load', () => {
                    map.addSource('mapbox', {
                        type: 'raster-dem',
                        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
                        tileSize: 512,
                        maxZoom: 17,
                    });
                    map.setTerrain({ source: 'mapbox', exaggeration: 1 });
                });
                if (activities){
                    map.on('style.load', () => {
                        displayActivities(map, activities)
                    })
                }
                if (resolvedTheme === 'dark'){
                    map.setStyle('mapbox://styles/mapbox/dark-v11')
                }
                setMap(map);
                return () => map.remove();
            }
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(e => {
                initMap([e.coords.longitude, e.coords.latitude])
            })
        } else {
            initMap([48.866667, 2.333333]);
        }
    }, []);

    return (
        <>
            <div className={'h-full'} id='map-container' ref={mapContainerRef}/>
        </>
    )
}

export default Map;