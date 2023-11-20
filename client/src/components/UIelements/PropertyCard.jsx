/* eslint-disable react/prop-types */
import { FaBath, FaBed, FaCompress } from 'react-icons/fa'
import { IoIosRadioButtonOn } from "react-icons/io";
import { MdCategory } from "react-icons/md";
import { RiLandscapeFill } from "react-icons/ri";
import propertyDefaultImage from '../../assets/images/property-image-test.png'

const PropertyCard = ({ property }) => {
    return (
        <div className='border-2 p-3 my-1 rounded-lg bg-amber-50'>
            <div className=''>
                <img
                    src={property.images ? property.images[0] : propertyDefaultImage}
                    alt='Property Image'
                    className='rounded-lg object-cover aspect-square w-full' />
            </div>

            <div className='mt-4'>
                <div className='flex py-2 justify-between'>
                    <div className=''>
                        <h3>{property.title}</h3>
                        <p>{property.address}</p>
                    </div>

                    {property.propertyStatus === 'taken'
                        ? (<span className='flex gap-1'><IoIosRadioButtonOn className='text-sm text-red-500' />
                                <div className='text-xs'>Taken</div></span>)
                        : (<span className='flex gap-1'><IoIosRadioButtonOn className='text-sm text-green-500' />
                                <div className='text-xs'>Available</div></span>)
                    }

                    {/* <button type='button' className='flex items-start gap-1'>
                        <IoIosRadioButtonOn className='text-sm text-orange-500' />
                        <p className='text-xs'>View Property</p>
                    </button> */}
                </div>

                <div className='border-t-2'>
                    <div className='flex items-center justify-around pt-2'>
                        {property.propertyType === 'house' ?
                            <>
                                <div className='flex items-center gap-2'><span className='text-orange-600'><FaBed /></span><span>{property.bedrooms}</span></div>
                                <div className='flex items-center gap-2'><span className='text-orange-600'><FaBath /></span><span>{property.bathrooms}</span></div>
                            </>
                            : ''}

                        {property.propertyType === 'land'
                            && <div className='flex items-center gap-2'><span className='text-orange-600'><RiLandscapeFill /></span><span>{property.propertyType}</span></div>
                        }

                        {property.propertyType === 'land'
                            && <div className='flex items-center gap-2'><span className='text-orange-600'><FaCompress /></span><span>{property.size}</span></div>
                        }

                        <div className='flex items-center gap-2'><span className='text-orange-600'><MdCategory /></span><span>{property.propertyCategory}</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertyCard