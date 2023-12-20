import { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../../utils/firebase";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AddPropertyForm = () => {
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    propertyType: '',
    propertyModel: '',
    propertyStatus: '',
    propertyCategory: '',
    regularPrice: 50_000,
    discountedPrice: '',
    images: [],
    video: '',
    bedrooms: 1,
    bathrooms: 1,
    size: '',
    isFeatured: false
  });

  const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');

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

  // Upload Images to Firebase Storage
  const handleImageUpload = async () => {
    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB

    if (files.length > 0 && files.length + formData.images.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        if (files[i].size > maxSizeInBytes) {
          setImageUploadError(true)
          setImageUploadError('Image upload failed (2 MB max per image)');
          continue; // Skip this file and move to the next
        }
         promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            images: formData.images.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
          console.log(error);
        });
    } else {
      setImageUploadError('You can only upload 6 images per property');
      setUploading(false);
    }
  };

  // Store Image in Firebase Bucket Function used in handleImageUpload above
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(`Your upload is ${progress}% done`)
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  // Remove Image from Image Array
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  // Submit Form Data to Database
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //Check regular and discount prices
      if (formData.discountedPrice > formData.regularPrice) {
        window.alert('Discounted price cannot be greater than regular price');
        return setError('Discounted price cannot be greater than regular price');
      }

      if (formData.discountedPrice === formData.regularPrice) {
        window.alert('Regular Price and Discounted Price cannot be the same');
        return setError('Regular Price and Discounted Price cannot be the same');
      }

      setLoading(true);
      // Make API call to create property
      const res = await fetch('/api/v1/properties/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);

      // Receive Property Data and Navigate to Property Page
      if (!res.ok) {
        setError(data);
        console.log('Error Creating Property');
      }

      if (res.ok) {
        setError(null);
        console.log('Property Created Successfully');
        navigate(`/property/${data._id}`);
      }

    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-1 lg:grid lg:grid-cols-2 lg:gap-8">

      <div>
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
          required
        />

        <div>
          <label className="text-xs text-orange-500 font-medium">Property Type</label>
          <select
            id='propertyType'
            value={formData.propertyType}
            onChange={handleChange}
            className="text-sm w-full border my-1 py-2 px-3 rounded-2xl bg-inherit"
            required
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
            required
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
            required
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
            required
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
      </div>

      <div>
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

        {/* Image Upload Progress and Error Message */}
        {imageUploadError && <p className="text-red-500 text-sm">{imageUploadError}</p>}
        {uploading && <p className="text-green-500 text-sm">{uploadProgress}</p>}
        <div className="flex gap-1 pb-4">
          <input
            type='file'
            id='images'
            // accept='image/*'
            accept='image/png, image/jpg, image/jpeg, .webp'
            multiple
            onChange={(event) => setFiles(event.target.files)}
            className="border border-gray-300 rounded-lg py-1 px-4 w-full"
            required
          />
          <button
            type='button'
            className="bg-green-500 rounded-lg py-1 px-3"
            onClick={handleImageUpload}>
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>

        {/* Image Display Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
          {formData.images.length > 0 &&
            formData.images.map((url, index) => (

              <div key={index}
                className="flex justify-between p-1 items-center h-42 w-full md:h-48 md:w-full ">
                <img
                  src={url}
                  alt="property image"
                  className="h-40 w-full object-cover rounded-md"
                />
                <button
                  type='button'
                  title='Remove Image'
                  onClick={() => handleRemoveImage(index)}
                >
                  <AiFillCloseCircle className="text-red-500 text-3xl" />
                </button>
              </div>

            ))
          }
        </div>

        <button
          type='submit'
          //onClick={() => handleSubmit}
          className="bg-orange-500 text-white rounded-lg py-2 px-4 w-full"
        >
          {loading ? 'Creating...' : 'Create Property'}
        </button>

        {/* Error Message On Submission */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </form >
  )
}

export default AddPropertyForm