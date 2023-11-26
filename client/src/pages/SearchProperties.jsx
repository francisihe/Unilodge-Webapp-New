import { useEffect } from "react";
import PropertySearchAndFilter from "../components/forms/PropertySearchAndFilter"


const SearchProperties = () => {

    useEffect(() => {
        //Scroll to Top;
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }, [])

    return (
        <div className="flex flex-col my-4 space-y-3 lg:mx-auto lg:w-screen lg:max-w-screen-xl">
            <PropertySearchAndFilter />
            SearchProperties Page
        </div>
    )
}

export default SearchProperties