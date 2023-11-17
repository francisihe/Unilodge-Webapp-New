import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


const BookingForm = () => {
    const { currentUser } = useSelector(state => state.user)
    const params = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        firstname: '' || currentUser.firstname,
        lastname: '' || currentUser.lastname,
        userRef: '' || currentUser._id,
        propertyRef: params.propertyId,
        phone: '',
        email: '' || currentUser.email,
        inspectionDate: '',
    });

    // Get the current date in the format YYYY-MM-DD
    // This is to prevent selection of a date before current date in the date input field
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        });
        console.log(formData)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            setLoading(true);

            const res = await fetch('/api/v1/bookings/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            setLoading(false);

            if (data.success === false) {
                setError(data.message);
            }
            (console.log('Booking successful', data))
            navigate(`/profile/bookings`)
        } catch (error) {
            setError(error)
            setLoading(false);
        }
    };

    return (
        <div>
            <p className="text-lg font-semibold py-3 tracking-wider">Booking Form</p>
            <p className="text-sm pb-6">Kindly fill the form below with your details and a preferred date for inspection of this property.
                A member of our team will contact you to confirm your booking as well as the inspection date and fee.
            </p>

            <form onSubmit={handleSubmit} className="border-2 px-4 py-2 rounded-xl">
                <div>
                    <div className="flex gap-2">
                        <div>
                            <label className="text-xs text-orange-500 font-medium">Firstname</label>
                            <input
                                type='text'
                                id='firstname'
                                placeholder='Francis'
                                value={formData.firstname}
                                onChange={handleChange}
                                required={true}
                            /></div>

                        <div>
                            <label className="text-xs text-orange-500 font-medium">Lastname</label>
                            <input
                                type='text'
                                id='lastname'
                                placeholder='Ihejirika'
                                value={formData.lastname}
                                onChange={handleChange}
                                required={true}
                            /></div>
                    </div>

                    <label className="text-xs text-orange-500 font-medium">Your Phone Number</label>
                    <input
                        type='text'
                        id='phone'
                        placeholder='0803 123 4567'
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <label className="text-xs text-orange-500 font-medium">Your Email Address</label>
                    <input
                        type='email'
                        id='email'
                        placeholder='francisdev@gmail.com'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label className="text-xs text-orange-500 font-medium">Inspection Date</label>
                    <div className="border-2 rounded-2xl p-1 items-center text-center">
                        <input
                            type='date'
                            id='inspectionDate'
                            value={formData.inspectionDate}
                            onChange={handleChange}
                            min={getCurrentDate()}
                            required
                        />
                    </div>

                    <button
                        type='submit'
                        className="bg-orange-500 text-white rounded-xl py-2 px-4 mt-3 w-full"
                    >
                        {loading ? 'Booking...' : 'Book Date'}
                    </button>

                    {/* Error Message On Submission */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                </div>
            </form>
        </div>
    )
}

export default BookingForm