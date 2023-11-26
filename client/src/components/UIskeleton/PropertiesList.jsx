import { useEffect, useState } from "react"
import PropertyCard from "../UIelements/PropertyCard"
import { Link } from "react-router-dom";
import Pagination from "../UIelements/Pagination";
import PropertyListFilterForm from "../forms/PropertyListFilterForm";


const PropertiesList = () => {
    const [properties, setProperties] = useState([])
    const [filteredProperties, setFilteredProperties] = useState([])
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 15;

    // State for filtering the properties from the PropertyListFilterform
    const [propertyType, setPropertyType] = useState('');
    const [propertyModel, setPropertyModel] = useState('');
    const [propertyStatus, setPropertyStatus] = useState('');
    const [propertyCategory, setPropertyCategory] = useState('');


    useEffect(() => {
        const getPropertiesfromAPI = async () => {
            setLoading(true);
            const res = await fetch(`/api/v1/properties/all?page=${currentPage}&limit=${limit}`)
            const data = await res.json()
            setProperties(data.properties)
            setFilteredProperties(data.properties)
            setTotalPages(Math.ceil(data.totalProperties / limit))
            setLoading(false);
        };
        getPropertiesfromAPI();
    }, [currentPage, totalPages]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleFilter = ({ propertyType, propertyModel, propertyStatus, propertyCategory }) => {
        // Apply filters to the original properties and update the filteredProperties state
        const filtered = properties.filter((property) => {
          return (
            (!propertyType || property.propertyType === propertyType) &&
            (!propertyModel || property.propertyModel === propertyModel) &&
            (!propertyStatus || property.propertyStatus === propertyStatus) &&
            (!propertyCategory || property.propertyCategory === propertyCategory)
          );
        });
    
        setFilteredProperties(filtered);
        setCurrentPage(1);
      };

    const handleClearFilter = () => {
        setFilteredProperties(properties);
    };

    return (
        <div className="space-y-2">
            
            <PropertyListFilterForm 
                propertyType={propertyType}
                setPropertyType={setPropertyType}
                propertyModel={propertyModel}
                setPropertyModel={setPropertyModel}
                propertyStatus={propertyStatus}
                setPropertyStatus={setPropertyStatus}
                propertyCategory={propertyCategory}
                setPropertyCategory={setPropertyCategory}
                onFilter={handleFilter}
                onClear={handleClearFilter}
            />

            <div >
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredProperties &&
                        filteredProperties
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
            <div className="flex justify-end py-2">
                {loading
                    ? ''
                    : <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onClickNextPage={handleNextPage}
                        onClickPrevPage={handlePrevPage}
                    />
                }

            </div>
        </div>
    )
}

export default PropertiesList