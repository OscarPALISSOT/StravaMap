import React, {ReactNode, useState} from "react";
import {useClickOutside} from "@/hooks/useClickOutside";
import Button from "@/components/button";
import OptionsWrapper from "@/components/map/topBar/optionsWrapper";

interface TopMenuProps {
    btnLabel: ReactNode;
    children: ReactNode;
}

const TopMenu = ({children, btnLabel}: TopMenuProps) => {

    const [isVisible, setIsVisible] = useState(false);

    const wrapperRef = useClickOutside(() => {
        setIsVisible(false)
    });
    return (
        <>
            <Button
                label={btnLabel}
                onClick={() => setIsVisible(!isVisible)}
            />
            <OptionsWrapper
                ref={wrapperRef}
                isVisible={isVisible}
            >
                {children}
            </OptionsWrapper>
        </>
    )
}

export default TopMenu;