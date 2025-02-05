import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPaperPlane } from 'react-icons/fa';
import { VscRobot } from "react-icons/vsc";
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineDollar, AiOutlinePlusCircle, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import AddProductModal from './components/Addproducts';
import UpdateProductModal from './components/Updateproduct';

function Widget() {
  const [click, setClick] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userRole, setUserRole] = useState('customer');
  const [modalOpen, setModalOpen] = useState(false); 
  const [updateModalOpen, setUpdateModalOpen] = useState(false);  // Track Update Modal
  const [productToUpdate, setProductToUpdate] = useState(null);  // Product details for update

  useEffect(() => {
    const role = 'farmer';  
    setUserRole(role);
  }, []);

  const toggleChat = () => {
    setClick(!click);
    if (!click && messages.length === 0) {
      setMessages([]);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages((prevMessages) => [...prevMessages, { text: input, type: 'user' }]);
      setInput('');
      try {
        const response = await axios.post('http://localhost:5000/response', { message: input });
        setMessages((prevMessages) => [...prevMessages, { text: response.data.message, type: 'chatbot' }]);
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages((prevMessages) => [...prevMessages, { text: 'Error: Could not get response from server.', type: 'chatbot' }]);
      }
    }
  };

  const openAppProduct = () => {
    setModalOpen(true); // Open the modal for adding a product
  };

  const closeAppProduct = () => {
    setModalOpen(false); // Close the add product modal
  };

  const openUpdateProductModal = () => {
    // Set example product details to update
    setProductToUpdate({
      id: '1234',
      availableQuantity: '50',
      pricePerUnit: '20',
      harvestedDate: '2024-01-01',
    });
    setUpdateModalOpen(true);  // Open the update product modal
  };

  const closeUpdateProductModal = () => {
    setUpdateModalOpen(false);  // Close the update product modal
  };

  return (
    <div>
      <button onClick={toggleChat} className="fixed bottom-0 right-0 p-6">
        <div className="flex items-center justify-center h-16 w-16 bg-gray-700 rounded-full border border-white shadow-lg">
          <VscRobot className="text-white h-9 w-9" />
        </div>
      </button>

      {click && (
        <div className="fixed bottom-24 right-4 h-3/4 w-1/4 backdrop-blur-3xl shadow-lg rounded-lg border border-gray-300 flex flex-col overflow-hidden">
          <div className="p-4 bg-gray-700 text-white font-semibold text-lg">Chat Assistant</div>
          <div className="p-3 text-gray-800 font-semibold text-lg text-center">How can I help you?</div>
          <div className="p-3 flex flex-col space-y-2">
            {userRole === 'farmer' ? (
              <>
                <button onClick={openAppProduct} className="bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700">
                  <AiOutlinePlusCircle size={20} /> Add Product
                </button>
                <button onClick={openUpdateProductModal} className="bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700">
                  <AiOutlineEdit size={20} /> Update Product Details
                </button>
                <button className="bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700">
                  <AiOutlineEye size={20} /> View Current Listing
                </button>
              </>
            ) : (
              <>
                <button className="bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700">
                  <AiOutlineSearch size={20} /> Search for Product
                </button>
                <button className="bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700">
                  <AiOutlineShoppingCart size={20} /> Place Order
                </button>
                <button className="bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700">
                  <AiOutlineDollar size={20} /> Compare Price
                </button>
              </>
            )}
          </div>
          <div className="flex-1 overflow-y-auto p-4 hide-scrollbar">
            <div className="flex flex-col space-y-2">
              {messages.map((msg, index) => (
                <div key={index} className={`p-3 rounded-lg ${msg.type === 'user' ? 'bg-gray-500 text-white self-end' : 'bg-gray-300 text-black self-start'}`}>
                  {msg.text}
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handleSend} className="bg-gray-100 p-3 flex border-t border-gray-300">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 p-2 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black" placeholder="Type a message..." />
            <button type="submit" className="ml-2 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-black transition duration-300">
              <FaPaperPlane className="text-white h-5 w-5" />
            </button>
          </form>
        </div>
      )}

      {/* Render modal for adding product */}
      {modalOpen && <AddProductModal closeModal={closeAppProduct} />}

      {/* Render modal for updating product */}
      {updateModalOpen && productToUpdate && (
        <UpdateProductModal 
          closeModal={closeUpdateProductModal} 
          initialProductDetails={productToUpdate} 
        />
      )}
    </div>
  );
}

export default Widget;
