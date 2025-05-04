import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { get_user, user_status_update, messageClear,  } from '../../store/Reducers/userReducer'
import { Toaster } from 'react-hot-toast'
import { Tooltip } from 'react-tooltip'



const UserDetails = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {userId} = useParams()
    const [status, setStatus] = useState('')
    const {user, successMessage, errorMessage} = useSelector(state=>state.user)
    
    useEffect(()=>{
        dispatch(get_user(userId))
    }, [userId])


    const submit = (e) => {
        e.preventDefault() 
        dispatch(user_status_update({
            userId,
            status
        }))
        navigate('/admin/dashboard/active-users')        
        // navigate('/admin/dashboard/users')
    }


    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }else{
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    }, [successMessage])

    useEffect(() => {
        if (user) {
            setStatus(user.status)
        }
    }, [user])


    const [fullscreenImage, setFullscreenImage] = useState(null);

    const openFullscreen = (imageSrc) => {
      setFullscreenImage(imageSrc);
    };
  
    const closeFullscreen = () => {
      setFullscreenImage(null);
    };

    


  return (
    <div className='pt-5 '>
         <div className="w-full p-6 bg-[#283046] rounded-md">
            <h2 className='font-bold text-white text-[20px]'>Account Applicant Info</h2>
            <div className="w-full flex flex-wrap items-center text-text_color flex-col lg:flex-row ">
                <div className="lg:w-4/12 flex justify-start py-3">
                        <div className="relative group w-full h-[270px] text-center">
                            <div className="relative w-full h-full overflow-hidden flex items-center justify-center mx-auto ">
                            <img
                                src={user.profileImage}
                                alt="Profile Image"
                                className="w-full h-full object-contain cursor-pointer"
                                onClick={() => openFullscreen(user.profileImage)}
                            />
                            <div
                                onClick={() => openFullscreen(user.profileImage)}
                                className="absolute inset-0 bg-gray-900/75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                <span className="text-white font-bold text-lg">Click to Expand</span>
                            </div>
                            </div>
                        </div>
                </div>

                <div className="lg:w-8/12 text-slate-100 h-[270px]">
                    <div className="px-0 md:px-5 bg-slate-800">
                        <div className="py-2 text-lg">
                            <h2 className='font-bold'>Basic Info</h2>
                        </div>

                        <div className="flex justify-between text-base flex-col gap-2 p-1 bg-slate-800 rounded-md ">
                            <div className="flex gap-2">
                                <span>Name: </span>
                                <span>{user.firstName} {user.middleName} {user.lastName}</span>
                            </div>
                            <div className="flex gap-2 text-wrap ">
                                <span>Email: </span>
                                <span className='w-full text-wrap'>{user.email}</span>
                            </div>
                            <div className="flex gap-2 text-wrap ">
                                <span>Phone: </span>
                                <span className='w-full text-wrap'>{user.phoneNumber}</span>
                            </div>
                            <div className="flex gap-2 text-wrap ">
                                <span>Sex: </span>
                                <span className='w-full text-wrap'>{user.sex}</span>
                            </div>
                            <div className="flex gap-2">
                                <span>Role: </span>
                                <h2 className='font-bold uppercase text-accent '>{user.roleName}</h2>
                            </div>
                            <div className="flex gap-2">
                                <span>Category: </span>
                                <h2 className='font-bold uppercase text-accent '>{user.categoryName}</h2>
                            </div>
                            <div className="flex gap-2">
                                <span>Status: </span>
                                <span
                                    className={`font-semibold ${
                                        user.status === 'pending' ? 'text-orange-500' : 'text-green-500'
                                    }`}
                                    >
                                    {user.status}
                                    </span>
                            </div>
                           
                        </div>
                    </div>
                </div>
               

                <div className="w-full px-3 flex lg:flex-row flex-col justify-start  gap-2 mt-2">
                        {/* Fullscreen Modal */}
                        {fullscreenImage && (
                            <div
                            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[999999999999999]"
                            onClick={closeFullscreen}
                            >
                            <img
                                src={fullscreenImage}
                                alt="Fullscreen"
                                className="max-w-full max-h-full cursor-pointer"
                                onClick={(e) => e.stopPropagation()}
                                 data-tooltip-id="my-tooltip" data-tooltip-content="Click to Expand"
                            />
                            </div>
                        )}

                      
                        </div>
                    </div>


                    <div className="">
                        <form action="" onSubmit={submit}>
                            <div className="flex gap-4 py-3">
                                <select 
                                    value={status} 
                                    onChange={(e) => setStatus(e.target.value)}  
                                    className='px-4 py-1 focus:border-accent outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' 
                                    name="" 
                                    id=""
                                >
                                    <option value="">--select status</option>
                                    <option value="active">ACTIVATE ACCOUNT</option>
                                    <option value="deactive">REJECT</option>
                                </select>
                                <button 
                                    type="submit"
                                    disabled={!status} 
                                    className={`bg-accent w-[300px] hover:shadow-accent/50 hover:shadow-md rounded-md px-7 py-2 font-bold text-slate-100 ${!status ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    SUBMIT
                                </button>
                            </div>
                        </form>
                    </div>

         </div>
    </div>
  )
}

export default UserDetails