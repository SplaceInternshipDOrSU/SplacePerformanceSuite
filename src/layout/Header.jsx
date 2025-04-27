import React from 'react';
import { FaList } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { BiSolidCheckCircle } from "react-icons/bi";
import { FaAngleUp } from "react-icons/fa";
import { Tooltip } from 'react-tooltip'
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";



const Header = ({ showSidebar, setShowSidebar }) => {
  const { userInfo } = useSelector(state => state.auth);

  // const userInfo = {role : "admin",name: "name"}

  return (
    <div className='fixed top-0 left-0 w-full lg:px-6 px-2 py-3 z-[9999]'>
    <div className={`ml-0 ${showSidebar ? 'lg:ml-[220px]' : 'lg:ml-16'} h-[65px] flex justify-between items-center bg-[#283046] text-[#d0d2d6] px-5 transition-all rounded-md`}>
      {/* Sidebar Toggle Button (Always Visible) */}
      <div 
        onClick={() => setShowSidebar(!showSidebar)} 
        className="w-[35px] flex h-[35px] rounded-sm bg-accent shadow-lg hover:shadow-accent/50 justify-center items-center cursor-pointer"
      >
        <span><FaList /></span>
      </div>

      {/* User Profile Section */}
      <div className="flex justify-center items-center gap-8 relative">
        <div className="flex justify-center items-center gap-3">
          <div className="flex justify-center items-center gap-2">
            <div className="flex justify-center items-center flex-col text-end">
              <div className="flex items-center gap-1 flex-col">
                {
                  userInfo.role === "admin"? (
                    <div className="">
                       <h2 className='text-sm font-bold'>{userInfo?.role}</h2>
                    </div>
                  ):
                  (
                    <div className="">
                      <div className=" border-b">
                          <h2 className='text-sm font-bold'>{userInfo?.name}</h2>
                      </div>
          
                     <h2 className='text-sm font-bold'>{userInfo?.role}</h2>
                    </div>
                  )
                }
                
              </div>
            </div>  

            {/* Profile Image */}
            <div className="relative">
              {userInfo?.profileImage ? (
                <img className='h-[45px] w-[45px] rounded-full border-2' src={userInfo.profileImage} alt="User" />
              ) : (
                <div className="h-[45px] w-[45px] rounded-full bg-white flex justify-center items-center">
                  <FaUserAlt size={23} />
                </div>
                // <img className='h-[45px] w-[45px] rounded-full' src="/images/admin-img.png" alt="Default User" />
              )}
              <div className="absolute bottom-1 -right-1 rounded-full border-1 bg-white">
                {
                  userInfo.role === "admin"? (
                    <div className="rounded-full p-[3px] ">
                        <FaLock size={14} color='#FF3366' className='ml-[2px]' />
                    </div>
                  
                  ):(
                    <div className="rounded-full">
                      {
                        userInfo?.status === "active" ? (
                          <BiSolidCheckCircle size={20} color='#05E04B' data-tooltip-id="my-tooltip" data-tooltip-content="Verified" />
                        ):(
                          <FaAngleUp size={20} color='#FF3366' data-tooltip-id="my-tooltip" data-tooltip-content="Account Up for Review"/>
                        )
                      }
                    </div>
                  )
                }

              <Tooltip id="my-tooltip" className=''/> 
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
    
  );
}

export default Header;
