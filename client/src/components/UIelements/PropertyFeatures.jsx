/* eslint-disable react/prop-types */
import { FaBed } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { FaShower } from "react-icons/fa6";
import { SlSizeActual } from "react-icons/sl";

const PropertyFeatures = ({ property }) => {
    return (
        <div className="flex justify-between gap-2 text-gray-800 border-2 p-3 px-4 rounded-lg items-center">

            <div className="text-sm">
                <div>Category</div>
                <div className="flex gap-2 items-center">
                    <MdCategory className="text-orange-600" />
                    <div>{property.propertyCategory}</div>
                </div>
            </div>

            <div className="text-sm">
                <div>Bedrooms</div>
                <div className="flex gap-2 items-center">
                    <FaBed className="text-orange-600" />
                    <div>{property.bedrooms}</div>
                </div>
            </div>

            <div className="text-sm">
                <div>Baths</div>
                <div className="flex gap-2 items-center">
                    <FaShower className="text-orange-600" />
                    <div>{property.bathrooms}</div>
                </div>
            </div>

            <div className="text-sm">
                <div>Size</div>
                <div className="flex gap-2 items-center">
                    <SlSizeActual className="text-orange-600" />
                    <div>{property.size}</div>
                </div>
            </div>
        </div>
    )
}

export default PropertyFeatures