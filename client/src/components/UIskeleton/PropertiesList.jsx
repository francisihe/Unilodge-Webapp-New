import { useEffect, useState } from "react"
import PropertyCard from "../UIelements/PropertyCard"
import { Link } from "react-router-dom";
import Pagination from "../UIelements/Pagination";


const PropertiesList = () => {
    const [properties, setProperties] = useState([])

    useEffect(() => {
        const getPropertiesfromAPI = async () => {
            const res = await fetch('/api/v1/properties/all')
            const data = await res.json()
            setProperties(data)
        };
        getPropertiesfromAPI();
    }, []);

    return (
        <div className="flex flex-col my-4 mx-auto lg:w-screen lg:max-w-screen-xl">
            <div className="h-24 md:h-32 border-2 rounded-xl">
                <p>Top Search Area</p>
            </div>

            <div >
                <p>Main area</p>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {properties &&
                        properties
                            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                            .map(property => (
                                <Link to={'/property/' + property._id} key={property._id}>
                                    <PropertyCard
                                        key={property.id}
                                        property={property} />
                                </Link>
                            ))
                    }
                </div>

            </div>
            <div className="flex justify-end py-2"><Pagination /></div>
        </div>
    )
}

export default PropertiesList