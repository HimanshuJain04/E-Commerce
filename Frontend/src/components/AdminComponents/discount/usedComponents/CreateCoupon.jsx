import React, { useState, useEffect } from 'react';
import { ApiCalling } from "../../../../services/api";
import { RxCross1 } from "react-icons/rx";


const options = [
    {
        title: "Percentage",
        value: "percentage"
    },
    {
        title: "Fixed",
        value: "fixed"
    },
    {
        title: "Free Shipping",
        value: "free_shipping"
    },
    {
        title: "Buy One Get One Free",
        value: "BOGO"
    },

]

function CreateCoupon({ setShowCreateCoupon }) {


    const [formData, setFormData] = useState(
        {
            code: "",
            discountType: "",
            discountAmount: "",
            expirationDate: "",
            minimumPurchaseAmount: "",
        }
    );


    async function sumbitHandler() {
        const res = await ApiCalling("POST", "coupon/createCoupon", formData);

        if (res.success) {

            setShowCreateCoupon(false);

            // show the message to the admin

            // emtpy the fields
            setFormData(
                {
                    code: "",
                    discountType: "",
                    discountAmount: "",
                    expirationDate: "",
                    minimumPurchaseAmount: "",
                }
            );
        }
    }


    function changeHandler(e) {

        setFormData(
            {
                ...formData,
                [e.target.name]: e.target.value
            }
        )
    }


    return (
        <div className='flex justify-center items-center'>
            <div className='flex bg-white shadow-xl relative rounded-lg px-14 py-8 flex-col gap-10 justify-start items-center'>

                <div className='absolute right-5 top-5'>
                    <button onClick={() => {
                        setShowCreateCoupon(false)
                    }} className=''><RxCross1 /></button>
                </div>

                <div>
                    <p className='text-4xl text-center font-semibold'>Create Coupon</p>
                </div>

                <div className='flex flex-col gap-4 justify-start items-center'>

                    {/* Code */}
                    <div className='flex flex-col gap-1'>
                        <label
                            htmlFor="code"
                            className='text-lg font-semibold text-[black]/[0.8]'
                        >Coupon Code</label>
                        <input
                            type="text"
                            className='outline-none border-2 border-[black]/[0.2] rounded-md px-2 py-2 w-[300px] font-semibold text-lg text-[black]/[0.7]'
                            placeholder='Enter Coupon Code'
                            id='code'
                            name='code'
                            value={formData.code}
                            onChange={changeHandler}
                            required
                        />

                    </div>

                    {/* discountType */}
                    <div className='flex flex-col gap-1'>
                        <label
                            htmlFor="discountType"
                            className='text-lg font-semibold text-[black]/[0.8]'
                        >Discount Type</label>
                        <select onChange={changeHandler} value={formData.discountType} id="discountType" name="discountType" className='outline-none border-[black]/[0.2] border-2 rounded-md  cursor-pointer  py-3 px-2 w-[300px] uppercase'>
                            {
                                options.map((option) => (
                                    <option className='uppercase'
                                        key={option.value}
                                        value={option.value}
                                    > {option.title}</option>
                                ))
                            }
                        </select>
                    </div>

                    {/* discountAmount */}
                    <div className='flex flex-col gap-1'>
                        <label
                            htmlFor="discountAmount"
                            className='text-lg font-semibold text-[black]/[0.8]'
                        >Discount Amount</label>
                        <input
                            type="number"
                            min={0}
                            className='outline-none px-2 py-2 border-[black]/[0.2] border-2 w-[300px] rounded-md font-semibold text-lg text-[black]/[0.7]'
                            placeholder='Enter Discount Amount'
                            id='discountAmount'
                            name='discountAmount'
                            value={formData.discountAmount}
                            onChange={changeHandler}
                            required
                        />

                    </div>


                    {/* minimumPurchaseAmount */}
                    <div className='flex flex-col gap-1'>
                        <label
                            htmlFor="minimumPurchaseAmount"
                            className='text-lg font-semibold text-[black]/[0.8]'
                        >Minimum Purchase Amount</label>
                        <input
                            type="number"
                            min={0}
                            className='outline-none px-2 py-2 w-[300px] rounded-md border-[black]/[0.2] border-2 font-semibold text-lg text-[black]/[0.7]'
                            placeholder='Enter Minimum Purchase Amount'
                            id='minimumPurchaseAmount'
                            name='minimumPurchaseAmount'
                            value={formData.minimumPurchaseAmount}
                            onChange={changeHandler}
                            required
                        />

                    </div>

                    {/* expirationDate */}
                    <div className='flex flex-col gap-1'>
                        <label
                            htmlFor="expirationDate"
                            className='text-lg font-semibold text-[black]/[0.8]'
                        >Expiration Date</label>
                        <input
                            type="date"
                            className='outline-none px-2 py-2 w-[300px] rounded-md border-[black]/[0.2] border-2 font-semibold text-lg text-[black]/[0.7]'
                            placeholder='Enter Expiration Date'
                            id='expirationDate'
                            name='expirationDate'
                            value={formData.expirationDate}
                            onChange={changeHandler}
                            required
                        />

                    </div>

                </div>

                <div>
                    <button
                        className='bg-blue-700 text-white rounded-md font-semibold px-10 py-3'
                        onClick={sumbitHandler}
                    >Create Coupon</button>
                </div>


            </div>
        </div>
    )
}

export default CreateCoupon
