import React, { useContext } from 'react'
import { AppContext } from "../../../context/AppContext"

function Profile() {

  const { isLoggedIn } = useContext(AppContext);
  return (
    <div className='flex justify-center items-center min-h-[100vh]'>
      {
        isLoggedIn && (
          <div className='bg-white shadow-lg rounded-md p-5'>
            {/* image */}
            <div className='h-[200px] flex flex-col justify-start items-center w-[200px] rounded-full overflow-hidden'>
              <img
                className='rounded-full object-cover'
                src={isLoggedIn.profileImg}
                alt={isLoggedIn.name}
              />
            </div>
            {/* details about user */}
            <div className='w-full bg-red-100'>
              hi
            </div>
          </div>
        )
      }

    </div>
  )
}

export default Profile
