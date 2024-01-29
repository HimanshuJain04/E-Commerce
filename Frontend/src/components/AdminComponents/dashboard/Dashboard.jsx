import React from 'react'
import UserDevice from './usefulComponents/UserDevice'
import Cards from './usefulComponents/Cards';


function Dashboard() {
  return (
    <div className='py-10'>
      <div className='flex flex-col gap-10 justify-start items-center'>

        <div className=' px-10 w-full '>
          <Cards />
        </div>

        {/* cards */}
        <div className='w-full px-10'>

          {/* visitors  */}

          {/* pageView */}

          {/* today revenue */}

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