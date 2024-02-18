import React, { useEffect } from 'react'
import { useState } from 'react';
import { ApiCalling } from "../services/Api.js";
import { useLocation } from 'react-router-dom';
import { toast } from "react-toastify"

function Verification() {

  const [verified, setVerified] = useState(false);

  const { pathname } = useLocation();
  const verificationId = pathname.split("/").at(-2);
  const userId = pathname.split("/").at(-1);


  useEffect(() => {
    const verifyEmail = async () => {

      setVerified(false);

      const { data } = await ApiCalling("GET", `auth/verify/${verificationId}/${userId}`);
      if (data?.success) {
        toast.success("Verification Successfully");
        setVerified(true);
      } else {
        toast.error(data?.message);
      }
    }

    verifyEmail();
  }, []);


  return (
    <div className='w-full  h-[calc(100vh-80px)] flex justify-center items-center'>

      <div className='bg-blue-700 text-white text-5xl font-bold px-10 py-5 rounded-md'>

        {
          verified ? (
            // true
            <div>Verified</div>
          ) : (
            <div>Wait</div>
          )
        }



      </div>

    </div>
  )
}

export default Verification