import React, { useState } from 'react'

function VerifyOtp() {

    const [otp, setOtp] = useState(
        {
            box1: "",
            box2: "",
            box3: "",
            box4: "",
            box5: "",
        }
    )


    function verifyHandler() {

    }
    function changeHandler(e) {
        setOtp(
            {
                ...otp,
                [e.target.name]: e.target.value
            }
        )

    }



    return (
        <div className='flex flex-col gap-10 mt-5 justify-start items-center w-full'  >

            <div>
                <p className='text-2xl font-semibold text-[black]/[0.6]'>Verify OTP</p>
            </div>

            {/* otp field */}
            <div
                className='flex gap-5 justify-center items-center'
            >

                {/* box-1 */}
                <div>
                    <input
                        required
                        type="text"
                        maxLength={1}
                        className='p-5 text-xl w-[55px]  outline-none rounded-xl bg-white font-semibold'
                        value={otp.box1}
                        onChange={changeHandler}
                        name='box1'
                    />
                </div>

                {/* box-2 */}

                <div>
                    <input
                        required
                        type="text"
                        maxLength={1}
                        className='p-5 text-xl w-[55px]  outline-none rounded-xl bg-white font-semibold'
                        value={otp.box2}
                        onChange={changeHandler}
                        name='box2'
                    />
                </div>

                {/* box-3 */}
                <div>
                    <input
                        required
                        type="text"
                        maxLength={1}
                        className='p-5 text-xl w-[55px]  outline-none rounded-xl bg-white font-semibold'
                        value={otp.box3}
                        onChange={changeHandler}
                        name='box3'
                    />
                </div>

                {/* box-4 */}
                <div>
                    <input
                        required
                        type="text"
                        maxLength={1}
                        className='p-5 text-xl w-[55px]  outline-none rounded-xl bg-white font-semibold'
                        value={otp.box4}
                        onChange={changeHandler}
                        name='box4'
                    />
                </div>

                {/* box-5 */}
                <div>
                    <input
                        required
                        type="text"
                        maxLength={1}
                        className='p-5 text-xl w-[55px]  outline-none rounded-xl bg-white font-semibold'
                        value={otp.box5}
                        onChange={changeHandler}
                        name='box5'
                    />
                </div>

            </div>



            {/* button */}
            <div className='my-5' >
                <button
                    onClick={verifyHandler}
                    className='bg-green-600 font-bold text-white py-3 hover:text-green-600 rounded-md hover:bg-transparent px-10 border-[3px] transition-all duration-300 ease-in-out border-transparent hover:border-green-600'
                >Verify</button>
            </div>


        </div >
    )
}

export default VerifyOtp;