import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const AddProductModal = ({ closeModal }) => {
  const [productDetails, setProductDetails] = useState({
    name: '',
    category: '',
    pricePerUnit: '',
    availableQuantity: '',
    location: '',
    freshnessLevel: '',
    harvestedDate: '',
    picture: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductDetails({ ...productDetails, picture: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product Added:', productDetails);
    // Handle the form submission logic here (e.g., send data to the server)
    closeModal();  // Close the modal after submitting the form
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-3/4 p-6 rounded-lg shadow-lg relative">
        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 hover:text-black">
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Product Name</label>
              <input
                type="text"
                name="name"
                value={productDetails.name}
                onChange={handleChange}
                className="border p-2 rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Category</label>
              <input
                type="text"
                name="category"
                value={productDetails.category}
                onChange={handleChange}
                className="border p-2 rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Price per Unit</label>
              <input
                type="number"
                name="pricePerUnit"
                value={productDetails.pricePerUnit}
                onChange={handleChange}
                className="border p-2 rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Available Quantity</label>
              <input
                type="number"
                name="availableQuantity"
                value={productDetails.availableQuantity}
                onChange={handleChange}
                className="border p-2 rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={productDetails.location}
                onChange={handleChange}
                className="border p-2 rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Freshness Level</label>
              <input
                type="text"
                name="freshnessLevel"
                value={productDetails.freshnessLevel}
                onChange={handleChange}
                className="border p-2 rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Harvested Date</label>
              <input
                type="date"
                name="harvestedDate"
                value={productDetails.harvestedDate}
                onChange={handleChange}
                className="border p-2 rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Product Picture</label>
              <input
                type="file"
                name="picture"
                onChange={handleFileChange}
                className="border p-2 rounded-lg"
                required
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
