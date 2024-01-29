import { useEffect, useState } from 'react';
import { ApiCalling } from "../../../../services/Api";


function TotalCustomers() {

   

    useEffect(() => {
        getTotalUsers();
    }, []);

    return (
        <div className='flex rounded-md'>
            {
                data && (
                   
                )
            }
        </div>
    )
}

export default TotalCustomers;
