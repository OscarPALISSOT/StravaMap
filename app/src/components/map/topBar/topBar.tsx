import Image from "next/image";
import Button from "@/components/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGear} from '@fortawesome/free-solid-svg-icons'
import ThemeSwitch from "@/components/themeSwitch";
import LayerSwitch from "@/components/map/layerSwitch";

interface TopBarProps {
    username: string;
    picture: string;
}

const TopBar = ({username, picture}: TopBarProps) => {
    return (
        <div
            className={'h-14 px-3 w-full border-b border-text dark:border-background flex items-center justify-between'}>
            <span className={'h-full flex items-center'}>
                <span className={'h-full flex items-center p-3'}>
                <Image
                    className={'h-full w-auto object-cover rounded-full'}
                    src={picture}
                    alt={username}
                    width={64}
                    height={64}
                />
                </span>
                <span className={'font-semibold'}>{username}</span>
            </span>
            <span className={'h-full flex items-center gap-2'}>
                <LayerSwitch/>
                <ThemeSwitch/>
                <Button label={<FontAwesomeIcon icon={faGear} />}/>
            </span>
        </div>
    )
}

export default TopBar;