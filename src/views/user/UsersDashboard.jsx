import React from 'react'

const UsersDashboard = () => {
  return (
    <div className='pb-5 w-full flex flex-wrap px-2' >
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className='text-3xl font-bold'>123 </h2>
            {/* <h2 className='text-3xl font-bold'><span>&#8369;</span> {totalSale} </h2> */}
            <span className='text-md font-medium'>Total Sales</span>

          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-3xl">
            {/* <TbCurrencyPeso className='text-[#28c76f] shadow-lg' /> */}
          </div>

      </div>
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className='text-3xl font-bold'>asd</h2>
            <span className='text-md font-medium'>Listings</span>

          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-3xl">
          {/* <HiTemplate className='text-[#28c76f] shadow-lg' /> */}
          </div>

      </div>
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className='text-3xl font-bold'>asd</h2>
            <span className='text-md font-medium'>Farmers/Sellers</span>

          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-3xl">
          {/* <FaUserFriends className='text-[#28c76f] shadow-lg' /> */}
          </div>

      </div>
     
      <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className='text-3xl font-bold'>asd</h2>
            <span className='text-md font-medium'>Deals</span>

          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-3xl">
          {/* <FaHandshake className='text-[#28c76f] shadow-lg' /> */}
          </div>
      </div>
    </div>

    </div>
  )
}

export default UsersDashboard