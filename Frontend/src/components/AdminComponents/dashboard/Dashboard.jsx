import React from 'react'
import UserDevice from './usefulComponents/UserDevice'
import TotalCustomers from "./usefulComponents/TotalCustomers";


function Dashboard() {
  return (
    <div className='py-10'>
      <div className='flex flex-col gap-10 justify-start items-center'>

        {/* cards */}
        <div className='flex justify-between items-center gap-10'>
          {/* registered User */}
          <TotalCustomers />

          {/* visitors  */}

          {/* pageView */}

          {/* total revenue */}

          {/* today revenue */}

          {/* Total orders */}

          {/* Today orders */}

          {/* Pending orders */}

          {/* Today Products */}

          {/* latest orders 10 */}

        </div>

        {/* user agent */}
        <div className='flex justify-center items-center'>
          <UserDevice />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;