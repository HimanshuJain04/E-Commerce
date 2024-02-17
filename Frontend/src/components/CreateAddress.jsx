import React, { useContext, useState } from "react";
import { ApiCalling } from "../services/api.js";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";


const CreateAddress = ({ setShowAddAddress }) => {

    const { setIsLoggedIn, isLoggedIn } = useContext(AppContext);

    const [formData, setFormData] = useState({
        name: "",
        city: "",
        state: "",
        pincode: "",
        nearby: "",
        street: "",
        phoneNo: "",
        country: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await ApiCalling("POST", "user/updateUserAddress", {
            userId: isLoggedIn?._id,
            name: formData.name,
            state: formData.state,
            city: formData.city,
            pincode: formData.pincode,
            nearBy: formData.nearby,
            street: formData.street,
            phoneNo: formData.phoneNo,
            country: formData.country
        });

        if (res?.success) {
            setIsLoggedIn(res?.data);
            setShowAddAddress(false);
        } else {
            toast.error(res?.data?.message);
        }
    };

    return (

        <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-md">

            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-600">
                        City:
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-600">
                        State:
                    </label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-600">
                        Pincode:
                    </label>
                    <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-600">
                        Country:
                    </label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="nearby" className="block text-sm font-medium text-gray-600">
                        NearBy:
                    </label>
                    <textarea
                        id="nearby"
                        name="nearby"
                        value={formData.nearby}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="street" className="block text-sm font-medium text-gray-600">
                        Street:
                    </label>
                    <textarea
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-8">
                    <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-600">
                        Phone Number:
                    </label>
                    <input
                        type="tel"
                        id="phoneNo"
                        name="phoneNo"
                        value={formData.phoneNo}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 font-semibold text-white py-2 transition-all duration-200 ease-in-out px-4 rounded-md hover:bg-blue-800"
                    >
                        Add Address
                    </button>
                </div>

            </form>
        </div>
    );

};

export default CreateAddress;
