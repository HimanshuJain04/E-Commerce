import React, { useContext, useState } from "react";
import { ApiCalling } from "../services/Api";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CreateAddress from "../components/CreateAddress";
import { IoMdArrowBack } from "react-icons/io";


const AddressPayment = () => {

    const { isLoggedIn } = useContext(AppContext);

    // address field requirements
    const [selectedAddress, setSelectedAddress] = useState(isLoggedIn?.address[0]);
    const [showAddAddress, setShowAddAddress] = useState(false);
    const handleAddressSelect = (address) => {
        setSelectedAddress(address);
    };




    // payment field requirement

    const isPaymentDisabled = !selectedAddress;

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };

    let orders = [];

    async function createOrder() {

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const res = await ApiCalling("POST", "user/createOrder", {
            cartItems: isLoggedIn?.carts,
            userId: isLoggedIn?._id
        }, config);

        if (res?.success) {

            console.log("order: ", res?.data);
            orders = res?.data;

        } else {
            toast.error("Failed to order");
            console.log("res : ", res);
            orders = [];
        }
    }

    async function createRazorpayOrder() {

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        await Promise.all(orders.map(async (order) => {

            const res = await ApiCalling("POST", "user/createOrderByRazorpay", { order: order }, config);

        }));

    }



    const sumbitHandler = () => {

        if (selectedPaymentMethod === "COD") {

            alert("Comming Soon");

            console.log("call the backend and update the value of payment as cod and show thank u page");

        } else {
            createOrder();
            createRazorpayOrder();
        }

    }


    return (

        <div>

            <div className="container mx-auto mt-8 flex w-full justify- items-start">

                {/* address */}
                <div className="w-full">
                    {
                        showAddAddress ? (
                            // {/* add address  */}
                            <div className="">
                                <span
                                    className="text-xl cursor-pointer "
                                    onClick={() => {
                                        setShowAddAddress(false);
                                    }}
                                ><IoMdArrowBack /></span>
                                < CreateAddress setShowAddAddress={setShowAddAddress} />
                            </div>
                        ) : (
                            // {/* address */ }
                            <div className="max-w-md p-4 bg-white border rounded">
                                <h1 className="text-2xl font-bold mb-4">Choose an Address</h1>
                                <form className="space-y-2 w-full">
                                    {isLoggedIn?.address.map((address) => (
                                        <div key={address._id} className="flex flex-col items-start border-b py-2">
                                            <input
                                                type="radio"
                                                id={address._id}
                                                name="address"
                                                checked={selectedAddress?._id === address._id}
                                                onChange={() => handleAddressSelect(address)}
                                                className="mb-2"
                                            />
                                            <label htmlFor={address._id} className="cursor-pointer">
                                                <strong>{address.name}</strong>
                                                <div>{address.street}, {address.city}, {address.state} - {address.pincode}</div>
                                                <div>Phone: {address.phoneNo}</div>
                                            </label>
                                        </div>
                                    ))}
                                </form>
                                <button
                                    onClick={() => {
                                        setShowAddAddress(true);
                                    }}
                                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    Add More Addresses
                                </button>
                            </div>
                        )
                    }
                </div>


                {/* payment */}
                <div className="flex justify-center mt-20 w-full items-center">
                    <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Choose Payment Method</h2>

                        <div className="flex items-center mb-4">
                            <input
                                type="radio"
                                id="cod"
                                name="paymentMethod"
                                value="COD"
                                className="mr-2"
                                checked={selectedPaymentMethod === 'COD'}
                                onChange={handlePaymentMethodChange}
                                disabled={isPaymentDisabled}
                            />
                            <label htmlFor="cod" className={`flex items-center cursor-pointer ${isPaymentDisabled ? 'text-gray-500' : ''}`}>
                                <img src="/cod.svg" alt="COD Logo" className="w-16 h-16 mr-2" />
                                Cash on Delivery
                            </label>
                        </div>

                        <div className="flex items-center mb-4">
                            <input
                                type="radio"
                                id="razorpay"
                                name="paymentMethod"
                                value="Razorpay"
                                className="mr-2"
                                checked={selectedPaymentMethod === 'Razorpay'}
                                onChange={handlePaymentMethodChange}
                                disabled={isPaymentDisabled}
                            />
                            <label htmlFor="razorpay" className={`flex items-center cursor-pointer ${isPaymentDisabled ? 'text-gray-500' : ''}`}>
                                <img src={"/razorpay.svg"} alt="Razorpay Logo" className="w-16 h-16 mr-2" />
                                Razorpay
                            </label>
                        </div>

                        <button
                            onClick={sumbitHandler}
                            className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ${isPaymentDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isPaymentDisabled}
                        >
                            Pay Now
                        </button>
                    </div>
                </div>

            </div>

        </div >


    );

};

export default AddressPayment;
