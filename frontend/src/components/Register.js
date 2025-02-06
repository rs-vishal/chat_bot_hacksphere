import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'None',
        location: '',
        phone: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error for the specific field when user starts typing
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        let newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone || formData.phone.length < 10) newErrors.phone = 'Phone number is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            console.log('Registering:', formData);
            const response = await axios.post('http://localhost:5000/register', formData);
            navigate('/login'); // Redirect to login after successful registration
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center">
            <div className="w-full max-w-md bg-white shadow-md p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Create an Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        >
                            <option value="None">Select Role</option>
                            <option value="Farmer">farmer</option>
                            <option value="Buyer">buyer</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                        {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    >
                        Register
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-indigo-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
