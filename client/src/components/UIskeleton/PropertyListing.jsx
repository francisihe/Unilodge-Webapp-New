import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import PropertyGallery from "../UIelements/PropertyGallery";
import PropertyHeader from "../UIelements/PropertyHeader";
import PropertyFeatures from "../UIelements/PropertyFeatures";
import PropertyPrice from "../UIelements/PropertyPrice";
import BookingForm from "../forms/BookingForm";
import { IoIosRadioButtonOn } from "react-icons/io";


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

          {/* Add Caretaker Details for Admins and Managers to view */}
        </div>

        {/* Property Booking Form */}
        <div id='booking-form' className="md:w-2/5">
          <BookingForm />
        </div>

      </div>

    </div>
  )
}

export default PropertyListing

// http://localhost:5173/property/6551664e94642d8704027979


// {
//   "_id": "6551664e94642d8704027979",
//   "title": "Form Hostel 2",
//   "description": "Hostel 2 desc",
//   "address": "BDPA",
//   "propertyType": "land",
//   "propertyModel": "hostel",
//   "propertyStatus": "taken",
//   "propertyCategory": "rent",
//   "regularPrice": 50000,
//   "discountedPrice": 40000,
//   "images": [
//       "https://firebasestorage.googleapis.com/v0/b/unilodge-webapp.appspot.com/o/1699833414462Screenshot%20from%202023-10-12%2017-12-09.png?alt=media&token=baef3049-2a64-4da3-8ab7-574d4c7e598f"
//   ],
//   "video": "",
//   "bedrooms": 1,
//   "bathrooms": 1,
//   "size": "",
//   "isFeatured": false,
//   "createdAt": "2023-11-12T23:57:02.109Z",
//   "updatedAt": "2023-11-12T23:57:02.109Z",
//   "__v": 0
// }