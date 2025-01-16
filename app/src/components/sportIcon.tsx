import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBicycle,
    faPersonHiking,
    faPersonRunning,
    faPersonSkiing,
    faPersonSkiingNordic
} from "@fortawesome/free-solid-svg-icons";

interface SportIconProps {
    sport_type: string;
}

const SportIcon = ({sport_type}: SportIconProps) => {
    return (
        <div className={'h-10 w-10 text-lg rounded-full shrink-0 bg-primary dark:bg-primaryDark group-hover:bg-primaryHover dark:group-hover:bg-primaryDarkHover flex items-center justify-center'}>
            {sport_type === 'MountainBikeRide' && <FontAwesomeIcon icon={faBicycle} />}
            {sport_type === 'Run' && <FontAwesomeIcon icon={faPersonRunning} />}
            {sport_type === 'TrailRun' && <FontAwesomeIcon icon={faPersonRunning} />}
            {sport_type === 'Hike' && <FontAwesomeIcon icon={faPersonHiking} />}
            {sport_type === 'Ride' && <FontAwesomeIcon icon={faBicycle} />}
            {sport_type === 'AlpineSki' && <FontAwesomeIcon icon={faPersonSkiing} />}
            {sport_type === 'BackcountrySki' && <FontAwesomeIcon icon={faPersonSkiingNordic} />}
        </div>
    )
}

export default SportIcon;