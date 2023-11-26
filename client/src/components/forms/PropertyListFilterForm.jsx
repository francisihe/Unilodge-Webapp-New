/* eslint-disable react/prop-types */

const PropertyListFilterForm = ({
    propertyType,
    setPropertyType,
    propertyModel,
    setPropertyModel,
    propertyStatus,
    setPropertyStatus,
    propertyCategory,
    setPropertyCategory,
    onFilter,
    onClear
}) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        onFilter({
            propertyType,
            propertyModel,
            propertyStatus,
            propertyCategory
        });
    };

    const handleClear = () => {
        setPropertyType('');
        setPropertyModel('');
        setPropertyStatus('');
        setPropertyCategory('');
        onClear(); 
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="border-2 px-4 py-2 rounded-xl">
                <div className="md:flex md:gap-2 md:items-center">
                    <div className="flex gap-1 justify-between md:pr-10 md:w-4/5">

                        <div className="grid">
                            <label className="text-xs text-orange-500 font-medium whitespace-nowrap">Property Type</label>
                            <select
                                value={propertyType}
                                onChange={(e) => setPropertyType(e.target.value)}
                                className="text-sm w-full border my-1 py-1 px-1 rounded-2xl md:rounded-sm bg-inherit"
                            >
                                <option value=''>Select</option>
                                <option value="house">House</option>
                                <option value="land">Land</option>
                            </select>
                        </div>

                        <div className="grid">
                            <label className="text-xs text-orange-500 font-medium whitespace-nowrap">Property Model</label>
                            <select
                                value={propertyModel}
                                onChange={(e) => setPropertyModel(e.target.value)}
                                className="text-sm w-full border my-1 py-1 px-1 rounded-2xl md:rounded-sm bg-inherit"
                            >
                                <option value=''>Select</option>
                                <option value="house">House</option>
                                <option value="hostel">Hostel</option>
                                <option value="land">Land</option>
                            </select>
                        </div>

                        <div className="grid">
                            <label className="text-xs text-orange-500 font-medium whitespace-nowrap">Property Status</label>
                            <select
                                value={propertyStatus}
                                onChange={(e) => setPropertyStatus(e.target.value)}
                                className="text-sm w-full border my-1 py-1 px-1 rounded-2xl md:rounded-sm bg-inherit"
                            >
                                <option value=''>Select</option>
                                <option value="available">Available</option>
                                <option value="taken">Taken</option>
                            </select>
                        </div>

                        <div className="grid">
                            <label className="text-xs text-orange-500 font-medium whitespace-nowrap">Property Category</label>
                            <select
                                value={propertyCategory}
                                onChange={(e) => setPropertyCategory(e.target.value)}
                                className="text-sm w-full border my-1 py-1 px-1 rounded-2xl md:rounded-sm bg-inherit"
                            >
                                <option value=''>Select</option>
                                <option value="rent">Rent</option>
                                <option value="sale">Sale</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2 md:w-1/5">
                        <button
                            type="submit"
                            className="bg-orange-500 text-white rounded-xl py-2 px-4 mt-3 w-full"
                        >
                            Filter
                        </button>

                        <button
                            type="submit"
                            onClick={handleClear}
                            className="text-sm"
                        >
                            Clear Filter
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PropertyListFilterForm