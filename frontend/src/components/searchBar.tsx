import {faCircleXmark, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface SearchBarProps {
    placeholder: string;
    setSearchValue: (value: string) => void;
    value: string;
    setValue: (value: string) => void;
}

const SearchBar = ({placeholder, setSearchValue, value, setValue}: SearchBarProps) => {
    return (
        <div className={'px-2 py-1 rounded-md bg-primary dark:bg-primaryDark hover:bg-primaryHover dark:hover:bg-primaryDarkHover font-light flex items-center justify-center gap-2 focus-within:outline w-full outline-blue-500'}>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
            <input
                value={value}
                type={'text'}
                className={'bg-transparent focus:outline-none w-full'}
                placeholder={placeholder}
                onChange={(e) => {
                    setSearchValue(e.target.value)
                    setValue(e.target.value)
                }}
            />
            {value.length > 0 &&
                <FontAwesomeIcon
                    onClick={ () => {
                        setValue('')
                        setSearchValue('')
                    }}
                    icon={faCircleXmark} />
            }
        </div>
    )
}

export default SearchBar;