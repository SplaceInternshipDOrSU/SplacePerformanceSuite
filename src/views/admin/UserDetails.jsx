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

        navigate('/admin/dashboard/user-requests')
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
    <div className='pt-5'>
         <div className="w-full p-6 bg-[#283046] rounded-md">
            <h2 className='font-bold text-white text-[20px]'>Account Applicant Info</h2>
            <div className="w-full flex flex-wrap text-text_color flex-col lg:flex-row ">
                <div className="lg:w-4/12 flex justify-start py-3">
                    <div className="text-center group relative">
                                <div className="w-full  overflow-hidden flex items-center justify-center mx-auto relative">
                                    <img
                                        src={user.profileImage}
                                        alt="Profile Image"
                                        className="w-full object-cover cursor-pointer"
                                        onClick={() => openFullscreen(user.profileImage)}
                                    />
                                    {/* Hover Text */}
                                <div onClick={() => openFullscreen(user.profileImage)} className=" absolute inset-0 bg-gray-900/75 bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-white font-bold text-lg">Click to Expand</span>
                                </div>
                                    </div>
                                 </div>
                </div>
                <div className="lg:w-8/12 text-slate-100">
                    <div className="px-0 md:px-5 py-2">
                        <div className="py-2 text-lg">
                            <h2 className='font-bold'>Basic Info</h2>
                        </div>

                        <div className="flex justify-between text-base flex-col gap-2 p-4 bg-slate-800 rounded-md ">
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
                                <h2 className='font-bold uppercase text-accent '>{user.role}</h2>
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
               

              <div className="mt-5">
                <h2 className='font-bold text-lg text-slate-100'>Applicant's Credentials</h2>
              </div>
                <div className="w-full px-3 flex justify-start gap-2 mt-2">
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

                        {/* Thumbnails */}
                        {user.credential_img01 && (
                             <div className="text-center group relative">
                             <div className="w-[250px] h-[350px]  overflow-hidden flex items-center justify-center mx-auto relative">
                                 <img
                                     src={user.credential_img01}
                                     alt="Credential 01"
                                     className="w-full h-full object-cover cursor-pointer"
                                     onClick={() => openFullscreen(user.credential_img01)}
                                 />
                                 {/* Hover Text */}
                             <div onClick={() => openFullscreen(user.credential_img01)} className=" absolute inset-0 bg-gray-900/75 bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                 <span className="text-white font-bold text-lg">Click to Expand</span>
                             </div>
                                 </div>
                                 <p className="mt-1 text-base text-slate-200 font-bold">Cred 01</p>
                         </div>
                    
                        )}

                        {user.credential_img02 && (
                             <div className="text-center group relative">
                             <div className="w-[250px] h-[350px]  overflow-hidden flex items-center justify-center mx-auto relative">
                                 <img
                                     src={user.credential_img02}
                                     alt="Credential 02"
                                     className="w-full h-full object-cover cursor-pointer"
                                     onClick={() => openFullscreen(user.credential_img02)}
                                 />
                                 {/* Hover Text */}
                             <div onClick={() => openFullscreen(user.credential_img02)} className=" absolute inset-0 bg-gray-900/75 bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                 <span className="text-white font-bold text-lg">Click to Expand</span>
                             </div>
                                 </div>
                                 <p className="mt-1 text-base text-slate-200 font-bold">Cred 02</p>
                         </div>
                        )}

                        {user.validId_img && (
                         <div className="text-center group relative">
                            <div className="w-[250px] h-[350px]  overflow-hidden flex items-center justify-center mx-auto relative">
                                <img
                                    src={user.validId_img}
                                    alt="Profile Image"
                                    className="w-full h-full object-cover cursor-pointer"
                                    onClick={() => openFullscreen(user.validId_img)}
                                />
                                {/* Hover Text */}
                            <div onClick={() => openFullscreen(user.validId_img)} className=" absolute inset-0 bg-gray-900/75 bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-white font-bold text-lg">Click to Expand</span>
                            </div>
                                </div>
                                <p className="mt-1 text-base text-slate-200 font-bold">Valid Id</p>
                        </div>
                       
                        )}
                        </div>
                    </div>

                    <Tooltip id="my-tooltip" className='absolute -top-[100px]'/>

                    <div className="">
                        <form action="" onSubmit={submit}>
                            <div className="flex gap-4 py-3">
                                <select value={status} onChange={(e) => setStatus(e.target.value)}  className='px-4 py-1 focus:border-accent outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' typeof='file' name="" id="">
                                    <option value="">--select status</option>
                                    <option value="active">ACTIVATE ACCOUNT</option>
                                    <option value="deactive">REJECT</option>
                                    {/* <option value="deactive">REJEC</option> */}
                                </select>
                                <button className='bg-accent w-[300px] hover:shadow-accent/50 hover:shadow-md text-[#161D31] rounded-md px-7 py-2 font-semibold'>Submit</button>
                            </div>
                        </form>
                    </div>
         </div>
    </div>
  )
}

export default UserDetails