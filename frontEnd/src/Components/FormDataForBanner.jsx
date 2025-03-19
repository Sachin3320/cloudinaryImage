import axios from 'axios';
import React, { useState } from 'react';

const FormDataForBanner = () => {
  const [bannerImagePreview, setBannerImagePreview] = useState(null);
  const [title, setTitle] = useState(""); // State to hold the title
  const [image, setimage] = useState(null); // State to hold the banner image file

  // Handle title change
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // Handle banner image change
  const handleBannerImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Generate a preview URL for the selected image
      setBannerImagePreview(imageUrl); // Set the preview URL
      setimage(file); // Store the file in the state
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if title and banner image are provided
    if (!title || !image) {
      alert("Please provide both title and banner image.");
      return;
    }

    const formData = {
      title,
      image,
    };

    console.log("Form Data:", formData);
    const res = axios.post("http://localhost:3001/api/v1/blog/create", formData ,{

      headers: {
        'Content-Type': 'multipart/form-data',  // Specify content type for form data
      }
    } );
    console.log(res , "response")
    // Here, you can send the formData to an API or perform other actions
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Upload Banner</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="mt-2 block w-full p-3 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter title"
          />
        </div>

        {/* Banner Image Upload */}
        <div>
          <label htmlFor="bannerImage" className="block text-lg font-medium text-gray-700">Banner Image</label>
          <input
            type="file"
            name="bannerImage"
            id="bannerImage"
            accept="image/*"
            onChange={handleBannerImageChange}
            className="mt-2 block w-full p-3 border rounded-md border-gray-300"
          />
        </div>

        {/* Banner Image Preview */}
        {bannerImagePreview && (
          <div className="mt-4">
            <h4 className="text-lg font-medium text-gray-700">Banner Image Preview:</h4>
            <img
              src={bannerImagePreview}
              alt="Banner Preview"
              className="w-32 h-32 object-cover rounded-md"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormDataForBanner;
