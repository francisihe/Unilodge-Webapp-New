import { useEffect, useState } from "react";
import PropertySearchAndFilter from "../components/forms/PropertySearchAndFilter"
import PropertyCard from "../components/UIelements/PropertyCard";


const SearchProperties = () => {
    const [properties, setProperties] = useState([])

    const [searchTerm, setSearchTerm] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [propertyModel, setPropertyModel] = useState('');
    const [propertyStatus, setPropertyStatus] = useState('');
    const [propertyCategory, setPropertyCategory] = useState('');

    useEffect(() => {

        //Scroll to Top;
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }, [])

    const handleSearch = async (searchParams) => {
        const { searchTerm, propertyType, propertyModel, propertyStatus, propertyCategory } = searchParams;

        const res = await fetch(`/api/v1/properties/search?searchTerm=${searchTerm}&propertyType=${propertyType}&propertyModel=${propertyModel}&propertyStatus=${propertyStatus}&propertyCategory=${propertyCategory}`)
        const data = await res.json()
        setProperties(data)
    };

    return (
        <div className="flex flex-col my-4 space-y-3 lg:mx-auto lg:w-screen lg:max-w-screen-xl">
            <PropertySearchAndFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                propertyType={propertyType}
                setPropertyType={setPropertyType}
                propertyModel={propertyModel}
                setPropertyModel={setPropertyModel}
                propertyStatus={propertyStatus}
                setPropertyStatus={setPropertyStatus}
                propertyCategory={propertyCategory}
                setPropertyCategory={setPropertyCategory}
                onSearch={handleSearch}
            />

            <h1 className="font-bold text-xl">Search Results:</h1>
            <p>Below are your search results.<br /> 
            You can further filter them using the options above</p>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {properties && properties.map((property) => (
                    <PropertyCard
                        key={property._id}
                        property={property} />
                ))}
            </div>
        </div>
    )
}

export default SearchProperties