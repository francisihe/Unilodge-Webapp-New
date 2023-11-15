
// "_id": "6551651feabdfefba2540501",
//         "title": "Property from Form",
//         "description": "Property Description from Form",
//         "address": "BDPA, Benin City",
//         "propertyType": "house",
//         "propertyModel": "hostel",
//         "propertyStatus": "available",
//         "propertyCategory": "sale",
//         "regularPrice": 50000,
//         "discountedPrice": 40000,
//         "images": [
//             "https://firebasestorage.googleapis.com/v0/b/unilodge-webapp.appspot.com/o/1699832743679Screenshot%20from%202023-11-10%2017-23-18.png?alt=media&token=5b551619-34a7-4e47-828f-786c9513451e",
//             "https://firebasestorage.googleapis.com/v0/b/unilodge-webapp.appspot.com/o/1699832759909Screenshot%20from%202023-11-10%2017-31-11.png?alt=media&token=ce12651c-a577-4ba1-9401-6a7cb5f9ef7e"
//         ],
//         "video": "instagram link",
//         "bedrooms": 1,
//         "bathrooms": 1,
//         "size": "",
//         "isFeatured": false,
//         "createdAt": "2023-11-12T23:51:59.333Z",
//         "updatedAt": "2023-11-12T23:51:59.333Z",

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";


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
    <div>
      PropertyListing

      <p>Property ID: {property._id}</p>
      <p>{property.title}</p>
      
    <p>{error}</p>
    </div>
  )
}

export default PropertyListing

// http://localhost:5173/property/6551664e94642d8704027979