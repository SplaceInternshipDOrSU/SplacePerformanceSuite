import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getNavs } from '../navigation/index'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/Reducers/authReducer'
import { IoMdExit } from "react-icons/io";
import { FaTimes } from "react-icons/fa";


const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { role } = useSelector(state => state.auth)
  const { pathname } = useLocation()
  const [allNav, setAllNav] = useState([])

  useEffect(() => {
    const navs = getNavs(role)
    setAllNav(navs)
  }, [role])

  return (
    <div>
    {/* Overlay for mobile screens */}
    <div onClick={() => setShowSidebar(false)}
      className={`fixed duration-200 ${!showSidebar ? 'invisible' : 'visible'} w-screen h-screen bg-[#22292f80] top-0 left-0 z-[9999999] lg:hidden`}
    ></div>

    {/* Sidebar */}
    <div className={`fixed bg-[#283046] z-[99999999] top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all duration-300 ease-in-out
      ${showSidebar ? 'w-[230px] left-0' : 'w-0 -left-[260px] lg:w-[70px] lg:left-0'}`}>

      <div className="h-[70px] flex justify-center items-center">
        <Link
          to="/"
          className={`transition-all duration-300 ease-in-out ${showSidebar ? 'w-[200px]' : 'w-[40px]'}`}
        >
          <img
            className={`h-full w-full  ${showSidebar ? 'px-8 py-10' : 'px-0 py-0'}`}
            src={showSidebar ? '/images/Splace_LOGO.png' : '/images/Splace_logo_sm.png'}
            alt="Logo"
          />
        </Link>
      </div>


      <div className="px-[16px] pt-3">
      <ul>
  {allNav.map((n, i) => (
    <li key={i} className="relative group ">
      <Link 
        to={n.path} 
        className={`${pathname === n.path ? 'bg-slate-600 text-white' : 'text-[#d0d2d6]'} 
          flex items-center py-[5px] px-[12px] rounded-sm transition-all duration-300 ease-in-out hover:pl-5`}
      >
        <div className="flex items-center gap-3 w-full">
          <span>{n.icon}</span>
          <span 
            className={`transition-opacity duration-300 ${showSidebar ? 'opacity-100' : 'opacity-0 h-[30px] '}`}
          >
            {n.title}
          </span>
        </div>
      </Link>

      {/* Tooltip (Only visible when sidebar is collapsed) */}
      {!showSidebar && (
        <span 
          className="absolute left-[63px]  top-1/2 transform -translate-y-1/2 scale-95 opacity-0 px-4 font-bold text-sm text-white bg-gray-700 rounded-md shadow-md transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-2 py-2"
        >
          {n.title}
        </span>
      )}
    </li>
  ))}

  <li className="relative group">
    <button 
      onClick={() => dispatch(logout({ navigate, role }))}
      className="text-[#d0d2d6] flex items-center gap-3 px-[12px] py-[9px] rounded-sm transition-all duration-300 ease-in-out hover:pl-5 w-full"
    >
      <div className="flex items-center gap-3 w-full">
        <span><IoMdExit /></span>
        <span 
          className={`transition-opacity duration-300 ${showSidebar ? 'opacity-100' : 'opacity-0 w-0'}`}
        >
          Logout
        </span>
      </div>
    </button>

    {/* Tooltip for Logout */}
    {!showSidebar && (
      <span 
        className="absolute left-[70px] top-1/2 transform -translate-y-1/2 scale-95 opacity-0 px-4 py-2 font-bold text-sm text-white bg-gray-700 rounded-md shadow-md transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-2"
      >
        Logout
      </span>
    )}
  </li>
</ul>

      </div>

  

    </div>
  </div>
  //   <div>
  //   <div onClick={()=>{setShowSidebar(false)}} className={`fixed duration-200 ${!showSidebar ? 'invisible' : 'visible' } w-screen h-screen bg-[#22292f80] top-0 left-0 z-[9999999] lg:hidden `}></div>

  //   <div className={`w-[260px] fixed bg-[#283046] z-[99999999] top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all ${showSidebar ? 'left-0':'-left-[260px] lg:left-0'}`}>
  //     <div className="h-[70px] flex justify-center items-center">
  //         <Link to='/' className='w-[200px] h-[50px]'>
  //         <img className='h-full w-full' src="/images/FarmFuture_LOGO.png" alt="Logo" />
  //         </Link>
  //       </div>
  //     <div className="px-[16px]">

  //       <ul>
  //         {
  //           allNav.map((n, i) => <li key={i}>
  //             <Link to={n.path} className={`${pathname === n.path ? 'bg-slate-600 shadow-indigo-500/30 text-white' : 'text-[#d0d2d6] font-normal duration-200'}  px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-3 hover:pl-4 transition-all w-full z-[999999999999]`}>
  //               <span>{n.icon}</span>
  //               <span>{n.title}</span>
  //             </Link>
  //           </li>)
  //         }

          
  //         <li>
  //           <button onClick={()=>dispatch(logout({navigate,role }))} className='text-[#d0d2d6] font-normal duration-200 px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-3 hover:pl-4 transition-all w-full'>
  //             <span><IoMdExit /></span>
  //             <span>Logout</span>
  //           </button>          
  //         </li>
  //       </ul>

  //     </div>
  //     <div className="absolute bottom-2 right-0 left-0">
  //       <div className="w-full flex items-center justify-center text-slate-200">
  //         {/* <InstallPWAButton/> */}
  //       </div>
  //     </div>
  //   </div>
  // </div>
  )
}

export default Sidebar
