import React, { useState, useEffect } from 'react';
import { ApiCalling } from "../../../../services/api"

function AllCoupons() {

    const [data, setData] = useState(null);

    async function getData() {
        const res = await ApiCalling("GET", 'coupon/getAllCoupons');

        console.log(res)

        if (res.success) {
            setData(res.data);
        }
    }


    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            his
        </div>
    )
}

export default AllCoupons
