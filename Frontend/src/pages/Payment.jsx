import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const PaymentPage = () => {

  const { createOrder } = useContext(AppContext);

  const razorpayLogoUrl = 'https://via.placeholder.com/50'; // Replace with actual Razorpay logo URL

  const codLogoUrl = 'https://via.placeholder.com/50'; // Replace with actual COD logo URL

  // State to store the selected payment method
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  // Handler function to update the selected payment method
  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  // razorpay handler
  // const handleRazorpayPayment = async () => {
  //   const options = {
  //     key: 'YOUR_RAZORPAY_KEY_ID',
  //     amount: 50000, // amount in paise (e.g., for ₹500, multiply by 100)
  //     currency: 'INR',
  //     name: 'Your Company Name',
  //     description: 'Payment for your product or service',
  //     image: 'URL_TO_YOUR_LOGO',
  //     order_id: 'GENERATED_ORDER_ID', // This should be obtained from your server
  //     handler: function (response) {
  //       alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
  //       // You can handle the successful payment here
  //     },
  //     prefill: {
  //       name: 'John Doe',
  //       email: 'john@example.com',
  //       contact: '9876543210',
  //     },
  //     notes: {
  //       address: 'Razorpay Corporate Office',
  //     },
  //     theme: {
  //       color: '#3399cc',
  //     },
  //   };

  //   const razorpay = new Razorpay(options);
  //   razorpay.open();
  // };


  return (

    <div className="flex justify-center items-center h-screen bg-gray-100">
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
          />
          <label htmlFor="cod" className="flex items-center cursor-pointer">
            <img src={codLogoUrl} alt="COD Logo" className="w-8 h-8 mr-2" />
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
          />
          <label htmlFor="razorpay" className="flex items-center cursor-pointer">
            <img src={razorpayLogoUrl} alt="Razorpay Logo" className="w-8 h-8 mr-2" />
            Razorpay
          </label>

        </div>

        <button onClick={sumbitHandler} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
          Pay Now
        </button>
      </div>
    </div>
  );
};


export default PaymentPage;
