import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

// eslint-disable-next-line react/prop-types
const PropertyGallery = ({ property }) => {

    // eslint-disable-next-line react/prop-types
    const propertyImages = (property.images || []).map((image) => ({
        original: image,
        thumbnail: image
    }));

    return (
        <div className='rounded-lg bg-gray-300'>
            <ImageGallery
                items={propertyImages}
            />
        </div>
    )
}

export default PropertyGallery