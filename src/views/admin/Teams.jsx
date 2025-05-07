import React ,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Pagination from '../Pagination';
import { FaEdit, FaTrash } from 'react-icons/fa'
import { BsImage } from 'react-icons/bs';
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

import {PropagateLoader} from 'react-spinners'
import { overRideStyle } from './../../utils/Utils';
import { toast } from 'react-hot-toast';
import { FaExclamationCircle } from "react-icons/fa";

import {useSelector, useDispatch} from 'react-redux'
import { teamAdd ,messageClear, teams_get ,roleDelete,roleEdit,editErrorClear,get_supervisors,get_managers,get_rankandfile_employees,get_active_ceo,get_active_coo} from '../../store/Reducers/teamReducer';
import Search from './../components/Search';
import Modal from './../../Components/Modal/modal';
import { IoIosCloseCircle } from "react-icons/io";
import { RiTeamFill } from "react-icons/ri";
// import UserRoles from './UserRoles copy';
import { FaCheckCircle } from "react-icons/fa";
import { Tooltip } from 'react-tooltip'
import { IoMdCopy } from "react-icons/io";

const Teams = () => {
    const dispatch = useDispatch()
    const { loader_delete,loader_role,role,editError, editErrorMessage} = useSelector(state=>state.admin)
    const { teams,totalTeams,totalPages,loader_team, successMessage, errorMessage,supervisors, managers, RandFs,coo, ceo} = useSelector(state=>state.team)

    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [searchValueSv, setSearchValueSv] = useState('')
    const [searchValueMg, setSearchValueMg] = useState('')
    const [searchValueRf, setSearchValueRf] = useState('')

    const [selectedRandFs, setSelectedRandFs] = useState([]); 
    
    const [parPage, setParpage] = useState(5)
    const [show,setShow] = useState(false)
     const [showSupervisors, setShowSupervisors] = useState(false)
     const [showManagers, setShowManagers] = useState(false)
     const [showRandF, setShowRandF] = useState(false)
    // const [imageShow, setImage] = useState('')
    const [state,setState] = useState({
        name: '',
        supervisor: '',
        manager : '',
        description : '',
        rfName: [], // must be an array
        rf: [],     // must be an array
        cooId: '',
        ceoId: '',
    })


    const [allSupervisors, setAllSupervisors] = useState([])
    const [allManagers, setAllManagers] = useState([])
    const [allRandFs, setAllRandFs] = useState([])
    const [stateEdit,setStateEdit] = useState({
        name: '',
        description : ''
    })
  

    console.log(selectedRandFs)
    console.log("selectedRandFs")

    // const imageHandler= (e)=>{
    //     let files = e.target.files
    //     console.log(files)
    //     if(files.length>0){
    //         setImage(URL.createObjectURL(files[0]))
    //         setState({
    //             ...state,
    //             image: files[0]
    //         })

    //     }
    // }


 
    

    const add_Team = (e)=>{
        e.preventDefault()
        console.log(state)
        dispatch(teamAdd(state))
    }
useEffect(()=>{
if(errorMessage){
    toast.error(errorMessage)
    dispatch(messageClear())

}else{
    toast.success(successMessage)
    dispatch(messageClear())
    setState({
        name:'',
        supervisor: '',
        manager : '',
        description : '',
        rfName: [], // must be an array
        rf: [],     // must be an array
    })
    setSelectedRandFs([])
    const obj = {
        parPage : parseInt(parPage),
        page : parseInt(currentPage),
        searchValue : ""

    }
    dispatch(teams_get(obj))
}
},[successMessage, errorMessage])

useEffect(()=>{
    const obj = {
        parPage : parseInt(parPage),
        page : parseInt(currentPage),
        searchValue

    }
    dispatch(teams_get(obj))
}, [searchValue, currentPage, parPage])




const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedRoleId, setSelectedRoleId] = useState(null);
const [selectedRoleName, setSelectedRoleName] = useState(null);

const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// const [showTeamRandFs, setShowTeamRandFs] = useState(false);


// const openModal = (roleId,role) => {
//     setSelectedRoleId(roleId);
//     setSelectedRoleName(role);
//   setIsModalOpen(true);
// };

const closeModal = () => {
  setSelectedRoleId(null);
  setSelectedRoleName(null);
  setIsModalOpen(false);
};

const confirmDelete = () => {
  if (selectedRoleId) {
    handleDelete(selectedRoleId);
    closeModal();
  }
};

const handleDelete = (id)=>{
    dispatch(roleDelete({id}))
}


// EDIT MODAL
// const openEditModal = (roleId,role) => {
//     dispatch(get_role_by_id(roleId))
//     setSelectedRoleId(roleId);
//     setSelectedRoleName(role);
//     setIsEditModalOpen(true);
// };

const closeEditModal = () => {
  setSelectedRoleId(null);
  setSelectedRoleName(null);
  setIsEditModalOpen(false);
  dispatch(editErrorClear())
};

const confirmEdit = () => {
    if (selectedRoleId) {
      handleEdit(selectedRoleId);
    }
  };
  
useEffect(()=>{})
const handleEdit = (id)=>{
    console.log(id)
    console.log("selectedRoleId ID ------------------ 00")
    const obj = {
        name: stateEdit.name,
        description:stateEdit.description,
        id
  

}
    // console.log
    dispatch(roleEdit(obj));
}

useEffect(() => {
    if (!editError && successMessage) {
      closeEditModal();
    }
  }, [editError, successMessage]);
  


useEffect(() => {
    if (role) {
        setStateEdit({
            name: role.name || '',
            description: role.description || '',
        });
        
    }
}, [role]);



// NEW SHIT
const handleRandFsToggle = (employee) => {
  const isSelected = selectedRandFs.some((item) => item._id === employee._id);

  let updatedList;
  if (isSelected) {
    // Deselect
    updatedList = selectedRandFs.filter((item) => item._id !== employee._id);
  } else {
    // Select (no limit now)
    updatedList = [...selectedRandFs, employee];
  }

  setSelectedRandFs(updatedList);

  // Sync to state
  setState((prevState) => ({
    ...prevState,
    rf: updatedList.map((item) => item._id),
    rfName: updatedList.map((item) => item.name),
  }));
};




  useEffect(() => {
    console.log("NGIIIIIIII")
    dispatch(get_supervisors({
        searchValue: '',
        parPage: '',
        page: "",
        role: "",
        category : '680fa0c1d72f5448c2013189'
    }))
    dispatch(get_managers({
        searchValue: '',
        parPage: '',
        page: "",
        role: "",
        category : '680fa0c1d72f5448c2013190'
    }))
    dispatch(get_rankandfile_employees({
        searchValue: '',
        parPage: '',
        page: "",
        role: "",
        category : '680fa0c1d72f5448c2013188'
    }))
    dispatch(get_active_ceo({
        category : '680fa0c1d72f5448c2013192'
    }))
    dispatch(get_active_coo({
        category : '680fa0c1d72f5448c2013191'
    }))
}, [dispatch])




useEffect(() => {
  setAllSupervisors(supervisors)
}, [supervisors])
useEffect(() => {
  setAllManagers(managers)
}, [managers])
useEffect(() => {
  setAllRandFs(RandFs)
}, [RandFs])


useEffect(() => {
  setState(prevState => ({
    ...prevState,
    cooId: coo,
    ceoId: ceo
  }));
}, [coo, ceo]);



console.log(state)
console.log("state")
  console.log(allRandFs)
  console.log("allRandFs")



const supervisorSearch = (e) => {
  const value = e.target.value
  setSearchValueSv(value)
  if (value) {
      let srchValue = allSupervisors.filter(c => c.name.toLowerCase().includes(value.toLowerCase()))
      setAllSupervisors(srchValue)
  } else {
    setAllSupervisors(supervisors)
  }
}
const managerSearch = (e) => {
  const value = e.target.value
  setSearchValueMg(value)
  if (value) {
      let srchValue = allManagers.filter(c => c.name.toLowerCase().includes(value.toLowerCase()))
      setAllManagers(srchValue)
  } else {
    setAllManagers(managers)
  }
}
const randfSearch = (e) => {
  const value = e.target.value
  setSearchValueRf(value)
  if (value) {
      let srchValue = allRandFs.filter(c => c.name.toLowerCase().includes(value.toLowerCase()))
      setAllRandFs(srchValue)
  } else {
    setAllRandFs(RandFs)
  }
}



console.log(state)
console.log("state")


const [activeTeamIndex, setActiveTeamIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // For rankandfiles search

  const handleOpenModal = (index) => {
    setActiveTeamIndex(index);
    setSearchQuery(''); // Reset search when opening new modal
  };

  const copyToClipboard = (email) => {
    navigator.clipboard.writeText(email);
    toast.success("Copied to clipboard!")
    // alert('Email copied to clipboard!');

    
  };
  const [showEmail, setShowEmail] = useState(null); 
  const [showManagerEmail, setShowManagerEmail] = useState(null); 
  const [rankAndFileToggles, setRankAndFileToggles] = useState({});

  // Toggle email visibility for the specific supervisor clicked
  const handleSupervisorClick = (index) => {
    // Set the clicked supervisor's email to toggle on/off
    setShowEmail(showEmail === index ? null : index); // Toggle logic
  };
  const handleManagerClick = (index) => {
    // Set the clicked supervisor's email to toggle on/off
    setShowManagerEmail(setShowManagerEmail === index ? null : index); // Toggle logic
  };

// NEW SHIT


  return (
    <div className=' pt-5'>
        <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#283046] rounded-md">
                <h1 className='text-text_color font-semibold text-lg text-slate-100'>EMPLOYEE ROLES</h1>  
            <button onClick={()=> setShow(true)} className='bg-accent shadow-lg hover:shadow-accent/50 px-4 py-2 cursor-pointer text-white rounded-md text-sm font-semibold'>ADD EMPLOYEE ROLE</button>
        </div>
        <div className="flex flex-wrap w-full ">
            <div className="w-full lg:w-9/12">
                <div className="w-full p-4 bg-[#283046] rounded-md ">
                    <Search setParpage={setParpage} setSearchValue={setSearchValue} searchValue={searchValue}/>
                    <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-[#d0d2d6]">
                      <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
                        <tr>
                          <th scope="col" className="py-3 px-4">No</th>
                          <th scope="col" className="py-3 px-4">Name</th>
                          <th scope="col" className="py-3 px-4">Supervisor</th>
                          <th scope="col" className="py-3 px-4">Manager</th>
                          <th scope="col" className="py-3 px-4">Rank and Files</th>
                          <th scope="col" className="py-3 px-4 text-end">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loader_delete ? (
                          <tr>
                            <td colSpan="6" className="py-10 text-center relative">
                              <div className="absolute inset-0 bg-[#283046] flex justify-center items-center">
                                <h2>Loading...</h2>
                              </div>
                            </td>
                          </tr>
                        ) : teams && teams.length > 0 ? (
                          teams.map((team, i) => (
                            <tr key={i}>
                              <td className="py-2 px-4 font-medium whitespace-nowrap">{team.no}</td>
                              <td className="py-2 px-4 font-medium whitespace-nowrap">
                                <span >
                                  {team.name}
                                </span>
                              </td>
                              
                              <td className="py-2 px-4 font-medium max-w-[220px]">
                                <span
                                  onClick={() => handleSupervisorClick(i)} // Toggle click on supervisor name/email
                                  className="cursor-pointer text-slate-300"
                                >
                                  {showEmail === i ? (
                                    <div className="flex items-center">
                                      <span data-tooltip-id="my-tooltip" data-tooltip-content="Click to view Name">{team.supervisor.email}</span>
                                      <button
                                        className="text-white ml-2"
                                        onClick={(e) => {
                                          e.stopPropagation(); // Prevent parent click handler
                                          copyToClipboard(team.supervisor.email);
                                        }}
                                      >
                                        <IoMdCopy size={18} />
                                      </button>
                                    </div>
                                  ) : (
                                    <span data-tooltip-id="my-tooltip" data-tooltip-content="Click to view Email">{team.supervisor.name}</span>
                                  )}
                                </span>
                              </td>
              
             
                              <td className="py-2 px-4 font-medium max-w-[220px]"> <span
                                  onClick={() => handleManagerClick(i)} // Toggle click on supervisor name/email
                                  className="cursor-pointer text-slate-300"
                                >
                                  {showManagerEmail === i ? (
                                    <div className="flex items-center">
                                      <span data-tooltip-id="my-tooltip" data-tooltip-content="Click to view Name">{team.manager.email}</span>
                                      <button
                                        className="text-white ml-2"
                                        onClick={(e) => {
                                          e.stopPropagation(); // Prevent parent click handler
                                          copyToClipboard(team.manager.email);
                                        }}
                                      >
                                        <IoMdCopy size={18} />
                                      </button>
                                    </div>
                                  ) : (
                                    <span data-tooltip-id="my-tooltip" data-tooltip-content="Click to view Email">{team.manager.name}</span>
                                  )}
                                </span></td>
                             
                              <td className="py-2 px-4 font-medium max-w-[220px]">
                                <button className='flex justify-center gap-1 bg-accent px-2 py-1 rounded-xs uppercase font-bold text-center items-center hover:bg-white hover:text-accent shadow-2xl hover:shadow-accent' onClick={() => handleOpenModal(i)}>View all <RiTeamFill className='mb-[3px]' size={16}/></button>
                              </td>
                              <td className="py-2 px-4 font-medium whitespace-nowrap text-end">
                                {/* Actions buttons */}
                              </td>

                              {/* Modal */}
                              {activeTeamIndex === i && (
                                  <td colSpan="6" className="fixed inset-0 z-[99999] bg-gray-500/20 flex items-center justify-center">
                                    <div className="bg-white rounded-lg w-[400px] max-w-md p-4 h-[400px] shadow-xl text-slate-800">
                                      
                                      {/* Modal Header */}
                                      <div className="flex justify-between items-center mb-4">
                                        <h2 className="font-bold text-lg">
                                          Team "<span  className="text-accent font-black">{team.name}</span>" Rank and Files
                                        </h2>
                                        <button onClick={() => setActiveTeamIndex(null)} className="text-xl">
                                          <IoIosCloseCircle size={24} />
                                        </button>
                                      </div>

                                      {/* Search Input */}  
                                      <input
                                        type="text"
                                        placeholder="Search rank and files..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full p-2 mb-3 border rounded-md text-sm"
                                      />

                                      {/* Filtered List */}
                                      <div className="max-h-48 overflow-y-auto space-y-2">
                                        {team.rankandfile
                                          ?.filter((rf) => rf.name.toLowerCase().startsWith(searchQuery.toLowerCase()))
                                          .map((rf, index) => {
                                            const isEmailVisible = rankAndFileToggles[`${i}-${index}`];

                                            return (
                                              <div
                                                key={index}
                                                className="py-2 px-4 bg-slate-100 rounded-md text-slate-700 font-semibold cursor-pointer flex items-center justify-between hover:bg-accent hover:text-slate-100 transition"
                                                onClick={() =>
                                                  setRankAndFileToggles((prev) => ({
                                                    ...prev,
                                                    [`${i}-${index}`]: !isEmailVisible,
                                                  }))
                                                }
                                              >
                                                {isEmailVisible ? (
                                                  <div className="flex items-center">
                                                    <span data-tooltip-id="my-tooltip" data-tooltip-content="Click to view Name">{rf.email}</span>
                                                    <button
                                                      className="ml-2 text-slate-200"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        copyToClipboard(rf.email);
                                                      }}
                                                    >
                                                      <IoMdCopy size={18} />
                                                    </button>
                                                  </div>
                                                ) : (
                                                  <span data-tooltip-id="my-tooltip" data-tooltip-content="Click to view Email">{rf.name}</span>
                                                )}
                                              </div>
                                            );
                                          })}

                                        {team.rankandfile?.filter((rf) =>
                                          rf.name.toLowerCase().startsWith(searchQuery.toLowerCase())
                                        ).length === 0 && (
                                          <div className="text-center text-slate-500">No rank and files found</div>
                                        )}
                                      </div>
                                    </div>
                                  </td>
                                )}

                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="px-4 text-center font-medium py-5">No Roles available.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    </div>   
                    <div className="w-full flex justify-between mt-4 bottom-4 right-4">
                    <div className="pl-3 text-xs font-semibold text-slate-100">
                        <h2>Page <span className='text-accent'>{currentPage}</span> of {totalPages}</h2>
                    </div>
                         <Pagination
                            pageNumber = {currentPage}
                            setPageNumber = {setCurrentPage}
                            totalItem = {totalTeams}
                            parPage = {parPage}
                            showItem = {totalPages}
                        />
                    </div>

                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-[99999999999999999999]">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-[300px]">
                    <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                    <p className="mb-6">Are you sure you want to delete the role <span className='font-bold text-accent'>{selectedRoleName}</span> ?</p>
                    <div className="flex justify-end gap-4">
                        <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                        >
                        Cancel
                        </button>
                        <button
                        onClick={confirmDelete}
                        className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
                        >
                        Delete
                        </button>
                    </div>
                    </div>
                </div>
                )}
            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-[99999999]">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-[500px] h-[400px]">
                    <h2 className="text-xl font-bold mb-1">EDIT ROLE INFORMATION</h2>
                    <p className="mb-1">Role Currently Editing:  <span className='font-bold text-accent'>{selectedRoleName}</span></p>
                    {
                        loader_role?.role? (
                            <div className="w-full h-[220px] flex justify-center items-center text-center ">Fetching Role Data...</div>
                        ):(
                            <div className="w-full h-[190px]">
                                <div className="">
                                    {
                                        editError? (
                                            <div className="w-full flex justify-between items-center bg-red-500 px-2 rounded py-2 font-bold text-slate-100">{editErrorMessage} <FaExclamationCircle /></div>
                                        ):(
                                            <div className="h-[33px]"></div>
                                        )
                                    }
                                </div>
                            
                              
                            <div className="flex flex-col w-full gap-1 mb-3">
                                <label className='font-bold' htmlFor="name">Role name</label>
                                <input value={stateEdit.name} onChange={(e)=>setStateEdit({...stateEdit, name: e.target.value})} id='name' name='name' className='px-4 py-2 focus:border-accent outline-none border-2 border-slate-700 rounded-md text-slate-600' type="text" placeholder='Role name' required/>
                            </div>


                            <div className="flex flex-col w-full gap-1 mb-3">
                                <label className='font-bold' htmlFor="description ">Role Description</label>
                                <textarea value={stateEdit.description} onChange={(e)=>setStateEdit({...stateEdit, description: e.target.value})} id='description' name='description' className='px-4 py-2 focus:border-accent outline-none border-2 border-slate-700 rounded-md text-slate-600' type="text" placeholder='Role Description' required/>
                            </div>

                            
                            <div className="flex justify-end gap-4">
                                <button
                                onClick={closeEditModal}
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded font-bold text-slate-600"
                                >
                                Cancel
                                </button>
                                <button
                                onClick={confirmEdit}
                                className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded font-bold"
                                >
                                CONFIRM EDIT
                                </button>
                            </div>
                                           
                      
                            </div>
                        )
                    }
                   
                    </div>
                </div>
                )}

              <Tooltip id="my-tooltip" placement="right" />



           
                        <div className={`w-[320px] lg:w-3/12 lg:relative lg:right-0 fixed ${show ? 'right-0' : '-right-[340px]'} z-[9999] top-0 transition-all duration-500`}>
                <div className="w-full pl-5">
                    <div className="bg-[#283046] rounded-md h-screen lg:h-auto px-6 py-6 lg:rounded-md text-slate-100">
                        <div className="flex justify-between items-center py-3">
                            <h1 className='text-text_color font-semibold text-xl uppercase'>Add New Team</h1>
                            <div onClick={()=> setShow(false)} className="block lg:hidden cursor-pointer"><IoClose className='text-text_color' size={25} color='red'/></div>
                        </div>
                        <form onSubmit={add_Team} className=''>
                      
                            <div className="flex flex-col w-full gap-1 mb-3">
                                <label htmlFor="name">Team Name</label>
                                <input value={state.name} onChange={(e)=>setState({...state, name: e.target.value})} id='name' name='name' className='px-4 py-2 focus:border-accent outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Team Name' required/>
                            </div>
                              <div className="mt-7  w-full ">
                                        <div className="text-end flex justify-end items-center gap-1 py-[2px]">
                                          <img className='h-[20px]' src="/images/Splace Logo.png" alt="" />
                                          <h2 className='font-bold text-accent'> TEAM COMPOSITION</h2>
                                        </div>
                                        <div className="w-full border-accent border-t-2 pt-3 flex flex-row gap-2 justify-end items-start font-bold">
                                          <div className="flex justify-center items-center gap-2">
                                            <h2>CEO : </h2>
                                            {
                                              ceo? (
                                                <FaCheckCircle className='text-accent'/>
                                              ):(
                                                <div className="flex justify-center items-center gap-1">
                                                  <IoClose className='text-accent' />
                                                  <div className="">NO CEO ACCOUNT</div>
                                                </div>
                                              )
                                            }
                                          </div>
                                          <div className="flex justify-center items-center gap-2">
                                            <h2>COO : </h2>
                                            {
                                              coo? (
                                                <FaCheckCircle className='text-accent'/>
                                              ):(
                                                <div className="flex justify-center items-center gap-1">
                                                  <IoClose className='text-accent' />
                                                  <div className="">NO COO ACCOUNT</div>
                                                </div>
                                              )
                                            }
                                          </div>
                                         
                                        </div>
                                          <div className="w-full ">
                                            <div className="font-bold h-3 text-gray-500 text-xs uppercase mb-2">ASSIGN A NEW SUPERVISOR</div>
                                            
                                            <input
                                              readOnly
                                              onClick={() => setShowSupervisors(true)}
                                              value={state["supervisorName"] || ""}
                                              className="w-full bg-transparent px-4 py-1 focus:border-accent outline-none border-2 border-slate-500 rounded-md text-slate-500"
                                              type="text"
                                              placeholder="Supervisor"
                                              name="supervisorName"
                                              id="supervisorName"
                                            />
                            
                                            {/* Modal */}
                                            {showSupervisors && (
                                              <div  className="fixed inset-0 z-50 bg-gray-500/50 flex items-center justify-center">
                                                <div className="bg-white rounded-lg w-[400px] h-[300px] max-w-md p-4 shadow-xl text-slate-800">
                                                  <div className="flex justify-between items-center mb-4">
                                                    <h2 className="font-bold text-lg">Select Supervisor </h2>
                                                    <button onClick={() => setShowSupervisors(false)} className=" text-xl"><IoIosCloseCircle size={24} /></button>
                                                  </div>
                            
                                                  <input
                                                    onChange={supervisorSearch}
                                                    value={searchValueSv}
                                                    className="mb-3 w-full px-4 py-1 border-b-2 border-slate-700 bg-transparent outline-none"
                                                    type="text"
                                                    placeholder="Supervisor"
                                                    name="role"
                                                    id="role"
                                                  />
                            
                                                  <div className="max-h-48 overflow-y-auto">
                                                    {allSupervisors.map((c, index) => (
                                                      <div
                                                        key={index}
                                                        onClick={() => {
                                                          setState({ ...state, supervisorName:c.name, supervisor: c._id });
                                                          setShowSupervisors(false);
                                                        }}
                                                        className="cursor-pointer py-2 px-4 hover:bg-accent hover:text-slate-300 font-semibold rounded-md"
                                                      >
                                                        {c.name}
                                                      </div>
                                                    ))}
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                          </div>


                                          {/* MANAGERS */}
                                          <div className="w-full pt-3">
                                            <div className="font-bold h-3 text-gray-500 text-xs uppercase mb-2">ASSIGN A MANAGER</div>
                                            
                                            <input
                                              readOnly
                                              onClick={() => setShowManagers(true)}
                                              value={state["managerName"] || ""}
                                              className="w-full bg-transparent px-4 py-1 focus:border-accent outline-none border-2 border-slate-500 rounded-md text-slate-500"
                                              type="text"
                                              placeholder="Manager"
                                              name="supervisorName"
                                              id="supervisorName"
                                            />
                            
                                            {/* Modal */}
                                            {showManagers && (
                                              <div  className="fixed inset-0 z-[99] bg-gray-500/50 flex items-center justify-center">
                                                <div className="bg-white rounded-lg w-[400px] h-[300px] max-w-md p-4 shadow-xl text-slate-800">
                                                  <div className="flex justify-between items-center mb-4">
                                                    <h2 className="font-bold text-lg">Select Manager </h2>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => setShowManagers(false)} 
                                                        className="text-xl"
                                                        >
                                                        <IoIosCloseCircle size={24} />
                                                        </button>

                                                  </div>
                            
                                                  <input
                                                    onChange={managerSearch}
                                                    value={searchValueMg}
                                                    className="mb-3 w-full px-4 py-1 border-b-2 border-slate-700 bg-transparent outline-none"
                                                    type="text"
                                                    placeholder="Search Manager"
                                                    name="managerName"
                                                    id="managerName"
                                                  />
                            
                                                  <div className="max-h-48 overflow-y-auto">
                                                    {allManagers.map((c, index) => (
                                                      <div
                                                        key={index}
                                                        onClick={() => {
                                                          setState({ ...state, managerName:c.name, manager: c._id });
                                                          setShowManagers(false);
                                                        }}
                                                        className="cursor-pointer py-2 px-4 hover:bg-accent hover:text-slate-300 font-semibold rounded-md"
                                                      >
                                                        {c.name}
                                                      </div>
                                                    ))}
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                          </div>

                                          {/* RandFs */}
                                          <div className="w-full pt-3">
                                            <div className="font-bold h-3 text-gray-500 text-xs uppercase mb-2">ASSIGN A Rank and File Employees</div>
                                            
                                            <input
                                              readOnly
                                              onClick={() => setShowRandF(true)}
                                              value={selectedRandFs.map((item) => item.name).join(', ')}
                                              className="w-full bg-transparent px-4 py-1 focus:border-accent outline-none border-2 border-slate-500 rounded-md text-slate-500"
                                              type="text"
                                              placeholder="Rank and file Employees"
                                              name="randfName"
                                              id="randfName"
                                            />

                            
                                            {/* Modal */}
                                            {showRandF && (
                                              <div className="fixed inset-0 z-50 bg-gray-500/50 flex items-center justify-center ">
                                                <div className="bg-white rounded-lg w-[400px] h-[300px] max-w-md p-4 shadow-xl text-slate-800">
                                                  <div className="flex justify-between items-center mb-4">
                                                    <h2 className="font-bold text-lg">Select Rank and File Employees </h2>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => setShowRandF(false)} 
                                                        className="text-xl"
                                                        >
                                                        <IoIosCloseCircle size={24} />
                                                        </button>

                                                  </div>
                            
                                                  <input
                                                    onChange={randfSearch}
                                                    value={searchValueRf}
                                                    className="mb-3 w-full px-4 py-1 border-b-2 border-slate-700 bg-transparent outline-none"
                                                    type="text"
                                                    placeholder="Search Rank and File Employees"
                                                    name="rfName"
                                                    id="rfName"
                                                  />
                            
                                                  <div className="max-h-48 overflow-y-auto">
                                                  {allRandFs.map((f) => {
                                                      const isChecked = selectedRandFs.some((item) => item._id === f._id);
                                                      return (
                                                        <label
                                                          key={f._id}
                                                          className="flex items-center px-4 py-2 hover:bg-primary hover:text-slate-100 font-bold rounded-md w-full cursor-pointer"
                                                        >
                                                          <input
                                                            type="checkbox"
                                                            className="mr-2"
                                                            checked={isChecked}
                                                            onChange={() => handleRandFsToggle({ _id: f._id, name: f.name })}
                                                          />
                                                          {f.name}
                                                        </label>
                                                      );
                                                    })}

                                                  </div>
                                                </div>
                                              </div>
                                            )}  
                                          </div>
                                  </div>
                             
                            <button disabled={loader_team ? true : false} className='bg-accent uppercase w-full hover:shadow-accent/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 font-bold mt-5'>
                                {
                                       loader_team ? <PropagateLoader color='#fff'cssOverride = {overRideStyle}/> : <div className="flex w-full justify-center items-start gap-1">ADD TEAM <RiTeamFill size={20} className='' /></div>
                                }
                            </button>
                         </form>
                        
                    </div> 
                   
                </div>
                      
            </div>

        </div>

    </div>
  )
}

export default Teams
