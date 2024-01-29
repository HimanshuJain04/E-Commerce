import React from 'react'
import UserDevice from './usefulComponents/UserDevice'
import Cards from './usefulComponents/Cards';
import TodaysDeatailCards from './usefulComponents/TodaysDeatailCards';
import LatestOrders from './usefulComponents/LatestOrders';
import GenderRatio from './usefulComponents/GenderRatio';
import SalesOnDayBasis from './usefulComponents/SalesOnDayBasis';
import CategoryStats from './usefulComponents/CategoryStats';
import TagStats from "./usefulComponents/TagStats";


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

        {/* sales chart and pie charts */}
        <div className='flex justify-between items-start w-full'>
          <SalesOnDayBasis />
          <UserDevice />
        </div>

        {/* chart */}
        <div className='flex flex-row justify-between gap-10 items-center'>
          <GenderRatio />
          <CategoryStats />
          <TagStats />
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