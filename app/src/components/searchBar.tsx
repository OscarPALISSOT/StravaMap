import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface SearchBarProps {
    placeholder: string;
}

const SearchBar = ({placeholder}: SearchBarProps) => {
    return (
        <div className={'px-2 py-1 rounded-md bg-primary dark:bg-primaryDark hover:bg-primaryHover dark:hover:bg-primaryDarkHover font-light flex items-center justify-center gap-2 focus-within:outline outline-blue-500'}>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
            <input
                type={'text'}
                className={'bg-transparent focus:outline-none'}
                placeholder={placeholder}
            />
        </div>
    )
}

export default SearchBar;