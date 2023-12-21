import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import PropertyGallery from "../UIelements/PropertyGallery";
import PropertyHeader from "../UIelements/PropertyHeader";
import PropertyFeatures from "../UIelements/PropertyFeatures";
import PropertyPrice from "../UIelements/PropertyPrice";
import BookingForm from "../forms/BookingForm";
import { IoIosRadioButtonOn } from "react-icons/io";
import { useSelector } from "react-redux";


const PropertyListing = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user)
  const [property, setProperty] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    //window.scrollTo(0, 0);
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });

    const getProperty = async () => {
      try {
        const res = await fetch(`/api/v1/properties/${params.propertyId}`)
        const data = await res.json()
        setProperty(data);
      } catch (error) {
        setError(error)
      }

    }
    getProperty();

  }, [params.propertyId])

  const handleEditProperty = () => {
    if (params.propertyId) {
      navigate(`/edit-property/${params.propertyId}`)
    } else {
      alert('No property ID')
      console.log('No property ID')
    }
  };

  return (
    <div className="flex flex-col my-4 space-y-3 lg:mx-auto lg:w-screen lg:max-w-screen-xl">

      {/* Header for Tablet and Large screens, Hidden on Mobile */}
      <div className="hidden md:block">
        <PropertyHeader property={property} error={error} />
      </div>

      <div className="pt-10 md:pt-0"><PropertyGallery property={property} /></div>
      <div className="flex items-center justify-between">
        <p className="text-sm">Property ID: {property._id}</p>
        <div>{property.propertyStatus === 'taken'
          ? (<span className='flex gap-1 items-center'><IoIosRadioButtonOn className='text-sm text-red-500' />
            <div className='text-xs'>Taken</div></span>)
          : (<span className='flex gap-1 items-center'><IoIosRadioButtonOn className='text-sm text-green-500' />
            <div className='text-xs'>Available</div></span>)
        }</div>
      </div>

      {/* Header for Mobile screens, hidden on Large screens */}
      <div className="block md:hidden">
        <PropertyHeader property={property} error={error} />
      </div>

      {/* Property Details */}
      <div className="space-y-2 md:space-y-0 md:grid grid-cols-2 md:gap-3 md:pt-4">
        <PropertyFeatures property={property} />
        <PropertyPrice property={property} />
      </div>

      <div className="flex flex-col space-y-10 md:space-y-0 md:gap-6 md:flex-row">
        {/* Property Description */}
        <div className="md:w-3/5">
          <p className="text-lg font-semibold py-3 tracking-wider">Property Description</p>
          {property.description}
        </div>

        {/* Property Booking Form */}
        <div id='booking-form' className="md:w-2/5">
          <BookingForm />
        </div>

      </div>

      <div>
        {/* Add Caretaker Details for Admins and Managers to view */}

        {/* Edit Property Button */}
        <div className="flex justify-center my-4">
          {currentUser && currentUser?.role === 'admin' || currentUser?.role === 'manager'
            ? <button
              type='button'
              className="bg-orange-500 text-white rounded-xl py-2 px-4 mt-3 w-3/6"
              onClick={handleEditProperty}
            > Edit Property </button>
            : ''}
        </div>

      </div>

    </div>
  )
}

export default PropertyListing