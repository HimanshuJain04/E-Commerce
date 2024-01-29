import React from 'react'
import UserDevice from './usefulComponents/UserDevice'
import Cards from './usefulComponents/Cards';
import TodaysDeatailCards from './usefulComponents/TodaysDeatailCards';
import LatestOrders from './usefulComponents/LatestOrders';
import GenderRatio from './usefulComponents/GenderRatio';


function Dashboard({ setOption }) {
  return (
    <div className='pt-10 pb-20'>
      <div className='flex flex-col w-full px-10 gap-10 justify-start items-center'>

        <div className='w-full text-4xl font-semibold text-left'>
          <p>Dashboard</p>
        </div>

        <div className=' flex flex-col gap-7 w-full '>
          <Cards />
          <TodaysDeatailCards />
        </div>

        {/* Device */}
        <div className='flex justify-between w-full items-center'>
          <GenderRatio />
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