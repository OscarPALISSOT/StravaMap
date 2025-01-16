'use client';

import React, {useEffect, useState} from "react";
import {useTheme} from "next-themes";
import Button from "@/components/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleHalfStroke} from "@fortawesome/free-solid-svg-icons";

const ThemeSwitch = () => {

    const {resolvedTheme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const toggleTheme = () => {
        setTheme(resolvedTheme === "light" ? "dark" : "light");
    };

    return (
        <Button
            label={<FontAwesomeIcon icon={faCircleHalfStroke}/>}
            onClick={toggleTheme}
        />
    )
}

export default ThemeSwitch;