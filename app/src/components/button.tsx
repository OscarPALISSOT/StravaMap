import {ReactNode} from "react";

interface ButtonProps {
    label: ReactNode;
    onClick?: () => void;
}

const Button = ({label, onClick}: ButtonProps) => {
    return (
        <button
            className={'px-2 py-1 rounded-md bg-primary hover:bg-primaryHover font-light'}
            onClick={onClick}
        >
            {label}
        </button>
    )
}

export default Button;