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
        <div className={'w-full px-2.5 py-2 rounded-full hover-glass font-light flex items-center justify-center gap-2 focus-within:gradient-border  outline-blue-500'}>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
            <input
                value={value}
                type={'text'}
                className={'bg-transparent focus:outline-none w-full placeholder:text-text'}
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