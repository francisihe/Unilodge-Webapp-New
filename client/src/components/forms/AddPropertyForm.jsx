import { useState } from "react";


const AddPropertyForm = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    propertyType: '',
    propertyModel: '',
    propertyStatus: '',
    propertyCategory: '',
    regularPrice: 50_000,
    discountedPrice: 40_000,
    images: [],
    video: '',
    bedrooms: 1,
    bathrooms: 1,
    size: '',
    isFeatured: false
  });

  const handleChange = (event) => {

    if (
      event.target.type === 'number' ||
      event.target.type === 'text' ||
      event.target.type === 'textarea' ||
      event.target.type === 'select-one'
    ) {
      setFormData({
        ...formData,
        [event.target.id]: event.target.value,
      });
    }

    if (event.target.type === 'checkbox') {
      setFormData({
        ...formData,
        [event.target.id]: event.target.checked,
      });
    }
  };

  const handleImageUpload = () => {
    console.log(files);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };


  return (
    <form className="space-y-1">

      <div className="space-x-2">
        <label className="text-xs text-orange-500 font-medium">Is this a featured Property?</label>
        <input
          type='checkbox'
          id='isFeatured'
          name='isFeatured'
          onChange={handleChange}
          checked={formData.isFeatured}
        />

      </div>

      <label className="text-xs text-orange-500 font-medium">Property Title</label>
      <input
        type='text'
        id='title'
        placeholder='Amega Hostel'
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label className="text-xs text-orange-500 font-medium">Property Description</label>
      <textarea
        id='description'
        placeholder='Fully furnished self contained hostel with 24/7 power supply and security.'
        value={formData.description}
        onChange={handleChange}
        className="h-40"
      />

      <label className="text-xs text-orange-500 font-medium">Property Address</label>
      <input
        type='text'
        id='address'
        placeholder='Ekosodin, Benin City'
        value={formData.address}
        onChange={handleChange}
      />

      <div>
        <label className="text-xs text-orange-500 font-medium">Property Type</label>
        <select
          id='propertyType'
          value={formData.propertyType}
          onChange={handleChange}
          className="text-sm w-full border my-1 py-2 px-3 rounded-2xl bg-inherit"
        >
          <option value=''>Select House or Land</option>
          <option value="house">House</option>
          <option value="land">Land</option>
        </select>
      </div>

      <div>
        <label className="text-xs text-orange-500 font-medium">Property Model</label>
        <select
          id='propertyModel'
          value={formData.propertyModel}
          onChange={handleChange}
          className="text-sm w-full border my-1 py-2 px-3 rounded-2xl bg-inherit"
        >
          <option value=''>Select House, Hostel or Land</option>
          <option value="house">House</option>
          <option value="hostel">Hostel</option>
          <option value="land">Land</option>
        </select>
      </div>

      <div>
        <label className="text-xs text-orange-500 font-medium">Property Status</label>
        <select
          id='propertyStatus'
          value={formData.propertyStatus}
          onChange={handleChange}
          className="text-sm w-full border my-1 py-2 px-3 rounded-2xl bg-inherit"
        >
          <option value=''>Select current status</option>
          <option value="available">Available</option>
          <option value="taken">Taken</option>
        </select>
      </div>

      <div>
        <label className="text-xs text-orange-500 font-medium">Property Category</label>
        <select
          id='propertyCategory'
          value={formData.propertyCategory}
          onChange={handleChange}
          className="text-sm w-full border my-1 py-2 px-3 rounded-2xl bg-inherit"
        >
          <option value=''>Select rent or sale</option>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-orange-500 font-medium">Regular Price</label>
          <input
            type='number'
            id='regularPrice'
            value={formData.regularPrice}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="text-xs text-orange-500 font-medium">Discounted Price</label>
          <input
            type='number'
            id='discountedPrice'
            value={formData.discountedPrice}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-orange-500 font-medium">No. of Bedrooms</label>
          <input
            type='number'
            id='bedrooms'
            value={formData.bedrooms}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-xs text-orange-500 font-medium">No. of Bathrooms</label>
          <input
            type='number'
            id='bathrooms'
            value={formData.bathrooms}
            onChange={handleChange}
          />
        </div>
      </div>

      <label className="text-xs text-orange-500 font-medium">Property Size</label>
      <input
        type='text'
        id='size'
        placeholder='400 by 400 feet'
        value={formData.size}
        onChange={handleChange}
      />

      <label className="text-xs text-orange-500 font-medium">Property Video</label>
      <input
        type='text'
        id='video'
        placeholder='Paste video link here'
        value={formData.video}
        onChange={handleChange}
      />

      <label className="text-xs text-orange-500 font-medium">Property Images</label>
      <p>Choose the featured image first</p>
      <div className="flex gap-1">
        <input
          type='file'
          id='images'
          accept='image/*'
          multiple
          onChange={(event) => setFiles(event.target.files)}
          className="border border-gray-300 rounded-lg py-1 px-4 w-full"
        />
        <button
          type='button'
          className="bg-green-500 rounded-lg py-1 px-3"
          onClick={handleImageUpload}>
          Upload
        </button>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="bg-orange-500 text-white rounded-lg py-2 px-4 w-full"
      >
        Create Property
      </button>
    </form>
  )
}

export default AddPropertyForm