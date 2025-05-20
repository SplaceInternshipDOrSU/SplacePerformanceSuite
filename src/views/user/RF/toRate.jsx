import React ,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Pagination from '../../Pagination';
import { FaEdit, FaTrash } from 'react-icons/fa'
import { BsImage } from 'react-icons/bs';
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

import {PropagateLoader} from 'react-spinners'
import { overRideStyle } from '.././../../utils/Utils';
import { toast } from 'react-hot-toast';
import { FaExclamationCircle } from "react-icons/fa"
import { FaChevronRight } from "react-icons/fa";;

import {useSelector, useDispatch} from 'react-redux'
import { roleAdd ,messageClear, roles_get ,roleDelete,get_role_by_id,roleEdit,editErrorClear} from '../../../store/Reducers/adminReducer';
import { fetchMyPeers } from '../../../store/Reducers/ratingReducer';
import Search from '.././../components/Search';
import Modal from '.././../../Components/Modal/modal';
// import UserRoles from './UserRoles copy';

const UserRoles = () => {
    // NEW SHIT
    const dispatch = useDispatch()
    const {userInfo} = useSelector(state=>state.auth)
    const {myPeers} = useSelector(state=>state.rating)
    // NEW SHIT

    const {roles,totalRoles,totalPages, loader, successMessage, errorMessage, loader_delete,loader_role,role,editError, editErrorMessage} = useSelector(state=>state.admin)

    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [parPage, setParpage] = useState(5)
    const [show,setShow] = useState(false)
    // const [imageShow, setImage] = useState('')
    const [state,setState] = useState({
        name: '',
        description : ''
    })
    const [stateEdit,setStateEdit] = useState({
        name: '',
        description : ''
    })
  

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

    const add_Role = (e)=>{
        e.preventDefault()
        console.log(state)
        dispatch(roleAdd(state))
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
        description : ''
    })
    
    const obj = {
        parPage : parseInt(parPage),
        page : parseInt(currentPage),
        searchValue : ""

    }
    dispatch(roles_get(obj))
}
},[successMessage, errorMessage])

useEffect(()=>{
    const obj = {
        parPage : parseInt(parPage),
        page : parseInt(currentPage),
        searchValue

    }
    dispatch(roles_get(obj))
}, [searchValue, currentPage, parPage])




const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedRoleId, setSelectedRoleId] = useState(null);
const [selectedRoleName, setSelectedRoleName] = useState(null);

const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// const [selectedRoleId, setSelectedRoleId] = useState(null);
// const [selectedRoleName, setSelectedRoleName] = useState(null);

const openModal = (roleId,role) => {
    setSelectedRoleId(roleId);
    setSelectedRoleName(role);
  setIsModalOpen(true);
};

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
const openEditModal = (roleId,role) => {
    dispatch(get_role_by_id(roleId))
    setSelectedRoleId(roleId);
    setSelectedRoleName(role);
    setIsEditModalOpen(true);
};

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
useEffect(() =>{
    dispatch(fetchMyPeers({userId :userInfo._id}))
},[userInfo, dispatch])
// NEW SHIT
  return (
    <div className=' pt-5'>
        {/* <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#283046] rounded-md">
                <h1 className='text-text_color font-semibold text-lg text-slate-100'>EMPLOYEE ROLES</h1>  
            <button onClick={()=> setShow(true)} className='bg-accent shadow-lg hover:shadow-accent/50 px-4 py-2 cursor-pointer text-white rounded-md text-sm font-semibold'>ADD EMPLOYEE ROLE</button>
        </div> */}
        <div className="flex-wrap w-full lg:grid grid-cols-3 lg:gap-4 flex gap-10">
            <div className="w-full col-span-2 ">
                <h2 className='font-bold text-3xl text-slate-200 pb-3'>MY PEERS</h2>
                <div className="w-full p-4 bg-[#283046] rounded-md ">
                    <Search setParpage={setParpage} setSearchValue={setSearchValue} searchValue={searchValue}/>
                    <div className="relative overflow-x-auto">
                        <table className='w-full text-sm text-left text-[#d0d2d6]'>
                            <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
                            <tr>
                                <th scope='col' className='py-3 px-4'>No</th>
                                <th scope='col' className='py-3 px-4'>Name</th>
                                <th scope='col' className='py-3 px-4'>Role</th>
                                <th scope='col' className='py-3 px-4'>Category</th>
                                <th scope='col' className='py-3 px-4 text-end'>Actions</th>
                                {/* <th scope='col' className='py-3 px-4'>Name</th>
                                <th scope='col' className='py-3 px-4'>Action</th> */}
                            </tr>

                            </thead>
                            <tbody>
                                {
                                    loader_delete ? 
                                    (
                                    <div className="absolute bg-[#283046] top-0 bottom-0 left-0 right-0 w-full h-full text-center flex justify-center items-center ">
                                        <h2>Loading...</h2>
                                      </div>
                                    )
                                    :
                                    (
                                        <div className="">
                                            
                                        </div>
                                    )
                                }
                            {myPeers && myPeers.length > 0 ? (
                                    myPeers.map((peer, i) => (
                                    <tr key={i}>
                                        <td className="py-1 px-4 font-medium whitespace-nowrap">{i+1}</td>
                                        <td className="py-1 px-4 font-medium whitespace-nowrap">
                                          <span>{peer.name}</span>
                                        </td>
                                        <td className="py-1 px-4 font-medium whitespace-nowrap">
                                          <span>{peer.role.name}</span>
                                        </td>
                                        <td className="py-1 px-4 font-medium whitespace-nowrap">
                                          <span>{peer.category.name}</span>
                                        </td>
                                     
                                        <td className="py-1 px-4 font-medium whitespace-nowrap">
                                        <div className="flex justify-end items-center gap-4">
                                            <Link to={`/rank-and-file/peer-evaluate/${peer._id}`} className='bg-accent uppercase p-2 rounded flex justify-center items-center gap-1 font-bold'>
                                            RATE {peer.firstName} <FaChevronRight />
                                            </Link>
                                           
                                            {/* <button
                                                onClick={() => openEditModal(peer._id, peer.name)}
                                                className={`p-2 rounded flex justify-center items-center gap-1 font-bold ${
                                                                loader_delete === peer._id
                                                                ? "bg-gray-500 cursor-not-allowed"
                                                                : "bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50"
                                                            }`}
                                                disabled={loader_delete === peer._id}
                                                >
                                               
                                                    <span className="flex items-center gap-2">
                                                    RATE <FaChevronRight />
                                                    </span>
                                                
                                            </button> */}
                                        </div>
                                        </td>
                                    </tr>
                                    ))
                                ) : (
                                    <tr>
                                    <td colSpan="4" className="px-4 text-center font-medium py-5">No Roles available.</td>
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
                            totalItem = {totalRoles}
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
        </div>

    </div>
  )
}

export default UserRoles
