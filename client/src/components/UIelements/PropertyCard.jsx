import { FaBath, FaBed, FaCompress, FaRegBookmark } from 'react-icons/fa'
import propertyImage from '../../assets/images/property-image-test.png'

const PropertyCard = () => {
    return (
        <div className='border-2 p-3 my-1 rounded-lg bg-amber-50'>
            <div className=''>
                <img
                    src={propertyImage}
                    alt='Property Image'
                    className='rounded-lg object-cover aspect-square w-full' />
            </div>

            <div className='mt-4'>
                <div className='flex py-2 justify-between'>
                    <div className=''>
                        <h3>Property Title</h3>
                        <p>Property Address Here</p>
                    </div>

                    <button type='button' className='flex items-start gap-1'>
                        <FaRegBookmark className='text-sm'/>
                        <p className='text-xs'>Save</p>
                    </button>
                </div>

                <div className='border-t-2'>
                    <div className='flex items-center justify-around'>
                        <div className='flex items-center gap-2'><span className='text-orange-600'><FaBed /></span><span>3</span></div>
                        <div className='flex items-center gap-2'><span className='text-orange-600'><FaBath /></span><span>2</span></div>
                        <div className='flex items-center gap-2'><span className='text-orange-600'><FaCompress /></span><span>2</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertyCard