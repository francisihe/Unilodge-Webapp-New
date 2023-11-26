import { useState } from "react";


const PropertySearchAndFilter = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [propertyModel, setPropertyModel] = useState('');
  const [propertyStatus, setPropertyStatus] = useState('');
  const [propertyCategory, setPropertyCategory] = useState('');

  console.log(searchTerm)

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submitted')
  };

  return (
    <div className=" ">
      {/* h-24 md:h-32 border-2 rounded-xl*/}
      <p>Top Search Area</p>
      <form onSubmit={handleSubmit} className="border-2 px-4 py-2 rounded-xl space-y-2">
        
        <div>
          <label className="text-xs text-orange-500 font-medium">Search Term</label>
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter search term"
              className="w-3/4"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white rounded-xl py-2 px-4 w-1/4"
            >
              Search
            </button>
          </div>
        </div>

        <div className="md:flex md:gap-2">
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

          <button
            type="submit"
            className="bg-orange-500 text-white rounded-xl py-2 px-4 mt-3 w-full md:w-1/5">
            Filter
          </button>
        </div>
      </form>

    </div>

  )
}

export default PropertySearchAndFilter