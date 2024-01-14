import React, { useContext, useEffect, useState } from 'react';
import ProductTemplate from "../components/common/ProductTemplate";
import { AppContext } from '../context/AppContext';

function Wishlist() {

  const { isLoggedIn } = useContext(AppContext)

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(isLoggedIn?.wishlists);

  }, [isLoggedIn, data]);

  return (
    <div className='justify-center items-center w-full flex'>
      {
        data?.length > 0 ? (

          // wishlist is not empty

          <div className='  w-11/12 flex gap-10 justify-start items-start flex-wrap'>
            {
              data?.map((product) => (
                <ProductTemplate key={product?._id} data={product} />
              ))
            }
          </div>

        ) : (

          // wishlist is empty

          <div>
            <span>
              <p className='text-5xl font-semibold'>Wishlist Is Empty</p>
            </span>
          </div>
        )
      }
    </div>
  )
}

export default Wishlist