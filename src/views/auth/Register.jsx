import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import {AiOutlineGooglePlus,AiFillGithub, AiFillTwitterSquare} from 'react-icons/ai'
import {FiFacebook} from 'react-icons/fi'
import {useDispatch, useSelector} from 'react-redux'
import {PropagateLoader} from 'react-spinners'
// import { overRideStyle } from './../../utils/Utils';
import {messageClear, user_register} from '../../store/Reducers/authReducer'
import { toast } from 'react-hot-toast';

import Stepper from './../../Components/Form-Stepper/Stepper';
import StepperControl from '../../Components/Form-Stepper/StepperControl'
import PersonalDetails from '../../Components/Form-Stepper/Steps/PersonalDetails'
import InformationReview from '../../Components/Form-Stepper/Steps/InformationReview'
// import Details from '../../Components/Form-Stepper/Steps/Details'
import Final from '../../Components/Form-Stepper/Steps/Final'

import { StepperContext } from '../../Components/context/StepperContext'
import { StepperImagePrev } from '../../Components/context/StepperImagePrev'
import Credentials from '../../Components/Form-Stepper/Steps/Credentials'




const Register = () => {
// Stepper Form

const [currentStep, setCurrentStep] = useState(1)
const [userData, setUserData] = useState([])
const [finalData, setFinalData] = useState([])



// const navigate = useNavigate()
const dispatch = useDispatch()
const {loader, errorMessage,  successMessage } = useSelector(state => state.auth)

useEffect(()=>{
    if(errorMessage){
        toast.error(errorMessage);
        dispatch(messageClear())
       
    }

    if(successMessage){
        toast.success(successMessage);
        dispatch(messageClear())  
    }
}, [errorMessage, successMessage])


// STEPPER FORM

const steps = [
    "User Details",
    "Confirmation",
    "request Complete",
   
];


const displayStep = (step)=>{
    switch(step){
        case 1:
            return <PersonalDetails/>
        case 2:
            return <InformationReview/>
        case 3:
            return <Final/>
        default: 
        
    }
}

const handleClick = (direction)=>{
    let newStep = currentStep
    if(direction === "none"){

        console.log("none")
    }else{
        direction === "next"? newStep++ : newStep--;

        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    }

    

}

const submitData = () => {
    console.log('Submit button pressed!');
    setCurrentStep(3)

    // Create a new FormData instance
    const formData = new FormData();

    // Append userData properties to the FormData object
    Object.entries(userData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            // If the value is an array (e.g., multiple files)
            value.forEach((file, index) => {
                if (file instanceof File) {
                    formData.append(`${key}[${index}]`, file); // Append each file
                }
            });
        } else if (value instanceof File) {
            // If it's a single file, append directly
            formData.append(key, value);
        } else {
            // Append all other types (strings, numbers, etc.)
            formData.append(key, value);
        }
    });

    // Log the FormData for debugging
    console.log("Form Data:", formData);

    // Dispatch the updated formData to the Redux action
    dispatch(user_register(formData));

    // Clear userData after submission
    setUserData({});
};

  return (
    <div className='min-w-screen min-h-screen flex justify-center items-center' style={{
        backgroundImage: "url('/images/background.gif')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>

<div className="absolute inset-0 bg-gray-300 opacity-25"></div>
        <div className="relative z-10 md:w-8/12 w-11/12  mx-auto shadow-xl rounded-2xl bg-white py-2">
            {/* { Stepper} */}
            <div className="px-6">
            <Stepper steps = {steps} currentStep={currentStep}/>
            
            {/* {Display Components} */}    
            <div className="my-1 py-3 md:px-10 px-3">
                <StepperContext.Provider value={{
                    userData,
                    setUserData,
                    finalData,
                    setFinalData,
                    loader
                }}>
                {displayStep(currentStep)}

                </StepperContext.Provider>
            </div>

        
            </div>
            <div className="w-full flex items-center justify-center text-md">
                <h2 className='font-base text-slate-300'>already Have an Account? <Link to="/login" className='font-bold text-primaryDark'>Login</Link></h2>
            </div>


            {/* {Nav Controls} */}
            <StepperControl 
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
            submitData={submitData}
            userData={userData}
            />
        </div>
    </div>
  )
}

export default Register