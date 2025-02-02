'use client';

import React, {useEffect, useState} from "react";
import {useTheme} from "next-themes";
import Button from "@/components/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleHalfStroke} from "@fortawesome/free-solid-svg-icons";
import {useMap} from "@/components/contexts/mapContext";

const ThemeSwitch = () => {

    const {resolvedTheme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false)
    const {map} = useMap();

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const toggleTheme = () => {
        setTheme(resolvedTheme === "light" ? "dark" : "light");
        if ((map && map.getStyle()?.name === "Mapbox Dark") && resolvedTheme === "dark") {
            map.setStyle('mapbox://styles/mapbox/standard')
        }
        if (resolvedTheme === "light" && map) {
            map.setStyle('mapbox://styles/mapbox/dark-v11')
        }
    };

    return (
        <Button
            label={<FontAwesomeIcon icon={faCircleHalfStroke}/>}
            onClick={toggleTheme}
        />
    )
}

export default ThemeSwitch;