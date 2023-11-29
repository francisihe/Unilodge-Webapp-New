import { useState } from "react"
import { TbHomeSearch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const HeaderSearchBarForMobile = () => {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/search-properties?searchTerm=${searchTerm}`)
    };

    return (
        <div className="pt-3 visible lg:invisible md:invisible">

            <h3>Looking for a particular property?</h3>
            <p>Use the search bar below</p>
            <form className="pt-3">
                <div className="flex gap-1 items-center">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search here..."
                        className="w-full shadow-md shadow-gray-300"
                        required
                    />
                    <div className="bg-black p-1 rounded-full px-2 border-2 border-orange-400">
                        <button
                            type='submit'
                            onClick={handleSubmit}
                        >
                            <TbHomeSearch
                                className="text-white bg-black" />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default HeaderSearchBarForMobile