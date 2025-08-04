import React, {ReactNode} from "react";

interface OptionsItemProps {
    icon: ReactNode;
    label: string;
    image?: string;
    selected?: boolean;
    onClick: (event: React.MouseEvent) => void;
}

const OptionsItem = ({label, icon, selected, onClick}: OptionsItemProps) => {
    return (
        <div onClick={onClick} className={`w-64 h-12 rounded-full hover-glass hover-glass-hover pl-4 px-2.5 py-2 flex items-center justify-between ${selected ? 'gradient-border' : ''}`}>
            <div className={'flex items-center justify-center gap-2'}>
                {icon}
                <p>{label}</p>
            </div>
        </div>
    )
}

export default OptionsItem;