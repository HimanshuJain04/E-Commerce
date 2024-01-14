import React from 'react';
import { ApiCalling } from "../services/Api";

function RazorpayPayment() {

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function sumbitHandler() {

        const orderId = "r4u98n-vvd-vdkjzv";
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const options = {
            orderId: orderId,
            amount: 200,
            currency: "INR",
            payment_capture: 1
        }

        const result = await ApiCalling("POST", "user/createOrderByRazorpay", options);

        console.log("result : ", result);

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        // call the card-datails

        if (!result?.data) {
            alert("Server Error");
            return;

        } else {

            const options = {
                key: "rzp_test_yZUDNfudlt7pwH",
                amount: result?.data.amount * 100,
                currency: result?.data.currency,
                name: "Ecommerce",
                description: "Test Transaction",
                image: {},
                order_id: result?.data?.id,
                handler: async function (response) {
                    console.log("Res : ", response);
                    // const data = {
                    //     orderCreationId: order_id,
                    //     razorpayPaymentId: response.razorpay_payment_id,
                    //     razorpayOrderId: response.razorpay_order_id,
                    //     razorpaySignature: response.razorpay_signature,
                    // };

                    // const result = await axios.post("http://localhost:5000/payment/success", data);

                    // alert(result.data.msg);
                },
                prefill: {
                    name: "Soumya Dey",
                    email: "SoumyaDey@example.com",
                    contact: "9999999999",
                },
                notes: {
                    address: "Soumya Dey Corporate Office",
                },
                theme: {
                    color: "#61dafb",
                },
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        }


    }

    return (
        <div>
            <button onClick={sumbitHandler}>Sumbit</button>
        </div>
    )
}

export default RazorpayPayment