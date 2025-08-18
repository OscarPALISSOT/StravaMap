import {ReactNode} from "react";

interface TopButtonProps {
    label: ReactNode;
    onClick?: () => void;
}

const TopButton = ({label, onClick}: TopButtonProps) => {
    return (
        <button
            className={'size-8 rounded-full hover-glass hover-glass-hover font-light'}
            onClick={onClick}
        >
            {label}
        </button>
    )
}

export default TopButton;