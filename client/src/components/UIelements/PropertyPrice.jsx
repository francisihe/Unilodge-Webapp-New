/* eslint-disable react/prop-types */
import { MdOutlineSlowMotionVideo } from "react-icons/md";


const PropertyPrice = ({ property }) => {
    return (
        <>
            <div className="flex justify-between text-gray-800 border-2 p-3 px-4 rounded-lg items-center">

                {/* If discounted price, show with superscript else show regular */}
                {property.discountedPrice
                    ? (
                        <div className="grid -space-y-2">
                            <sup><s><div className="font-light text-sm">
                                &#8358; {property.regularPrice}</div></s>
                            </sup>

                            <div className="flex items-center">
                                <div className="font-bold text-2xl">
                                    &#8358; {property.discountedPrice}
                                </div>
                                <div>&nbsp;/ year</div>
                            </div>
                        </div>)
                    : (<div className="flex items-center">
                        <div className="font-bold text-2xl">
                            &#8358; {property.regularPrice}
                        </div>
                        <div>&nbsp;/ year</div>
                    </div>)
                }

                {property.video && (
                    <a href={`${property.video}`} target="_blank" rel="noreferrer">
                        <button className="flex items-center gap-1 p-1 px-2 bg-white text-orange-500 border-2 border-orange-400 rounded-lg">
                            <MdOutlineSlowMotionVideo />
                            See Property Video
                        </button>
                    </a>
                )}


            </div>

            {/* <div className="grid -space-y-2">
                <sup><s><div className="font-light text-sm">
                    &#8358; {property.regularPrice}</div></s>
                </sup>

                <div className="flex items-center">
                    <div className="font-bold text-2xl">
                        &#8358; {property.discountedPrice}
                    </div>
                    <div>&nbsp;/ year</div>
                </div>
            </div> */}
        </>
    )
}

export default PropertyPrice