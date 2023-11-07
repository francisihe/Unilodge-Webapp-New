import { Link } from 'react-router-dom'
import PropertyCard from '../UIelements/PropertyCard.jsx'
import { Element } from 'react-scroll';

const FeaturedProperty = () => {
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
                    <Link to={'/property/' + PropertyCard._id}>
                        <PropertyCard />
                    </Link>

                    <PropertyCard />
                    <PropertyCard />
                    <PropertyCard />
                    <PropertyCard />
                    <PropertyCard />
                </div>

                <div className='text-center my-4 text-red-400 font-bold'>
                    <p>Add Pagination Here & Fix Save Button</p>
                </div>
            </Element>
        </div>
    )
}

export default FeaturedProperty