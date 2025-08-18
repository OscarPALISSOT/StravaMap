import React, {ReactNode} from "react";
import {useClickOutside} from "@/hooks/useClickOutside";

interface OptionsWrapperProps {
    isVisible: boolean;
    setIsVisible: (visible: boolean) => void;
    children: ReactNode;
}

const OptionsWrapper = ({isVisible, setIsVisible, children}: OptionsWrapperProps) => {

    const wrapperRef = useClickOutside(() => {
        setIsVisible(false)
    });

    return (
        <>
            {isVisible &&
                <div
                    ref={wrapperRef}
                    className={'floating-glass absolute top-20 left-6 z-50 h-auto w-auto rounded-3xl p-4 flex flex-col gap-2'}
                >
                    {children}
                </div>
            }
        </>
    )
}

export default OptionsWrapper;