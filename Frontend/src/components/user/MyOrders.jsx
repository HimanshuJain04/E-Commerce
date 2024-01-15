import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import Order from '../productTemplates/Order';

function MyOrders() {
    const { isLoggedIn } = useContext(AppContext);
    console.log("LogediN : ", isLoggedIn);

    return (
        <div>
            <div className='w-10/12 bg-red-100 mx-auto flex justify-center items-start '>
                <div>
                    {
                        isLoggedIn?.orders?.map((order) => (
                            <Order order={order} key={order?._id} />
                        ))
                    }
                </div>

            </div>

        </div>
    )
}

export default MyOrders;