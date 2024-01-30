import React, { useState, useEffect } from 'react';
import { ApiCalling } from "../../../../services/api"

function CreateCoupon() {


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

        console.log(res);

        if (res.success) {

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
        <div>
            <div className='flex flex-col gap-10 justify-start items-center'>

                <div>
                    <p className='text-3xl text-center font-semibold'>Create Coupon</p>
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
                            className='outline-none px-2 py-2 w-[300px] rounded-sm font-semibold text-lg text-[black]/[0.7]'
                            placeholder='Enter Coupon Code'
                            id='code'
                            name='code'
                            value={formData.code}
                            onChange={changeHandler}
                            required
                        />

                    </div>

                    {/* discountType
                    <div className='flex flex-col gap-1'>
                        <label
                            htmlFor="code"
                            className='text-lg font-semibold text-[black]/[0.8]'
                        >Coupon Code</label>
                        <input
                            type="text"
                            className='outline-none px-2 py-2 w-[300px] rounded-sm font-semibold text-lg text-[black]/[0.7]'
                            placeholder='Enter Coupon Code'
                            id='code'
                            name='code'
                            value={formData.code}
                            onChange={changeHandler}
                            required
                        />

                    </div> */}

                    {/* discountAmount */}
                    <div className='flex flex-col gap-1'>
                        <label
                            htmlFor="discountAmount"
                            className='text-lg font-semibold text-[black]/[0.8]'
                        >Discount Amount</label>
                        <input
                            type="number"
                            min={0}
                            className='outline-none px-2 py-2 w-[300px] rounded-sm font-semibold text-lg text-[black]/[0.7]'
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
                            className='outline-none px-2 py-2 w-[300px] rounded-sm font-semibold text-lg text-[black]/[0.7]'
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
                            className='outline-none px-2 py-2 w-[300px] rounded-sm font-semibold text-lg text-[black]/[0.7]'
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
