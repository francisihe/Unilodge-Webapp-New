import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";


const Pagination = () => {


    return (
        <div className="">
            <div className="items-center space-x-2">
                {/* Right button */}
                <button
                    //onClick={handleNextPage}
                    //disabled={currentPage === totalPages}
                    className="bg-orange-400 text-white px-4 py-2 rounded-full focus:outline-none"
                >
                    <FaArrowAltCircleLeft />
                </button>

                {/* Left button */}
                <button
                    //onClick={handlePrevPage}
                    //disabled={currentPage === 1}
                    className="bg-orange-400 text-white px-4 py-2 rounded-full focus:outline-none"
                >
                    <FaArrowAltCircleRight />
                </button>
            </div>
        </div>
    )
}

export default Pagination


