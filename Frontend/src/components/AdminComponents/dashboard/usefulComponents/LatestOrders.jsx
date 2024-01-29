import React, { useEffect, useState } from 'react';
import { ApiCalling } from "../../../../services/Api";
import { MdOutlineCurrencyRupee } from "react-icons/md";

function LatestOrders({ setOption }) {

    const [data, setData] = useState(null);

    async function getData() {
        const res = await ApiCalling("GET", "order/getLatestOrders");
        console.log("res: ", res);

        if (res.success) {
            setData(res.data);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const options = [
        "OrderSet Id",
        "Order Id",
        "Payment Method",
        "Status",
        "Total Amount",
    ]


    return (
        <div className="flex flex-col font-semibold mx-10 pb-5 rounded-md bg-white shadow-xl">
            <div className='w-full rounded-md bg-white flex justify-between items-center p-3'>
                <div>
                    <p className='text-xl font-semibold text-[black]/[0.7]'>Recent Orders</p>
                </div>

                <div>
                    <button
                        onClick={() => { setOption("Orders") }}
                        className='px-5 py-2 hover:text-[yellow]/[0.8] transition-all duration-300 ease-in-out bg-red-500 text-white rounded-md'
                    >View All</button>
                </div>

            </div>
            <div className="flex justify-between items-center bg-red-200 px-10 py-3 gap-10">
                {options.map((option) => (
                    <div key={option} className="flex items-center w-1/5">
                        <p className="text-start">{option}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white">
                {data?.map((order) => (
                    <div key={order?._id}>
                        {order.products.map((productInfo) => (
                            <div
                                key={productInfo?._id}
                                className="flex justify-between p-5 items-center border-b-2 border-[black]/[0.05] gap-4"
                            >
                                {/* Order Set ID */}
                                <div className="w-1/5 overflow-hidden">
                                    <p className="whitespace-nowrap overflow-hidden">{order._id}</p>
                                </div>

                                {/* Order ID */}
                                <div className="w-1/5 overflow-hidden">
                                    <p className="whitespace-nowrap overflow-hidden">{productInfo._id}</p>
                                </div>

                                {/* Payment Option */}
                                <div className="w-1/6">
                                    <p>{order.paymentOption}</p>
                                </div>

                                {/* Status of Order */}
                                <div className="w-1/6">
                                    <p className={`${productInfo.status === "Rejected" ? "text-red-800" :
                                        productInfo.status === "Pending" ? "text-yellow-400" :
                                            "text-[black]/[0.6]"
                                        }`}>{productInfo.status}</p>
                                </div>

                                {/* Amount of Order */}
                                <div className="w-1/6 flex items-center gap-2">
                                    <span><MdOutlineCurrencyRupee /></span>
                                    <p>{productInfo.amount * productInfo.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );



}

export default LatestOrders;
