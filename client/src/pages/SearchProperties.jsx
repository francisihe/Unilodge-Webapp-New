import { useCallback, useEffect, useState } from "react";
import PropertySearchAndFilter from "../components/forms/PropertySearchAndFilter"
import PropertyCard from "../components/UIelements/PropertyCard";
import { Link, useLocation } from "react-router-dom";
import Pagination from "../components/UIelements/Pagination";
//import { useSelector } from "react-redux";


const SearchProperties = () => {
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(false);

    // Get Search Term from HeaderSearchBar form
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTermFromUrl = queryParams.get("searchTerm") || '';

    //Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 15;

    // Search and Filter States
    const [searchTerm, setSearchTerm] = useState(searchTermFromUrl || '');
    const [propertyType, setPropertyType] = useState('');
    const [propertyModel, setPropertyModel] = useState('');
    const [propertyStatus, setPropertyStatus] = useState('');
    const [propertyCategory, setPropertyCategory] = useState('');

    // Property Search is BE handled by the SearchProperties route only.
    // Filtering is also BE handled, not FE.
    const handleSearch = useCallback(async (searchParams) => {
        const { searchTerm, propertyType, propertyModel, propertyStatus, propertyCategory } = searchParams;
        setLoading(true);
        const res = await fetch(`/api/v1/properties/search?page=${currentPage}&limit=${limit}&searchTerm=${searchTerm}&propertyType=${propertyType}&propertyModel=${propertyModel}&propertyStatus=${propertyStatus}&propertyCategory=${propertyCategory}`)
        const data = await res.json()
        setProperties(data.properties);
        setTotalPages(Math.ceil(data.totalProperties / limit))
        setLoading(false);
    }, [currentPage, limit]);

    useEffect(() => {
        handleSearch({
            searchTerm: searchTermFromUrl || '',
            propertyType,
            propertyModel,
            propertyStatus,
            propertyCategory
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, handleSearch, searchTermFromUrl]);

    useEffect(() => {
        //Scroll to Top;
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }, [searchTerm]);


    const handleClearFilter = () => {
        setPropertyType('');
        setPropertyModel('');
        setPropertyStatus('');
        setPropertyCategory('');
    };

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
                onClear={handleClearFilter}
            />

            <h1 className="font-bold text-xl">Search Results:</h1>
            <p>Below are your search results.<br />
                You can further filter them using the options above</p>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {properties && properties.map((property) => (
                    <Link to={'/property/' + property._id} key={property._id}>
                        <PropertyCard
                            key={property._id}
                            property={property} />
                    </Link>
                ))}

                {!properties?.length && !loading &&
                    <b><p>No properties found</p></b>
                }
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

            <Link to='/properties'
                className="bg-orange-500 text-white text-center font-bold rounded-full py-2 px-4 mt-3 mx-auto w-72 md:w-80"
            >See All Properties
            </Link>
        </div>
    )
}

export default SearchProperties