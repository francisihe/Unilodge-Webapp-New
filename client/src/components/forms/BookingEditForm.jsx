/* eslint-disable react/prop-types */
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";


const BookingEditForm = ({ selectedBooking, closeModal, openDeleteModal, updateBookings }) => {

    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const formatDate = (dateString) => {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const handleChange = (event) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [event.target.id]: event.target.value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true);
        const res = await fetch(`/api/v1/bookings/${selectedBooking._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json();

        // On update, refresh the user data on the users page
        await updateBookings();

        // // Check Error Handler
        if (data.success === false) {
            setError(data.message);
        }
        setLoading(false);
    };

    return (
        <div>

            <div className="flex items-center justify-between">
                <h1>Booking Update Form</h1>
                <button onClick={closeModal}>
                    <RxCross2
                        className="text-xl text-red-500"
                    />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="border-2 px-4 py-4 rounded-2xl flex flex-col my-4 space-y-3 md:mx-auto md:w-full lg:mx-auto lg:w-full ">
                <div>

                    <label className="text-xs text-orange-500 font-medium">Booking ID</label>
                    <input
                        type='text'
                        id='_id'
                        placeholder=''
                        defaultValue={selectedBooking?._id}
                        onChange={handleChange}
                        disabled
                    />

                    <label className="text-xs text-orange-500 font-medium">Client&#8217;s Firstname</label>
                    <input
                        type='text'
                        id='firstname'
                        placeholder='Francis'
                        defaultValue={selectedBooking?.firstname}
                        onChange={handleChange}
                    />

                    <label className="text-xs text-orange-500 font-medium">Client&#8217;s Lastname</label>
                    <input
                        type='text'
                        id='lastname'
                        placeholder='Ihejirika'
                        defaultValue={selectedBooking?.lastname}
                        onChange={handleChange}
                    />

                    <label className="text-xs text-orange-500 font-medium">Client&#8217;s Phone Number</label>
                    <input
                        type='text'
                        id='phone'
                        placeholder='08033223678'
                        defaultValue={selectedBooking?.phone}
                        onChange={handleChange}
                    />

                    <label className="text-xs text-orange-500 font-medium">Client&#8217;s Email Address</label>
                    <input
                        type='email'
                        id='email'
                        placeholder='francisdev@gmail.com'
                        defaultValue={selectedBooking?.email}
                        onChange={handleChange}
                    />

                    <label className="text-xs text-orange-500 font-medium">Inspection Date</label>
                    <input
                        type='text'
                        placeholder='date'
                        defaultValue={formatDate(selectedBooking?.inspectionDate)}
                        onChange={handleChange}
                        disabled
                    />

                    <label className="text-xs text-orange-500 font-medium pr-4">Select New Inspection Date</label>
                    <input
                        type='date'
                        id='inspectionDate'
                        placeholder='date'
                        onChange={handleChange}
                    />

                    <button
                        type='submit'
                        className="bg-green-700 text-white rounded-xl py-2 px-4 mt-3 w-full"
                    >
                        {loading ? 'Updating...' : 'Update Booking'}
                    </button>


                    <button
                        type='button'
                        onClick={openDeleteModal}
                        className="bg-red-500 text-white rounded-xl py-2 px-4 mt-3 w-full"
                    >
                        Delete Booking
                    </button>


                    {/* Error Message On Submission */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
            </form>
        </div>
    )
}

export default BookingEditForm