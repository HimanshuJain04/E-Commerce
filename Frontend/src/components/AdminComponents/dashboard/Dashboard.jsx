import React from 'react'
import UserDevice from './usefulComponents/UserDevice'
import Cards from './usefulComponents/Cards';
import TodaysDeatailCards from './usefulComponents/TodaysDeatailCards';
import LatestOrders from './usefulComponents/LatestOrders';


function Dashboard({ setOption }) {
  return (
    <div className='py-10'>
      <div className='flex flex-col gap-10 justify-start items-center'>

        <div className='px-10 flex flex-col gap-7 w-full '>
          <Cards />
          <TodaysDeatailCards />
        </div>

        {/* Device */}
        <div className='flex justify-center items-center'>
          <UserDevice />
        </div>

        {/* latest orders */}
        <div className='w-full'>
          <LatestOrders setOption={setOption} />
        </div>

      </div>
    </div>
  )
}

export default Dashboard;