/* eslint-disable react/prop-types */
import { FaBath, FaBed, FaCompress } from 'react-icons/fa'
import { IoIosRadioButtonOn } from "react-icons/io";
import { MdCategory } from "react-icons/md";
import { RiLandscapeFill } from "react-icons/ri";
import unilodgePoster from '../../assets/images/unilodge-poster.jpg'
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';



const PropertyCardMini = ({ property, openDeleteModal }) => {

    return (

        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex gap-4 items-center ">
                <div className='w-28 flex-shrink-0'>
                    <img
                        src={property.images && property.images.length > 0 ? property.images[0] : unilodgePoster}
                        alt='Property Image'
                        className="w-full h-24 object-cover mb-4 rounded-md"
                    />
                </div>

                <div className="flex flex-col space-y-4 w-full">
                    <div className='flex py-2 justify-between'>
                        <div className='truncate pr-2 w-56 wrap'>
                            <h3 className='truncate overflow-ellipsis'>{property.title}</h3>
                            <p className='truncate overflow-ellipsis'>{property.address}</p>
                        </div>

                        {property.propertyStatus === 'taken'
                            ? (<span className='flex gap-1'><IoIosRadioButtonOn className='text-sm text-red-500' />
                                <div className='text-xs'>Taken</div></span>)
                            : (<span className='flex gap-1'><IoIosRadioButtonOn className='text-sm text-green-500' />
                                <div className='text-xs'>Available</div></span>)
                        }

                    </div>

                    <div className='border-t-2 pb-2'>
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

            <div className="flex gap-2 justify-start border-t-2">
                <Link to={'/property/' + property._id} target='_blank' rel='noreferrer' >
                    <button
                        type='button'
                        className='bg-orange-400 rounded-lg px-2 mt-2'
                    >
                        View
                        {/* <FiEdit className="h-6 w-6" /> */}
                    </button>
                </Link>

                <Link to={'/edit-property/' + property._id} target='_blank' rel='noreferrer' >
                    <button
                        type='button'
                        className='bg-green-600 rounded-lg px-2 mt-2'
                    >
                        Edit
                        {/* <FiEdit className="h-6 w-6" /> */}
                    </button>
                </Link>

                <button
                    type='button'
                    onClick={openDeleteModal}
                    className='mt-2'
                >
                    <AiFillDelete className="h-6 w-6 text-red-500" />
                </button>
            </div>
        </div >

    )
}

export default PropertyCardMini