import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import PropertyGallery from "../UIelements/PropertyGallery";
import PropertyHeader from "../UIelements/PropertyHeader";
import PropertyFeatures from "../UIelements/PropertyFeatures";
import PropertyPrice from "../UIelements/PropertyPrice";
import BookingForm from "../forms/BookingForm";


const PropertyListing = () => {
  const params = useParams();
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
        console.log(data)
      } catch (error) {
        setError(error)
      }

    }
    getProperty();

  }, [params.propertyId])

  return (
    <div className="mx-auto lg:max-w-screen-xl lg:pt-8">

      {/* Header for Tablet and Large screens, Hidden on Mobile */}
      <div className="hidden md:block">
        <PropertyHeader property={property} error={error} />
      </div>

      <div className="pt-10 md:pt-0"><PropertyGallery property={property} /></div>
      <p className="text-sm">Property ID: {property._id}</p>

      {/* Header for Mobile screens, hidden on Large screens */}
      <div className="block md:hidden">
        <PropertyHeader property={property} error={error} />
      </div>

      {/* Property Details */}
      <div className="space-y-2 md:space-y-0 md:grid grid-cols-2 md:gap-3 md:pt-4">
        <PropertyFeatures property={property} />
        <PropertyPrice property={property} />
      </div>

      <p className="text-lg font-semibold py-3 tracking-wider">Property Description</p>
      {property.description}

      {/* Add Caretaker Details for Admins and Managers to view */}

      <div id='booking-form'>
        Booking Form
        <BookingForm />
      </div>
    </div>
  )
}

export default PropertyListing

// http://localhost:5173/property/6551664e94642d8704027979