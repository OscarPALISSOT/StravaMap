import React, {ReactNode, RefObject} from "react";

interface OptionsWrapperProps {
    ref: RefObject<HTMLDivElement | null>;
    isVisible: boolean;
    children: ReactNode;
}

const OptionsWrapper = ({ref, isVisible, children}: OptionsWrapperProps) => {
    return (
        <>
            {isVisible &&
                <div
                    ref={ref}
                    className={'absolute top-16 left-2 z-10 h-auto w-auto rounded-md bg-background dark:bg-text'}
                >
                    {children}
                </div>
            }
        </>
    )
}

export default OptionsWrapper;