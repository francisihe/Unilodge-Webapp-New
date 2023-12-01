/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import unilodgePoster from '../../assets/images/unilodge-poster.jpg'
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { LiaUserEditSolid } from "react-icons/lia";

const BookingCardMaxi = ({ booking }) => {
    const [viewClient, setViewClient] = useState(false);

    const formatDate = (dateString) => {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md p-4">
            <div className="flex gap-4 items-center">
                <div>
                    <img
                        src={unilodgePoster}
                        alt='Thumbnail image'
                        className="w-full h-24 object-cover mb-4 rounded-md"
                    />
                </div>
                <div className="flex flex-col space-y-4">
                    <div>
                        <p className="text-sm mb-2"><b>Inspection Date:</b> {formatDate(booking.inspectionDate)}</p>
                        {
                            viewClient && (
                                <div className="my-3">
                                    <p className="text-sm"><b>Client Name:</b> {booking.firstname} {booking.lastname}</p>
                                    <p className="text-sm"><b>Phone Number:</b> {booking.phone}</p>
                                    <p className="text-sm"><b>Email:</b> {booking.email}</p>
                                </div>
                            )
                        }
                        <p className="text-sm"><b>Booking ID:</b> {booking._id}</p>
                        <p className="text-sm"><b>Property Ref:</b> {booking.propertyRef}</p>
                    </div>

                    <div className="flex gap-2 -mr-3">
                        {/* View Client Button */}
                        <button
                            type='button'
                            onClick={() => setViewClient(!viewClient)}
                            className="bg-green-700 text-white text-sm rounded-full py-1 px-3 hover:bg-orange-600 transition duration-300"
                        >
                            {viewClient ? 'Hide Client' : 'View Client'}
                        </button>

                        {/* View Property Button */}
                        <Link to={`/property/${booking.propertyRef}`} target="_blank" rel="noopener noreferrer">
                            <button
                                type='button'
                                className="bg-orange-500 text-white text-sm rounded-full py-1 px-3 hover:bg-orange-600 transition duration-300"
                            >
                                View Property
                            </button>
                        </Link>
                    </div>

                    <div className="flex gap-2 justify-end">
                        <button
                            type='button'
                        // onClick={openEditModal}
                        >
                            <LiaUserEditSolid className="h-6 w-6" />
                        </button>

                        <button
                            type='button'
                        // onClick={openDeleteModal}
                        >
                            <AiFillDelete className="h-6 w-6 text-red-500" />
                        </button>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default BookingCardMaxi