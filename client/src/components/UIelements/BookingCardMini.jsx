/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import unilodgePoster from '../../assets/images/unilodge-poster.jpg'

const BookingCardMini = ({ booking }) => {

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
                        <p className="mb-2"><b>Inspection Date:</b> {formatDate(booking.inspectionDate)}</p>
                        <p className="text-sm"><b>Booking ID:</b> {booking._id}</p>
                        <p className="text-sm"><b>Property Ref:</b> {booking.propertyRef}</p>
                    </div>

                    {/* View Property Button */}
                    <Link to={`/property/${booking.propertyRef}`}>
                        <button
                            type='button'
                            className="bg-orange-500 text-white text-sm rounded-full py-1 px-3 hover:bg-orange-600 transition duration-300"
                        >
                            View Property
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default BookingCardMini