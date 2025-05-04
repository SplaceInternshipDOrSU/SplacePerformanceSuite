import React ,{useEffect, useState} from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import {Link} from 'react-router-dom'
import Pagination from '../Pagination';
import { BsImage } from 'react-icons/bs';
import { IoClose } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import {get_active_users} from '../../store/Reducers/userReducer'
import {categories_get, roles_get} from '../../store/Reducers/adminReducer'
import { useDispatch, useSelector } from 'react-redux';

const Users = () => {
    const dispatch= useDispatch()
    // const {userInfo} = useSelector(state=>state.auth)
    const {users, totalUsers} = useSelector(state=>state.user)
    const {roles,categories} = useSelector(state=>state.admin)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [parPage, setParpage] = useState(4)
    // const [show,setShow] = useState(false)


    const [state, setState]= useState({
        role: "",
        category: ""
    })

    useEffect(()=>{
        const obj = {
            parPage : parseInt(parPage), 
            page : parseInt(currentPage), 
            searchValue,
            role : state.role,
            category : state.category
        }
        dispatch(get_active_users(obj))
    },[searchValue, currentPage, parPage, state, dispatch])


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
    
  return (
    <div className='pt-5+'>
         <div className="w-full p-4 bg-[#283046] rounded-md">
            <div className="flex justify-between  items-center w-full">
                <div className="">
                  {/* <h2>ROLE:{state.role}</h2>
                  <h2>CATEGORY:{state.category}</h2> */}
                </div>
                <div className="flex gap-2">


                    <select onChange={(e)=>setState({...state, role: e.target.value})} className='px-4 py-2 focus:border-accent uppercase outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]'>
                        <option value="">ROLE</option>
                        {
                            roles.map((role, i)=>
                                <option className='uppercase' key={i} value={role.name}>{role.name}</option>
                            )
                        }
                    </select>

                    <select onChange={(e)=>setState({...state, category: e.target.value})} className='px-4 py-2  uppercase focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]'>
                        <option value="">CATEGORY</option>
                        {
                            categories.map((cat, i)=>
                                <option key={i} value={cat.name}>{cat.name}</option>
                            )
                        }
                    </select>
                    <select onChange={(e)=>setParpage(parseInt(e.target.value))} className='px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]'>
                        <option value="5">5</option>
                        <option value="5">15</option>
                        <option value="5">25</option>
                    </select>
                    <input value={searchValue} onChange={e=>setSearchValue(e.target.value)} className=' px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='search' />
                </div>
                 
            </div>

            <div className="relative overflow-x-auto">
            <table className='w-full text-sm text-left text-[#d0d2d6]'>
                    <thead className='text-xs text-[#d0d2d6] uppercase border-b border-slate-700'>
                        <tr>
                            <th scope='col' className='py-3 px-4'>Profile Image</th>
                            <th scope='col' className='py-3 px-4'>Name</th>
                            <th scope='col' className='py-3 px-4'>Email</th>
                            <th scope='col' className='py-3 px-4'>Role</th>
                            <th scope='col' className='py-3 px-4'>Category</th>
                            <th scope='col' className='py-3 px-4'>Status</th>
                            <th scope='col' className='py-3 px-4'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-xs'>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="7" className='py-4 text-center text-[#d0d2d6]'>No users found.</td>
                            </tr>
                        ) : (
                            users.map((d, i) => 
                                <tr key={i}>
                                    <td scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'>
                                        <img className='h-[90px] w-[90px] rounded-md py-1 obj' src={d.profileImage} alt="" />
                                    </td>
                                    <td scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'>
                                        <span>{d.firstName} {d.lastName}</span>
                                    </td>
                                    <td scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'>
                                        <span>{d.email}</span>
                                    </td>
                                    <td scope='row' className='py-1 pl-4 font-bold whitespace-nowrap uppercase text-accent '>
                                        <span> {d.role?.name ? d.role.name : d.role}</span>
                                    </td>
                                    <td scope='row' className='py-1 pl-4 font-bold whitespace-nowrap uppercase text-accent'>
                                        <span>{d.category?.name ? d.category.name : d.category}</span>
                                    </td>
                                    <td scope='row' className='py-1 pl-4 font-bold whitespace-nowrap uppercase'>
                                        <span className='text-green-400 font-semibold'>{d.status}</span>
                                    </td>
                                    <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                        <div className="flex justify-start items-center gap-4">
                                            <Link to={`/admin/dashboard/user-details/${d._id}`} className='font-bold p-2 bg-accent rounded hover:shadow-lg hover:shadow-accent/20 flex justify-center items-center gap-1'>VIEW MORE<IoEyeSharp size={20} /></Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>

                    </div>   
                    <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                        {
                            totalUsers <= parPage ? "" :
                            <Pagination
                            pageNumber = {currentPage}
                            setPageNumber = {setCurrentPage}
                            totalItem = {50}
                            parPage = {parPage}
                            showItem = {4}
                        />
                        }
              
           </div>
         </div>
    </div>
  )
}

export default Users