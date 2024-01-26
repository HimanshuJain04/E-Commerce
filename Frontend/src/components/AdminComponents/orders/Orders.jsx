import React, { useEffect } from 'react';
import { ApiCalling } from "../../../services/Api";



function Orders() {

  async function fun() {
    const res = await ApiCalling("GET", "order/getAllOrders");
    console.log(res)
  }

  useEffect(() => {

    fun();

  }, [])

  return (
    <div>

    </div>
  )
}

export default Orders
