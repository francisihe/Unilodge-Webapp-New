/* eslint-disable react/prop-types */
import { FaBath, FaBed, FaCompress } from 'react-icons/fa'
import { IoIosRadioButtonOn } from "react-icons/io";
import { MdCategory } from "react-icons/md";
import { RiLandscapeFill } from "react-icons/ri";
import propertyDefaultImage from '../../assets/images/property-image-test.png'

const PropertyCard = ({ property }) => {
    return (
        <div className='border-2 p-3 my-1 rounded-lg bg-amber-50 flex flex-col justify-around transform transition-transform hover:scale-105 '>
            <div className=''>
                <img
                    src={property.images ? property.images[0] : propertyDefaultImage}
                    alt='Property Image'
                    className='rounded-lg object-cover aspect-square w-full' />
            </div>

            <div className='mt-4'>
                <div className='flex py-2 justify-between'>
                    <div className='truncate'>
                        <h3 className='overflow-ellipsis'>{property.title}</h3>
                        <p className='overflow-ellipsis'>{property.address}</p>
                    </div>

                    {property.propertyStatus === 'taken'
                        ? (<span className='flex gap-1'><IoIosRadioButtonOn className='text-sm text-red-500' />
                            <div className='text-xs'>Taken</div></span>)
                        : (<span className='flex gap-1'><IoIosRadioButtonOn className='text-sm text-green-500' />
                            <div className='text-xs'>Available</div></span>)
                    }

                </div>

                <div className='border-t-2'>
                    <div className='flex items-center justify-around pt-2'>
                        {property.propertyType === 'house' ?
                            <>
                                <div className='flex items-center gap-2'><span className='text-orange-600'><FaBed /></span><span>{`${property.bedrooms} ${property.bedrooms === 1 ? 'Bed' : 'Beds'}`}</span></div>
                                <div className='flex items-center gap-2'><span className='text-orange-600'><FaBath /></span><span>{`${property.bathrooms} ${property.bathrooms === 1 ? 'Bath' : 'Baths'}`}</span></div>
                            </>
                            : ''}

                        {property.propertyType === 'land'
                            && <div className='flex items-center gap-2'><span className='text-orange-600'><RiLandscapeFill /></span><span>Land</span></div>
                        }

                        {property.propertyType === 'land'
                            && <div className='flex items-center gap-2'><span className='text-orange-600'><FaCompress /></span><span>{property.size}</span></div>
                        }

                        {property.propertyCategory === 'rent'
                            && <div className='flex items-center gap-2'><span className='text-orange-600'><MdCategory /></span><span>Rent</span></div>
                            ||
                            property.propertyCategory === 'sale'
                            && <div className='flex items-center gap-2'><span className='text-orange-600'><MdCategory /></span><span>Sale</span></div>
                        }


                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertyCard