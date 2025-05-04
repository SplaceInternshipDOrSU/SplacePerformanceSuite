import React, { useContext, useEffect, useState } from 'react';
import { StepperContext } from '../../context/StepperContext';
import { IoMdImages } from "react-icons/io";
import { FadeLoader } from 'react-spinners';
// import { useDispatch} from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';
import {requestMessageClear} from '../../../store/Reducers/authReducer'
import {categories_get, roles_get} from '../../../store/Reducers/adminReducer'
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu"
import { IoIosCloseCircle } from "react-icons/io";


const PersonalDetails = () => {
  const [imagePreview, setImagePreview] = useState();
  const { userData, setUserData } = useContext(StepperContext);
  const [showRole, setShowRole] = useState(false)
  const [showCategory, setShowCategory] = useState(false)
  const dispatch = useDispatch()

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
    useEffect(()=>{
      dispatch(requestMessageClear())  
  }, [])

    // const {t} = useTranslation()
  const { loader } = useSelector((state) => state.auth);
  const { roles, categories } = useSelector((state) => state.admin);



  const [allRole, setAllRole] = useState([])
  const [allCategories, setAllCategories] = useState([])
    const [searchValue, setSearchValue] = useState('')



  useEffect(() => {
    dispatch(roles_get({
        searchValue: '',
        parPage: '',
        page: ""
    }))
    dispatch(categories_get({
      searchValue: '',
      parPage: '',
      page: ""
  }))
}, [dispatch])






useEffect(() => {
  setAllRole(roles)
}, [roles])

useEffect(() => {
  setAllCategories(categories)
}, [categories])

const roleSearch = (e) => {
  const value = e.target.value
  setSearchValue(value)
  if (value) {
      let srchValue = allRole.filter(c => c.name.toLowerCase().includes(value.toLowerCase()))
      setAllRole(srchValue)
  } else {
      setAllRole(roles)
  }
}
useEffect(() => {
  setAllRole(roles)
}, [roles])
const categorySearch = (e) => {
  const value = e.target.value
  setSearchValue(value)
  if (value) {
      let srchValue = allCategories.filter(c => c.name.toLowerCase().includes(value.toLowerCase()))
      setAllCategories(srchValue)
  } else {
      setAllCategories(categories)
  }
}






  // Function to resize and handle image selection
  const profileImageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 800; // Maximum width for the resized image
          const maxHeight = 800; // Maximum height for the resized image

          let width = img.width;
          let height = img.height;

          // Calculate the new dimensions while maintaining the aspect ratio
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          // Set canvas dimensions to the new size
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Convert the canvas back to a base64 string or blob
          canvas.toBlob(
            (blob) => {
              const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });

              // Update the userData with the resized image
              setUserData({ ...userData, profileImage: resizedFile });

              // Generate a preview for the UI
              setImagePreview(URL.createObjectURL(resizedFile));
            },
            file.type,
            0.9 // Image quality (90%)
          );
        };

        img.src = reader.result;
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full lg:grid lg:grid-cols-2 flex flex-col gap-6  lg:items-end">
        <div className=''>
          {/* Other input fields remain unchanged */}
          <div className="w-full flex flex-col lg:flex-row justify-between gap-2">
            <div className="w-full">
              <div className="font-bold h-3 text-gray-500 text-xs uppercase">Firstname</div>
              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                <input
                  onChange={handleChange}
                  value={userData["firstName"] || ""}
                  name="firstName"
                  placeholder="First Name"
                  className="p-1 px-2 appearance-none outline-none w-full text-gray-800 text-sm"
                  type="text"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="font-bold h-3 text-gray-500 text-xs uppercase">Middlename (Optional)</div>
              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                <input
                  onChange={handleChange}
                  value={userData["middleName"] || ""}
                  name="middleName"
                  placeholder="Middle Name"
                  className="p-1 px-2 appearance-none outline-none w-full text-gray-800 text-sm"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center flex-col md:flex-row md:justify-between gap-2">
                <div className="w-full">
                    <div className="font-bold h-3 text-gray-500 text-xs uppercase">
                      Lastname
                    </div>
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                      <input
                        onChange={handleChange}
                        value={userData["lastName"] || ""}
                        name='lastName'
                        placeholder='lastName'
                        className='p-1 px-2 appearance-none outline-none w-full text-gray-800 text-sm'
                        type="text" />
                    </div>
                </div>
                <div className="w-full">
                      <div className="font-bold h-3 text-gray-500 text-xs uppercase">
                        Birthdate
                      </div>
                      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded ">
                        <input
                          onChange={handleChange}
                          value={userData["birthDate"] || ""}
                          name='birthDate'
                          placeholder='birthDate'
                          className='p-1 px-2 appearance-none outline-none w-full text-gray-800 text-sm'
                          type="date" />
                      </div>
                </div>
                  
              </div>
              <div className="w-full flex flex-col md:flex-row justify-between gap-2">
              <div className="">
                      <div className="font-bold h-3 text-gray-500 text-xs uppercase">
                        Sex
                      </div>
                      <div class="md:w-32">
                        {/* <label for="sex" class="block text-sm font-medium text-gray-700">Sex</label> */}
                        <select
                         onChange={handleChange}
                         value={userData["sex"] || ""}
                         name='sex'
                         id="sex" 
                         class="mt-2 block w-full p-1 px-2 h-[40px] bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                          <option value="" disabled selected>Select sex</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                </div>
                <div className="w-full">
                    <div className="font-bold h-3 text-gray-500 text-xs uppercase">
                      Phone number
                    </div>
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                      <input
                        onChange={handleChange}
                        value={userData["phoneNumber"] || ""}
                        name='phoneNumber'
                        placeholder='#'
                        className='p-1 px-2 appearance-none outline-none w-full text-gray-800 text-sm'
                        type="number" />
                    </div>
                </div>  
              </div>
  
              <div className="w-full flex justify-between gap-2">
                <div className="w-full">
                    <div className="font-bold h-3 text-gray-500 text-xs  uppercase">
                      Email
                    </div>
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                      <input
                        onChange={handleChange}
                        value={userData["email"] || ""}
                        name='email'
                        placeholder='email'
                        className='p-1 px-2 appearance-none outline-none w-full text-gray-800 text-sm'
                        type="email" 
                        autoComplete="off"/>
                    </div>
                </div>
               
              

              </div>
              <div className="w-full">
                <div className="font-bold h-3 text-gray-500 text-xs uppercase">
                  Password
                </div>
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded items-center">
                  <input
                    autoComplete="new-password"
                    onChange={handleChange}
                    value={userData["password"] || ""}
                    name="password"
                    placeholder="password"
                    className="p-1 px-2 appearance-none outline-none w-full text-gray-800 text-sm"
                    type={showPassword ? "text" : "password"}
                    
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 text-gray-600 hover:text-gray-800 pr-2"
                  >
                    {showPassword ? <LuEye  size={16} /> : <LuEyeClosed size={16} />}
                    {/* {showPassword ? <LuEyeClosed  size={16} /> : <LuEye size={16} />} */}
                  </button>
                </div>
                </div>
                    <div className="w-full">
                      <div className="font-bold h-3 text-gray-500 text-xs uppercase mb-2">
                          Confirm Password
                      </div>
                      <div className="bg-white  p-1 flex border border-gray-200 rounded items-center">
                        <input
                       autoComplete="new-password"
                           onChange={handleChange}
                           value={userData["confirmPassword"] || ""}
                          name="confirmPassword"
                          placeholder="confirm Password"
                          className="p-1 px-2 appearance-none outline-none w-full text-gray-800 text-sm"
                          type={showConfirmPassword ? "text" : "password"}
                          
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="ml-2 text-gray-600 hover:text-gray-800 pr-2"
                        >
                          {showConfirmPassword ? <LuEye  size={16} /> : <LuEyeClosed size={16} />}
                          {/* {showPassword ? <LuEyeClosed  size={16} /> : <LuEye size={16} />} */}
                        </button>
                       </div>
                    </div>
                  </div>

        {/* Profile Image Upload Section */}
        <div className="w-full flex flex-col justify-between items-center h-full ">
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
            <input
              id="img"
              type="file"
              name="profileImage"
              onChange={profileImageHandler}
              className="hidden w-full h-full object-cover "
            />
          </div>
          <div className="mt-7  w-full ">
            <div className="text-end flex justify-end items-center gap-1 py-[2px]">
              <img className='h-[20px]' src="/images/Splace Logo.png" alt="" />
              <h2 className='font-bold text-accent'> Job Classification</h2>
            </div>
              <div className="w-full border-accent border-t-2 pt-3">
                <div className="font-bold h-3 text-gray-500 text-xs uppercase mb-2">SELECT EMPLOYEE ROLE</div>
                
                <input
                  readOnly
                  onClick={() => setShowRole(true)}
                  value={userData["roleName"] || ""}
                  className="w-full bg-transparent px-4 py-1 focus:border-accent outline-none border-2 border-slate-500 rounded-md text-slate-500"
                  type="text"
                  placeholder="Employee Role"
                  name="roleName"
                  id="roleName"
                />

                {/* Modal */}
                {showRole && (
                  <div className="fixed inset-0 z-50 bg-gray-500/50 flex items-center justify-center">
                    <div className="bg-white rounded-lg w-[400px] h-[300px] max-w-md p-4 shadow-xl text-slate-800">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="font-bold text-lg">Select Role</h2>
                        <button onClick={() => setShowRole(false)} className=" text-xl"><IoIosCloseCircle size={24} /></button>
                      </div>

                      <input
                        onChange={roleSearch}
                        value={searchValue}
                        className="mb-3 w-full px-4 py-1 border-b-2 border-slate-700 bg-transparent outline-none"
                        type="text"
                        placeholder="Search Role"
                        name="role"
                        id="role"
                      />

                      <div className="max-h-48 overflow-y-auto">
                        {allRole.map((role, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setUserData({ ...userData, roleName: role.name, role: role._id });
                              setShowRole(false);
                            }}
                            className="cursor-pointer py-2 px-4 hover:bg-accent hover:text-slate-300 font-semibold rounded-md"
                          >
                            {role.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full pt-3">
                <div className="font-bold h-3 text-gray-500 text-xs uppercase mb-2">SELECT EMPLOYEE CATEGORY</div>
                
                <input
                  readOnly
                  onClick={() => setShowCategory(true)}
                  value={userData["categoryName"] || ""}
                  className="w-full bg-transparent px-4 py-1 focus:border-accent outline-none border-2 border-slate-500 rounded-md text-slate-500"
                  type="text"
                  placeholder="Listing Category"
                  name="categoryName"
                  id="categoryName"
                />

                {/* Modal */}
                {showCategory && (
                  <div className="fixed inset-0 z-50 bg-gray-500/50 flex items-center justify-center">
                    <div className="bg-white rounded-lg w-[400px] h-[300px] max-w-md p-4 shadow-xl text-slate-800">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="font-bold text-lg">Select Category</h2>
                        <button onClick={() => setShowCategory(false)} className=" text-xl"><IoIosCloseCircle size={24} /></button>
                      </div>

                      <input
                        onChange={categorySearch}
                        value={searchValue}
                        className="mb-3 w-full px-4 py-1 border-b-2 border-slate-700 bg-transparent outline-none"
                        type="text"
                        placeholder="Search Role"
                        name="categoryName"
                        id="categoryName"
                      />

                      <div className="max-h-48 overflow-y-auto">
                        {allCategories.map((cat, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setUserData({ ...userData, categoryName: cat.name, category: cat._id });
                              setShowCategory(false);
                            }}
                            className="cursor-pointer py-2 px-4 hover:bg-accent hover:text-slate-300 font-semibold rounded-md"
                          >
                            {cat.name}
                          </div>
                        ))}


                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

        
        </div>

       
      </div>
    </div>
  );
};

export default PersonalDetails;
