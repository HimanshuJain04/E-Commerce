import { useEffect, useState } from 'react';
import { ApiCalling } from "../../../../services/Api";
import { FaUsers } from "react-icons/fa";


function TotalCustomers() {

    const [data, setData] = useState(null);

    async function getTotalUsers() {
        const res = await ApiCalling("GET", "user/getTotalCustomers")
        if (res.success) {
            setData(res.data)
        }
    }

    useEffect(() => {
        getTotalUsers();
    }, []);

    return (
        <div className='flex rounded-md'>
            {
                data && (
                    <div className='flex justify-center p-5 shadow-lg rounded-md bg-red-500 items-center gap-10'>
                        <div className='flex flex-col gap-2 items-center'>
                            <span className='text-3xl font-semibold'>{data}</span>
                            <p className='text-lg font-semibold'>Registered User</p>
                        </div>
                        <div className='text-[100px] text-white'>
                            <FaUsers />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default TotalCustomers;
