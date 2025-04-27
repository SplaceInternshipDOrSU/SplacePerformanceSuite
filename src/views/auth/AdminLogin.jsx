import React, { useEffect, useState } from 'react'
import {PropagateLoader} from 'react-spinners'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {admin_login, messageClear} from '../../store/Reducers/authReducer'
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { Tooltip } from 'react-tooltip'

import toast from 'react-hot-toast'

const AdminLogin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loader, errorMessage , successMessage} = useSelector(state=>state.auth)
    const [showPassword, setShowPassword] = useState(false);
    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const AdminLoginSubmit = (e) => {
        e.preventDefault()
       dispatch(admin_login(state))

    }

    const overRideStyle = {
        display: 'flex',
        margin: '0',
        height: '24px',
        justifyContent : 'center',
        alignItems: 'center'
    }

    useEffect(()=>{
        if(errorMessage){
            toast.error(errorMessage.error);
            dispatch(messageClear())
        }

        if(successMessage){
            toast.success(successMessage.message);
            dispatch(messageClear())
            navigate('/')
            
           
        }
    }, [errorMessage, successMessage])
    return (
        <div className='min-w-screen min-h-screen flex justify-center items-center' style={{
            backgroundImage: "url('/images/background.gif')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
            <div className="w-[400px] text-[#d0d2d6] p-2 shadow-xl rounded-md py-10 px-2 bg-white">
                <div className="bg-transparent p-4 rounded-md">
                    <div className="h-[70px] flex justify-center flex-col items-center">
                        <div className="w-[180px] h-[50px">
                            <img className='w-full h-full' src="/images/MainLogo.png" alt="Logo" />
                        </div>
                        <h2 className='font-bold text-[13px] text-slate-800 mt-2'>Welcome Back Admin!</h2>
                    </div>

                <form onSubmit={AdminLoginSubmit} className='text-slate-800'>
                <div className="flex flex-col w-full gap-1 mb-3">
                    <label htmlFor="email" className='font-semibold'>Email</label>
                    <input
                    onChange={inputHandle}
                    value={state.email}
                    className='px-3 py-2 outline-none border-2 border-slate-700 bg-transparent rounded-md text-slate-800 focus:border-accent overflow-hidden text-sm'
                    type="email"
                    name='email'
                    placeholder='email'
                    id='email'
                    required
                    />
                </div>

                <div className="flex flex-col w-full gap-1 mb-3 relative">
                    <label htmlFor="password" className='font-semibold'>Password</label>
                    <input
                    onChange={inputHandle}
                    value={state.password}
                    className='px-3 py-2 pr-10 outline-none border-2 border-slate-700 bg-transparent rounded-md text-slate-800 focus:border-accent overflow-hidden text-sm'
                    type={showPassword ? "text" : "password"}
                    name='password'
                    placeholder='password'
                    id='password'
                    required
                    />
                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[37px] text-xs text-accent font-semibold focus:outline-none focus:border-none "
                    >
                    {showPassword ? (
                        <LuEyeClosed className='focus:outline-none focus:border-none' data-tooltip-id="my-tooltip" data-tooltip-content="hide" size={20}/>
                    ) : 
                    (
                        <LuEye className='focus:outline-none focus:border-none' data-tooltip-id="my-tooltip" data-tooltip-content="show" size={20}/>
                    )}
                    </button>
                </div>

                <Tooltip id="my-tooltip" className='ml-2' place="right" />
                <button
                    disabled={loader ? true : false}
                    className='bg-accent mt-4 w-full hover:shadow-[#6ED601]/10 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 font-bold'
                >
                    {loader ? <PropagateLoader color='#fff' cssOverride={overRideStyle} /> : 'Login'}
                </button>
                </form>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin