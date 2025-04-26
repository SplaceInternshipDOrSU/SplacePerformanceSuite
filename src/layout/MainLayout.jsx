import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
// import { socket } from '../utils/Utils'
import { useSelector } from 'react-redux'
// import { useDispatch, useSelector } from 'react-redux'

const MainLayout = () => {
  // const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.auth)

  const [showSidebar, setShowSidebar] = useState(true) // Sidebar visible by default on large screens

  useEffect(() => {
    if (userInfo && userInfo.role === "seller") {
      // socket.emit('add_seller', userInfo._id, userInfo)
    } else {
      // socket.emit('add_admin', userInfo)
    }
  }, [userInfo])

  useEffect(() => {
    // socket.on('activeCustomer', (customers) => {
    //   console.log(customers)
    // })
  }, [])
  

  return (
    <div className="bg-[#161d31] w-full min-h-screen" >
    <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    
    {/* Content Adjusts Based on Sidebar */}
    <div className={`transition-all duration-300 pt-[95px] ${showSidebar ? 'ml-0 lg:ml-[245px] mr-6' : 'ml-0 lg:ml-[90px] mr-6'}`}>
      <Outlet />
    </div>
  </div>
  )
}

export default MainLayout
