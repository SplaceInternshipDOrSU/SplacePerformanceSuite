import React, { useContext,useState } from 'react';
import { StepperContext } from '../../context/StepperContext';
import { useSelector } from 'react-redux';
import { IoMdImages } from 'react-icons/io';
import { FadeLoader } from 'react-spinners';
import { MdEmail } from "react-icons/md";
import { IoMdMale } from "react-icons/io";
import { IoMdFemale } from "react-icons/io";

const InformationReview = () => {
  const { userData } = useContext(StepperContext);
  const { loader } = useSelector((state) => state.auth);
   const [imagePreview, ] = useState();


  // Generic handler for file changes to update the respective fields


  // Component to render each image upload area

  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-[350px] h-[520px] bg-gray-200 shadow-2xl rounded-lg p-3 flex flex-col relative ">
             <div className="w-full flex justify-center items-start pt-4  ">
                  <div className="flex justify-center h-[230px] w-[230px] rounded-full">
                        {userData.profileImage ? (
                          <label htmlFor="img" className="h-full w-full relative cursor-pointer overflow-hidden rounded-md ">
                            <img
                              className="w-full h-full object-cover rounded-full border-accent border-6"
                              src={imagePreview || URL.createObjectURL(userData.profileImage)}
                              alt="Profile"
                            />
                            <div className="absolute bottom-2 right-4 h-[80px] rounded-full border-6 bg-white border-accent p-3">
                              <img className='h-full w-full' src="/images/Splace Logo.png" alt="" />
                            </div>
                            {loader && (
                              <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                                <FadeLoader />
                              </div>
                            )}
                          </label>
                        ) : (
                          <label
                            htmlFor="img"
                            className="flex justify-center items-center flex-col h-[230px] w-full cursor-pointer border-3 border-dashed hover:border-accent border-text_color relative rounded-full "
                          >
                            <span>
                              <IoMdImages size="30px" color="#53596B" />
                            </span>
                            <span className="text-slate-500 text-[13px]">Upload Personal Image</span>
                            {/* <div className="absolute bottom-2 right-4 h-[80px] rounded-full border-6 bg-white border-accent p-3">
                              <img className='h-full w-full' src="/images/Splace Logo.png" alt="" />
                            </div> */}
                            {loader && (
                              <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                                <FadeLoader />
                              </div>
                            )}
                          </label>
                        )}
                        
                  </div>
             </div>
             <div className="mt-3 px-4 text-center flex justify-center">
              <div className="break-words">
                <h2 className="font-bold text-3xl w-full break-words">
                  {userData.lastName}
                </h2>
                <div className="flex justify-center flex-col w-full">
                <h2 className="font-bold text-lg break-words">
                  {userData.firstName}
                </h2>
                <span className='flex justify-center items-center'> 
                    {
                      userData.sex === "male"? (
                        <IoMdMale size={25} color='#5494FD' />
                      ):(
                        <IoMdFemale size={25} color='#FF3366' />
                      )
                    }
                  </span>


                </div>
               
              </div>
            </div>

            <div className="">
                  
                  
                </div>

            <div className="mt-2  text-center absolute w-full bottom-3 inset-x-0 px-4">
            <div className="flex gap-1 justify-center pb-1">
                  {/* <span className='flex justify-center items-center'> <MdEmail color='#FF3366' /></span> */}
                  <h2 className='text-xs font-semibold'>{userData.email}</h2>
                </div>
              <div className="border-t-2 border-accent ">
              <h2 className='font-bold text-xl'>{userData.category}</h2>
              <h2 className='font-bold text-xs'>{userData.role}</h2>
              </div>
              
            </div>

        </div>     
      </div>
    </div>
  );
};

export default InformationReview;
