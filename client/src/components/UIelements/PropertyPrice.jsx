/* eslint-disable react/prop-types */
import { MdOutlineSlowMotionVideo } from "react-icons/md";


const formatNumberWithCommas = (number) => {
    if (number >= 1e9) {
        return (number / 1e9) + 'B';
    } else if (number >= 1e6) {
        return (number / 1e6) + 'M';
    } else {
        return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
};

const PropertyPrice = ({ property }) => {
    return (
        <>
            <div className="flex justify-between text-gray-800 border-2 p-3 px-4 rounded-lg items-center">

                {/* If discounted price, show with superscript else show regular */}
                {property.discountedPrice ? (
                    <div className="grid -space-y-2 mx-auto">
                        <sup>
                            <s>
                                <div className="font-medium text-sm text-red-500">
                                    <div className="whitespace-nowrap">&#8358; {formatNumberWithCommas(property.regularPrice)}</div>
                                </div>
                            </s>
                        </sup>

                        <div className="md:flex md:gap-2 items-center">
                            <div className="font-bold text-2xl">&#8358; {formatNumberWithCommas(property.discountedPrice)}</div>
                            <div>{property.propertyType === 'land'
                                ? (<div className="text-sm">per plot</div>)
                                : (<div className="text-sm">per year</div>)
                            }
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="md:flex md:gap-2 items-center">
                        <div className="font-bold text-2xl">&#8358; {formatNumberWithCommas(property.regularPrice)}</div>
                        <div>{property.propertyType === 'land'
                            ? (<div className="text-sm">per plot</div>)
                            : (<div className="text-sm">per year</div>)
                        }
                        </div>
                    </div>
                )}

                {property.video && (
                    <div className="mt-2"> {/* Add margin-top for separation */}
                        <a href={`${property.video}`} target="_blank" rel="noreferrer">
                            <button className="flex items-center gap-1 p-1 px-2 bg-orange-400 text-white border-2 border-orange-400 hover:bg-white hover:text-orange-400 rounded-lg">
                                <MdOutlineSlowMotionVideo />
                                See Property Video
                            </button>
                        </a>
                    </div>
                )}


            </div>
        </>
    )
}

export default PropertyPrice