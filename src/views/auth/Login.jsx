import React, {useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineGooglePlus,AiFillGithub, AiFillTwitterSquare} from 'react-icons/ai'
import {FiFacebook} from 'react-icons/fi'
import {useDispatch, useSelector} from 'react-redux'
import {PropagateLoader} from 'react-spinners'
import { overRideStyle } from './../../utils/Utils';
import {messageClear, user_login} from '../../store/Reducers/authReducer'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu"
// import InstallPWAButton from './../../Components/Pwa/InstallPWAButton ';
// import LanguageDropdown from '../../src/Components/LanguageModule/LanguageDropdown';
// import LanguageDropdown from '../../../src/Components/LanguageModule/LanguageDropdown';
// import { useLocation } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';



const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loader = false;
    const {errorMessage , successMessage} = useSelector(state=>state.auth)
     const {category} = useSelector(state=>state.auth)
    // const { loader, errorMessage , successMessage} = useSelector(state=>state.auth)

     const [showPassword, setShowPassword] = useState(false);


    const [state, setState] = useState({
        email: '',
        password : ''
    })
    
    const inputHandle = (e)=>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const submit = (e)=>{
        e.preventDefault()
        dispatch(user_login(state))
    
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
    // const {t} = useTranslation()

      useEffect(() =>{
    
            if(category === "admin")
            {
                // toast.error("PLEASE LOGOUT FIRST")
                navigate("/admin/dashboard")
            }
           
      
    
    
    //   if(category === 'admin') return <Navigate to='admin/dashboard' replace/>
        },[category,dispatch])
    
  return (
    <div className='min-w-screen min-h-screen bg-main-bg flex justify-center items-center relative' style={{
        backgroundImage: "url('/images/background.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
      }}>
      
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        <div className="relative z-10 w-[350px] lg:w-[400px] bg-white rounded-lg text-[#d0d2d6] p-2 shadow-xl">
            <div className="p-4 ">
                <h2 className='text-lg mb-1 text-center text-slate-800 font-semibold'>Welcome to <Link to={'/admin/login'} className='font-extrabold text-accent italic'>SplaceHR</Link></h2>
                <p className='text-[10px] px-3 text-center text-slate-800'>Please sign in to your account</p>
                {/* <p className='text-[10px] px-3 text-center'>{t("signInPrompt")}</p> */}
                <form onSubmit={submit} className='py-4'>
                    <div className="flex flex-col w-full gap-1 mb-3 text-slate-800">
                        <label htmlFor="email" className='font-semibold'>Email</label>
                        <input onChange={inputHandle} value={state.email} className='px-3 py-2 outline-none border-2 border-slate-700 bg-transparent rounded-md focus:border-accent overflow-hidden' type="email" name='email' placeholder='email' id='email' required/>
                    </div>

                    <div className="relative text-slate-800">
                        <div className="flex flex-col w-full gap-1 mb-3">
                            <label htmlFor="password" className='font-semibold'>Password</label>
                            <input onChange={inputHandle} value={state.password} className='px-3 py-2 outline-none border-2 border-slate-700 bg-transparent rounded-md focus:border-accent overflow-hidden'    type={showPassword ? "text" : "password"} name='password' placeholder='password' id='password' required/>
                        </div>

                          <button
                              type="button"
                               onClick={() => setShowPassword(!showPassword)}
                               className="ml-2 text-gray-600 hover:text-gray-500 pr-2 absolute right-2 top-6 bottom-0"
                          >
                            {showPassword ? <LuEye  size={19} /> : <LuEyeClosed size={16} />}
                            {/* {showPassword ? <LuEyeClosed  size={16} /> : <LuEye size={16} />} */}
                          </button>

                    </div>
                  
                   

                    <button disabled={loader ? true : false} className='bg-accent w-full hover:shadow-[#6ED601]/10 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 font-bold mt-5'>
                                    {
                                        loader ? (
                                            <PropagateLoader color="#fff" cssOverride={overRideStyle} />
                                        ) : (
                                            "login"
                                        )
                                        }

                    </button>
                    <div className="flex flex-col text-center justify-center text-xs mt-2 text-slate-800">
                        <p>No Account?</p>
                        <Link to='/register' className='font-semibold text-[10px] hover:underline hover:text-accent'>Fill up an application</Link>
                    </div>
                  
                </form>
            </div>
        </div>

        <div className="absolute bottom-0 text-slate-400 text-xs py-1">
            {/* <p>Copyright © 2025 FarmFuture.com, Alrigths reserved</p> */}
            {/* <InstallPWAButton/> */}
        </div>
    </div>
  )
}

export default Login