import { useState } from "react"
import { TbHomeSearch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const HeaderSearchBar = () => {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/search-properties?searchTerm=${searchTerm}`)
    };

    return (
        <form className="flex gap-2 rounded-full py-2 px-4  invisible lg:visible md:visible">
            <div className="flex gap-1 items-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search here..."
                    className="w-3/4 shadow-md shadow-gray-300"
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
    )
}

export default HeaderSearchBar