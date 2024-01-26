import React, { useContext, useState } from "react";
import { ApiCalling } from "../services/Api";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CreateAddress from "../components/CreateAddress";
import { IoMdArrowBack } from "react-icons/io";


const AddressPayment = () => {

    const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
    const navigate = useNavigate();

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


    async function createOrder() {

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const res = await ApiCalling("POST", "user/createOrder", {
            cartItems: isLoggedIn?.carts,
            email: isLoggedIn?.email,
            address: selectedAddress,

        }, config);

        if (res?.success) {
            return res?.data;

        } else {
            toast.error("Failed to order");
            return [];
        }
    }

    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    };


    async function createRazorpayOrder(order) {

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        return await ApiCalling("POST", "user/createOrderByRazorpay", { order: order }, config);
    }


    async function razorpayHandler(payload) {

        try {
            // Load Razorpay SDK
            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

            if (!res) {
                throw new Error("Razorpay SDK failed to load. Please check your internet connection.");
            }

            // Create Razorpay order
            const result = await createRazorpayOrder(payload);

            if (!result) {
                throw new Error("Server error. Please try again later.");
            }

            // Check if data is available in the result
            if (!result?.data) {
                throw new Error("Server returned an unexpected response. Please try again.");
            }

            // Prepare options for Razorpay payment
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY,
                amount: result.data.amount * 100,
                currency: result.data.currency,
                name: "Ecommerce",
                description: "Test Transaction",
                image: {},
                order_id: result.data.id,
                handler: async function (response) {
                    try {

                        // Send the payment response to your server endpoint
                        const res = await ApiCalling("POST", "user/payment/verifyPayment",
                            {
                                paymentId: response.razorpay_payment_id,
                            });


                        if (res?.success) {

                            toast("Payment Successfully Done");

                            const res = await ApiCalling("POST", "user/updateOrders",
                                {
                                    orderId: payload?._id,
                                    userEmail: payload.userInfo.email
                                }
                            );

                            setIsLoggedIn(res?.data);

                        } else {

                            toast.error("Payment Failed");

                        }

                        navigate("/thank-you-page");

                        // Display a success message to the user

                    } catch (error) {

                        navigate("/cart");

                        toast.error("payment Failed");

                        console.error("Error while sending payment response to server:", error.message);
                        // Display an error message to the user
                    }
                },
                prefill: {
                    name: "Himanshu Jain",
                    email: "amanjain9551@gmail.com",
                    contact: "9927813277",
                },
                notes: {
                    address: "Gwalior (M.P)",
                },
                theme: {
                    color: "#61dafb",
                },
            };

            // Open Razorpay payment modal
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error("Error in razorpayHandler:", error.message);
            // Display user-friendly error message to the user
            // You can use a library like react-toastify or show errors in a modal
        }
    }


    const sumbitHandler = async () => {

        if (selectedPaymentMethod === "COD") {

            alert("Comming Soon");
            console.log("call the backend and update the value of payment as cod and show thank u page");

        } else {
            const res = await createOrder();
            await razorpayHandler(res);
            await ApiCalling("POST", "product/updateProductSale", {
                orderId: res?._id
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            );
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
