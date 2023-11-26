/* eslint-disable react/prop-types */
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";


const Pagination = ({ currentPage, totalPages, onClickNextPage, onClickPrevPage }) => {

    return (
        <div className="">
            <div className="items-center space-x-2">
                {/* Left button */}
                <button
                    onClick={onClickPrevPage}
                    disabled={currentPage === 1}
                    className={`${
                        currentPage === 1 ? "bg-gray-400" : "bg-orange-400 text-white"
                      } px-4 py-2 rounded-full focus:outline-none`}
                >
                    <FaArrowAltCircleLeft />
                </button>

                {/* Right button */}
                <button
                    onClick={onClickNextPage}
                    disabled={currentPage === totalPages}
                    className={`${
                        currentPage === totalPages ? "bg-gray-400" : "bg-orange-400 text-white"
                      } px-4 py-2 rounded-full focus:outline-none`}
                >
                    <FaArrowAltCircleRight />
                </button>
            </div>
        </div>
    )
}

export default Pagination


