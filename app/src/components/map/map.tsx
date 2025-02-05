'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import {useEffect, useMemo, useRef} from "react";
import mapboxgl from 'mapbox-gl'
import StravaActivityType from "@/types/strava/stravaActivityType";
import {useTheme} from "next-themes";
import {useMap} from "@/components/contexts/mapContext";
import displayActivities from "@/modules/mapbox/displayActivity";
import updateLayerLight from "@/modules/mapbox/updateLayerLight";
import updateMapLabels from "@/modules/mapbox/updateMapLabels";

interface MapProps {
    activities: StravaActivityType[];
}

const Map = ({activities}: MapProps) => {

    const defaultLocation = useMemo(() => {
        return [2.333333, 48.866667] as [number, number]
    }, []);
    const mapContainerRef = useRef<HTMLDivElement>(null);

    const {resolvedTheme} = useTheme();
    const {map, setMap, mapOptions} = useMap();

    const mapOptionsRef = useRef(mapOptions);

    useEffect(() => {
        mapOptionsRef.current = mapOptions;
    }, [mapOptions]);

    useEffect(() => {

        if (map) return;
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

        const initMap = (lngLat: [number, number]) => {
            if (mapContainerRef.current) {
                const map = new mapboxgl.Map({
                    container: mapContainerRef.current,
                    zoom: 11,
                    maxZoom: 17,
                    center: [lngLat[0], lngLat[1]],
                    style: 'mapbox://styles/mapbox/standard'
                });

                map.addControl(new mapboxgl.NavigationControl(), "top-right");
                map.addControl(new mapboxgl.FullscreenControl());
                map.addControl(new mapboxgl.ScaleControl({
                    maxWidth: 250,
                    unit: 'metric',
                }))
                const geolocateControl = new mapboxgl.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true
                    },
                    trackUserLocation: true,
                    showUserHeading: true,
                    fitBoundsOptions: {
                        zoom: 11,
                        maxZoom: 17,
                    }
                })
                map.addControl(geolocateControl)

                map.on('style.load', () => {
                    map.addSource('mapbox', {
                        type: 'raster-dem',
                        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
                        tileSize: 512,
                        maxZoom: 17,
                    });
                    map.setTerrain({source: 'mapbox', exaggeration: 1});
                });

                map.on('style.load', () => {
                    activities.forEach(activity => {
                        displayActivities(map, activity, mapOptionsRef.current.gpxLayer);
                    })
                })

                map.on('style.load', () => {
                    if (resolvedTheme === 'dark' && mapOptionsRef.current.styleLayer.label === 'Standard') {
                        updateLayerLight('night', map)
                    }
                })

                map.on('style.load', () => {
                    updateMapLabels(mapOptionsRef.current, map);
                })

                map.on('load', () => {
                    geolocateControl.trigger();
                });

                setMap(map);
                return () => map.remove();
            }
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                e => {
                    initMap([e.coords.longitude, e.coords.latitude])
                },
                err => {
                    console.warn(`Error of geolocation : ${err.message}`);
                    initMap(defaultLocation);
                })
        } else {
            initMap(defaultLocation);
        }
    }, [map, resolvedTheme, defaultLocation, setMap, activities]);

    return (
        <>
            <div className={'h-full'} id='map-container' ref={mapContainerRef}/>
        </>
    )
}

export default Map;