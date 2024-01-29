import React, { useEffect, useState } from 'react';
import ApiCalling from "../../../../services/Api";

function LatestOrders() {
    const [data, setData] = useState(null);

    async function getData() {
        const res = await ApiCalling("Get", "order/getLatestOrders");
        console.log("res: ", res);

        if (res.success) {
            setData(res.data);
        }
    }

    useEffect(() => {
        getData();
    }, [])
    return (
        <div>
            {
                data?.map((order) => (
                    <div
                        key={order?._id}
                    >
                        <hiii></hiii>
                    </div>
                ))
            }
        </div>
    )
}

export default LatestOrders;
