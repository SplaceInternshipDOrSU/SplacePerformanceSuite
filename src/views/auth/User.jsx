import React from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineGooglePlus,AiFillGithub, AiFillTwitterSquare} from 'react-icons/ai'
import {FiFacebook} from 'react-icons/fi'


import { FaRegUserCircle } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";



const User = () => {




    
    
  return (
    <div className='min-w-screen min-h-screen bg-main-bg flex justify-center items-center relative' style={{
        backgroundImage: "url('/images/background.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
      }}>
      
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        <div className="relative z-10 w-10/12 lg:w-[500px] bg-white rounded-lg text-[#d0d2d6] p-2 shadow-xl">
            <div className="p-4 text-center">
                <h2 className='text-2xl mb-1 text-center text-slate-800 font-semibold'>Welcome to <Link to={'/admin/login'} className='font-extrabold text-accent italic'>SplacHR</Link></h2>
                <p className='text-xs text-slate-400 font-bold'>which user are you?</p>
                <div className="flex justify-between gap-1 mt-4 ">
                    <Link to={'/login'} className="w-6/12 bg-accent hover:bg-white hover:text-accent border-accent border-4  rounded-md flex justify-center flex-col items-center py-5 transition-all duration-300 text-white ">
                    <FaRegUserCircle size={50} />
                        <h2 className='font-bold'>USER</h2>
                    </Link >
                    <Link to={'/admin/login'} className="w-6/12 bg-accent hover:bg-white hover:text-accent border-accent border-4  rounded-md flex justify-center flex-col items-center py-5 transition-all duration-300 text-white">
                    <MdAdminPanelSettings size={50}/>
                        <h2 className='font-bold'>ADMIN</h2>
                    </Link >
                  
                   
                </div>
               
               
            </div>
        </div>

        <div className="absolute bottom-0 text-slate-400 text-xs py-1">
            {/* <p>Copyright © 2025 FarmFuture.com, Alrigths reserved</p> */}
            {/* <InstallPWAButton/> */}
        </div>
    </div>
  )
}

export default User