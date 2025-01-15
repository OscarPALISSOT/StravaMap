import SearchBar from "@/components/searchBar";

const SideNav = () => {
    return (
        <div className={'h-screen w-80 min-w-60 border-r border-text dark:border-background max-w-96'}>
            <span className={'h-14 flex items-center justify-center'}>
                <SearchBar placeholder={'Rechercher une activité'}/>
            </span>
        </div>
    )
}

export default SideNav;