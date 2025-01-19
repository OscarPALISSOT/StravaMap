'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import {useEffect, useRef, useState} from "react";
import mapboxgl from 'mapbox-gl'
import StravaActivityType from "@/types/strava/stravaActivityType";
import polyline from '@mapbox/polyline';
import {GeoJSON} from "geojson";
import {useTheme} from "next-themes";
import {useMap} from "@/components/contexts/mapContext";

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
                    activities.forEach((activity) => {
                        if (activity.map.summary_polyline) {
                            const decodedPolyline = polyline.decode(activity.map.summary_polyline);
                            const geojson = {
                                type: 'Feature',
                                geometry: {
                                    type: 'LineString',
                                    coordinates: decodedPolyline.map(([lat, lng]) => [lng, lat]),
                                },
                            };

                            map.on('load', () => {
                                map.addSource(activity.id.toString(), {
                                    type: 'geojson',
                                    data: geojson as GeoJSON,
                                });

                                map.addLayer({
                                    id: activity.id.toString(),
                                    type: 'line',
                                    source: activity.id.toString(),
                                    layout: {
                                        'line-join': 'round',
                                        'line-cap': 'round',
                                    },
                                    paint: {
                                        'line-color': 'rgb(255,153,0)',
                                        'line-width': 3,
                                    },
                                });
                            });
                        }
                    });

                    if (resolvedTheme === 'dark'){
                        map.setStyle('mapbox://styles/mapbox/dark-v11')
                    }
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