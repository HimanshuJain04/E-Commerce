import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

function MyOrders() {
    const { isLoggedIn } = useContext(AppContext);
    console.log(isLoggedIn);

    return (
        <div>
            <div>
                <div>
                    {
                        isLoggedIn?.orders?.map((order) => (
                            <div
                                key={order?._id}
                            >
                                <div
                                    className=''
                                >
                                    ji
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>

        </div>
    )
}

export default MyOrders