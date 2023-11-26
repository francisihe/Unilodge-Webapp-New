import { useEffect, useState } from "react";
import EditPropertyForm from "../components/forms/EditPropertyForm"
import { useParams } from "react-router-dom";


const EditProperty = () => {
    const [property, setProperty] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const params = useParams();
    const propertyId = params.propertyId;

    useEffect(() => {
        //window.scrollTo(0, 0);
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });

        const getProperty = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/v1/properties/${propertyId}`)
                const data = await res.json()
                setProperty(data);
                setLoading(false);
            } catch (error) {
                setError(error)
            }
        };

        getProperty();
    }, [propertyId]);

    return (
        <div className="mt-6 space-y-3">
            <h1 className="font-bold text-2xl">
                Edit Property
            </h1>
            <p> Please use the form below to edit an existing property.<br />
                Your are editing property <b>{property?.title}</b> with ID: <b>{propertyId}</b><br />
                Some fields are marked required.
            </p>

            {error && <p className="text-red-500">{error}</p>}

            {loading
                ? <p className="text-green-500">Loading...</p>
                : <EditPropertyForm property={property} />}
        </div>
    )
}

export default EditProperty