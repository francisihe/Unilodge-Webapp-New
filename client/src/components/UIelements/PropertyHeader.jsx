/* eslint-disable react/prop-types */
import { FaLocationDot } from 'react-icons/fa6';
import { FaMapMarkedAlt } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import { FcInspection } from "react-icons/fc";

import { Link as ScrollLink } from 'react-scroll'

// Share Function
const handleShare = async () => {
    if (navigator.share) {

        try {
            await navigator.share({
                title: 'Unilodge Property Listing',
                text: 'Check out this property',
                url: window.location.href
            });
        } catch (error) {
            console.log(error)
        }
    } else {
        // Fallback for browsers that do not support Web Share API
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        //document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Link copied to clipboard!');
    }
};

const PropertyHeader = ({ property, error }) => {
    return (
        <div className="py-4 md:py-0 md:pb-4 lg:pb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl">Property Title: {property.title}</h1>

            <div className="flex justify-between items-end">
                <div>
                    <span className="flex items-center gap-2">
                        <FaLocationDot className="text-red-500" title="See Location on Map" cursor="pointer" />
                        <p className="text-md md:text-xl">{property.address}</p></span>
                    <span className="flex items-center gap-1">
                        <FaMapMarkedAlt className="text-green-900" />
                        <a href={`https://maps.google.com/?q=${property.address}`} target="_blank" rel="noreferrer" className="text-green-900 text-sm rounded-lg">See on Google Maps</a>
                    </span>
                </div>

                <div className='flex gap-2'>
                    <ScrollLink to='booking-form' smooth={true}>
                        <button
                            className="bg-white text-orange-500 border-2 border-orange-400 px-2 py-1 rounded-lg flex items-center gap-2 text-bold">
                            <FcInspection />                 
                            Book Inspection
                        </button>
                    </ScrollLink>

                    <button
                        onClick={handleShare}
                        className="bg-orange-400 px-2 py-1 rounded-lg flex items-center gap-2 text-bold">
                        <FiShare />
                        Share
                    </button>
                </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    )
}

export default PropertyHeader