import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ProductForm = () => {  // Renamed from FormData to ProductForm
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  // State to keep track of the offerings added by the user
  const [offerings, setOfferings] = useState([]);
  
  // State to store selected image files for preview
  const [imagePreviews, setImagePreviews] = useState([]);
  const [bannerImagePreview, setBannerImagePreview] = useState(null);
  
  // Handle form submission
  const onSubmit = async (data) => {
    const formDataobj = new FormData(); // FormData object to handle file uploads
  
    // Append regular fields to FormData
    formDataobj.append('title', data.title);
    formDataobj.append('price', data.price);
    formDataobj.append('type', data.type);
    formDataobj.append('description', data.description);
    formDataobj.append('offerings', JSON.stringify(offerings)); // offerings as a JSON string
    formDataobj.append('top', data.top); // checkbox value
  
    // Append banner image if it exists
    if (bannerImagePreview) {
      const bannerImageFile = document.querySelector('#Banner_image').files[0];
      formDataobj.append('bannerImage', bannerImageFile);
    }
  
    // Append multiple image files
    const imageFiles = document.querySelector('#images').files;
    for (let i = 0; i < imageFiles.length; i++) {
      formDataobj.append('images', imageFiles[i]);
    }
  
    // Send the form data to the server using Axios
    try {
      const response = await axios.post('http://localhost:3000/api/upload', formDataobj, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Specify content type for form data
        }
      });

      if (response.status === 200) {
        console.log('Product created successfully:', response.data);
        alert('Product uploaded successfully!');
      } else {
        console.error('Error:', response.data.message);
        alert('Failed to upload product.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while uploading the product.');
    }
  };

  // Handle adding an offering when "Add" button is clicked
  const handleAddOffering = (event) => {
    event.preventDefault(); // Prevent form submission
    const offeringInput = event.target.previousElementSibling;
    const newOffering = offeringInput.value.trim();

    if (newOffering && !offerings.includes(newOffering)) {
      setOfferings([...offerings, newOffering]);
      offeringInput.value = ''; // Clear input after adding
    }
  };

  // Handle removing an offering from the list
  const handleRemoveOffering = (offeringToRemove) => {
    setOfferings(offerings.filter(offering => offering !== offeringToRemove));
  };

  // Handle image preview when selecting multiple images
  const handleImageChange = (event) => {
    const files = event.target.files;
    const filePreviews = Array.from(files).map(file => URL.createObjectURL(file));
    setImagePreviews(filePreviews);
  };

  // Handle banner image preview
  const handleBannerImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBannerImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Product Information</h2>

      <div className="space-y-4">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            {...register("title", { required: "Title field is required" })}
            className="mt-2 block w-full p-3 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Price Input */}
        <div>
          <label htmlFor="price" className="block text-lg font-medium text-gray-700">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            {...register("price", { required: "Price field is required" })}
            className="mt-2 block w-full p-3 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
        </div>

        {/* Type Select */}
        <div>
          <label htmlFor="type" className="block text-lg font-medium text-gray-700">Type</label>
          <select
            id="type"
            name="type"
            {...register("type", { required: "Type is required" })}
            className="mt-2 block w-full p-3 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Type</option>
            <option value="base">Base</option>
            <option value="premium">Premium</option>
            <option value="regular">Regular</option>
          </select>
          {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
        </div>

        {/* Banner Image Upload */}
        <div>
          <label htmlFor="Banner_image" className="block text-lg font-medium text-gray-700">Banner Image</label>
          <input
            type="file"
            name="Banner_image"
            id="Banner_image"
            accept="image/*"
            onChange={handleBannerImageChange}
            className="mt-2 block w-full p-3 border rounded-md border-gray-300"
          />
          {bannerImagePreview && (
            <div className="mt-2">
              <h4 className="text-lg font-medium text-gray-700">Banner Preview:</h4>
              <img src={bannerImagePreview} alt="Banner preview" className="w-32 h-32 object-cover rounded-md" />
            </div>
          )}
        </div>

        {/* Multiple Image Upload */}
        <div>
          <label htmlFor="images" className="block text-lg font-medium text-gray-700">Multiple Images to showcase the product</label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="mt-2 block w-full p-3 border rounded-md border-gray-300"
          />
          {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>}

          {/* Image Previews */}
          <div className="mt-4 grid grid:col-1 md:grid-cols-5 gap-4">
            {imagePreviews.map((image, index) => (
              <div key={index} className="w-32 h-32 overflow-hidden rounded-md">
                <img src={image} alt={`Preview ${index}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            className="mt-2 block w-full p-3 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Offerings Section */}
        <div>
          <label htmlFor="offerings" className="block text-lg font-medium text-gray-700">Offerings</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              id="offering"
              name="offering"
              placeholder="Enter offering"
              {...register('offering', { required: 'Please enter an offering' })}
              className="mt-2 block w-full p-3 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddOffering}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              Add
            </button>
          </div>
          {errors.offering && <p className="text-red-500 text-sm mt-1">{errors.offering.message}</p>}
          
          {/* Displaying added offerings */}
          <div>
            <h4 className="text-lg font-semibold mt-4">Added Offerings:</h4>
            <ul className="space-y-2">
              {offerings.map((offering, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{offering}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveOffering(offering)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Top Checkbox */}
          <div className="flex items-center space-x-2 mt-4">
            <input
              type="checkbox"
              name="top"
              id="top"
              {...register("top")}
              className="h-4 w-4 border-gray-300 rounded text-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="top" className="text-lg font-semibold text-gray-700">Keep it on top of the page</label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ProductForm;  // Exporting the renamed component
