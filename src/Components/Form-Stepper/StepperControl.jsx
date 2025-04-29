import React, {useEffect, useState } from 'react'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
// import Register from '../../views/auth/Register';
import { toast } from 'react-hot-toast';
// import { useTranslation } from 'react-i18next';

const StepperControl = ({handleClick, currentStep, steps,submitData,userData}) => {
  console.log(currentStep + "current")
  console.log(steps + " steps")
  console.log(userData)
  // const {t} = useTranslation()


  const [isToastShown, setIsToastShown] = useState(false);

  const formValidation = () => {
    if (currentStep === 1) {
      console.log("Step 1");
  
      const phoneRegex = /^09\d{9}$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        profileImage,
        sex,
        birthDate,
        password,
        confirmPassword,
        role,
        category,
      } = userData;
  
      // Check for missing fields
      if (
        !firstName || !lastName || !email || !phoneNumber || !profileImage ||
        !sex || !birthDate || !password || !confirmPassword || !role || !category
      ) {
        if (!isToastShown) {
          toast.error("Please complete all required fields.");
          setIsToastShown(true);
        }
        return;
      }
  
      // Validate phone number
      if (!phoneRegex.test(phoneNumber)) {
        if (!isToastShown) {
          toast.error("Please enter a valid phone number (e.g., 09758975701)");
          setIsToastShown(true);
        }
        return;
      }
  
      // Validate password complexity
      if (!passwordRegex.test(password)) {
        if (!isToastShown) {
          toast.error("Password must be at least 8 characters, include one uppercase, one lowercase letter, and one number.");
          setIsToastShown(true);
        }
        return;
      }
  
      // Check if passwords match
      if (password !== confirmPassword) {
        if (!isToastShown) {
          toast.error("Passwords do not match. Please try again.");
          setIsToastShown(true);
        }
        return;
      }
  
      // Validate age
      const age = calculateAge(new Date(birthDate));
      if (age < 18) {
        if (!isToastShown) {
          toast.error("You must be at least 18 years old to proceed.");
          setIsToastShown(true);
        }
        return;
      }
  
      // All validations passed
      handleClick("next");
  
    } else if (currentStep === 2) {
      handleClick("next");
    } else if (currentStep === 3) {
      console.log("Step 3");
      // Add validation logic here if needed
      // handleClick("next");
    }
  };
  

    // Function to calculate age based on birth date
    const calculateAge = (birthDate) => {
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
  
      // If birth month hasn't occurred yet this year, subtract 1 from age
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
  
      return age;
    };

//   useEffect(()=>{
//     setIsToastShown(false)
// }, [steps])
  useEffect(()=>{
    setIsToastShown(false)
}, [isToastShown])


  console.log(currentStep)
  return (
    <div>
    {currentStep === steps.length ? (
      <div></div>
    ) : (
      <div className="container flex justify-around md:mt-6 mt-4 mb-3">
        {/* Back Button */}
        <button
          onClick={() => handleClick("back")}
          disabled={currentStep === 1}
          className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold border-2 border-slate-300 transition duration-200 ease-in-out 
            ${currentStep === 1 ? "opacity-20 cursor-not-allowed" : "hover:bg-slate-700 hover:text-white cursor-pointer"}`}
        >
          <span className="flex justify-center items-center gap-1">
            back <FaChevronLeft />
          </span>
        </button>
  
        {/* Next or Confirm Button */}
        {currentStep === steps.length - 1 ? (
          <button
          onClick={() => {
            handleClick(3); // Set step to 3
            submitData();   // Then submit data
          }}
            className="bg-primary text-white uppercase py-2 px-4 rounded-xl font-semibold border-2 border-primaryDark hover:border-primary hover:bg-primaryDark transition duration-200 ease-in-out flex items-center gap-1"
          >
            confirm <FaCheck />
          </button>
        ) : (
          <button
            onClick={formValidation}
            className="bg-primary text-white uppercase py-2 px-4 rounded-xl font-semibold border-2 border-primaryDark hover:border-primary hover:bg-primaryDark transition duration-200 ease-in-out flex items-center gap-1"
          >
            next <FaChevronRight />
          </button>
        )}
      </div>
    )}
  </div>
  

 
    
  )
}

export default StepperControl