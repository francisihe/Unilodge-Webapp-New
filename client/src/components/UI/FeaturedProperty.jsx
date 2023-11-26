import { Link } from 'react-router-dom'
import PropertyCard from '../UIelements/PropertyCard.jsx'
import { Element } from 'react-scroll';
import { useEffect, useState } from 'react';
import Pagination from '../UIelements/Pagination.jsx';

const FeaturedProperty = () => {
    const [featuredProperties, setFeaturedProperties] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 8;

    useEffect(() => {
        const getFeaturedProperties = async () => {
            const res = await fetch(`/api/v1/properties/featured?page=${currentPage}&limit=${limit}`)
            const data = await res.json()
            setFeaturedProperties(data.featuredProperties)
            setTotalPages(Math.ceil(data.totalFeaturedProperties / limit))
        };
        getFeaturedProperties();
    }, [currentPage]);

    const handleNextPage = () => {
        console.log('next clicked')
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        console.log('prev clicked')
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className='mx-auto lg:w-screen lg:max-w-screen-xl'>
            <Element name='featured-properties'>
                <div className='flex justify-between items-baseline pb-6'>
                    <div className='pr-4'>
                        <h2 className='text-3xl py-2 leading-tight flex-wrap'>Featured Properties</h2>
                        <p className='text-md pb-2 -mr-28'>Some featured and recently uploaded properties</p>
                    </div>

                    <Link to='/properties'><button className='bg-orange-400 py-2 px-3 rounded-md font-medium mr-4 md:mb-2 shadow-lg hover:scale-110 transition-transform whitespace-nowrap'>View All Properties</button></Link>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>

                    {featuredProperties &&
                        featuredProperties
                            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                            .map(property => (
                                <Link to={'/property/' + property._id} key={property._id}>
                                    <PropertyCard property={property} />
                                </Link>
                            ))
                    }

                </div>

            </Element>
            <div className='flex items-center gap-2 justify-end'>


                {currentPage === totalPages
                    ? <div>
                        <Link to='/properties'
                            className="bg-orange-500 text-white rounded-full py-1 px-4 mt-3 w-full"
                        >See All Properties
                        </Link>
                    </div>
                    : ''
                }

                <div className="flex justify-end py-2">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onClickNextPage={handleNextPage}
                        onClickPrevPage={handlePrevPage}
                    />
                </div>

            </div>

        </div>
    )
}

export default FeaturedProperty