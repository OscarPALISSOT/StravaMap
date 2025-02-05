'use client';

import React, {useEffect, useState} from "react";
import {useTheme} from "next-themes";
import Button from "@/components/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleHalfStroke} from "@fortawesome/free-solid-svg-icons";
import {useMap} from "@/components/contexts/mapContext";
import updateLayerLight from "@/modules/mapbox/updateLayerLight";

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
        if (map && resolvedTheme === "dark") {
            updateLayerLight('day', map)
        }
        if (map && resolvedTheme === "light") {
            updateLayerLight('night', map)
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