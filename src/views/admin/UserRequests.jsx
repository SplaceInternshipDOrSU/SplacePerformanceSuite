import React ,{useEffect, useState} from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import {Link} from 'react-router-dom'
import Pagination from '../Pagination';
import { BsImage } from 'react-icons/bs';
import { IoClose } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";

import { useDispatch, useSelector } from 'react-redux';


// import { useDispatch, useSelector } from 'react-redux';
import {get_users_request} from '../../store/Reducers/userReducer'
import {categories_get, roles_get} from '../../store/Reducers/adminReducer'
import Search from './../components/Search';



const SellerRequest = () => {
    const dispatch = useDispatch()
    // const {userInfo} = useSelector(state=>state.auth)
    const {users, totalUsers,totalPages } = useSelector(state=>state.user)
       const {roles,categories} = useSelector(state=>state.admin)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [parPage, setParpage] = useState(5)
  // const [show,setShow] = useState(false)
  
 const [state, setState]= useState({
        role: "",
        category: ""
    })

  useEffect(()=>{
    dispatch(get_users_request({
        parPage,
        searchValue,
        page: currentPage,
        role : state.role,
        category : state.category
    }))
  },[parPage, searchValue, currentPage,state, dispatch])

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
    <div className='pt-5'>
    <div className="w-full bg-[#283046] rounded-md p-4">
    <div className="flex justify-between  items-center w-full">
                <div className="">
                </div>
                <div className="flex gap-2">
                    <select onChange={(e)=>setState({...state, role: e.target.value})} className='px-4 py-2 focus:border-accent uppercase outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]'>
                        <option value="">ROLE</option>
                        {
                            roles.map((role, i)=>
                                <option className='uppercase' key={i} value={role._id}>{role.name}</option>
                            )
                        }
                    </select>

                    <select onChange={(e)=>setState({...state, category: e.target.value})} className='px-4 py-2  uppercase focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]'>
                        <option value="">CATEGORY</option>
                        {
                            categories.map((cat, i)=>
                                <option key={i} value={cat._id}>{cat.name}</option>
                            )
                        }
                    </select>
                    <select onChange={(e)=>setParpage(parseInt(e.target.value))} className='px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]'>
                        <option value="5">5</option>
                        <option value="15">15</option>
                        <option value="25">25</option>
                    </select>
                    <input value={searchValue} onChange={e=>setSearchValue(e.target.value)} className=' px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='search' />
                </div>
                 
            </div>
    {/* <Search setParpage={setParpage} setSearchValue={setSearchValue} searchValue={searchValue}/> */}
       <div className="relative overflow-x-auto pt-6">
       {users.length > 0 ? (
        <table className='w-full text-sm text-left text-[#d0d2d6] my-3'>
            <thead className='text-base text-[#d0d2d6] uppercase border-b border-slate-700'>
            <tr>
                <th scope='col' className='py-3 px-4'>No</th>
                <th scope='col' className='py-3 px-4'>Name</th>
                <th scope='col' className='py-3 px-4'>Email</th>
                <th scope='col' className='py-3 px-4'>Role</th>
                <th scope='col' className='py-3 px-4'>Category</th>
                <th scope='col' className='py-3 px-4'>Status</th>
                <th scope='col' className='py-3 px-4 w-fit'>Action</th>
            </tr>
            </thead>
            <tbody className='text-xs'>
            {users.map((u, i) => (
                <tr className='border-b border-slate-700' key={i}>
                <td scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'>{u.number}</td>
                <td scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'>
                    <span>{u.firstName} {u.lastName}</span>
                </td>
                <td scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'>
                    <span className='font-medium'>{u.email}</span>
                </td>
                <td scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'>
                    <h2 className='font-bold text-accent uppercase'>
                    {u.role?.name ? u.role.name : u.role}
                    </h2>
                </td>
                <td scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'>
                    <h2 className='font-bold text-accent uppercase'>
                    {u.category?.name ? u.category.name : u.category}
                    </h2>
                </td>
                <td scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'>
                    <span className='text-orange-400 font-semibold'>{u.status}</span>
                </td>
                <td scope='row' className='py-2 px-4 font-medium whitespace-nowrap'>
                    <div className="flex justify-start items-center gap-4">
                    <Link to={`/admin/dashboard/user-details/${u._id}`} className='p-2 bg-accent rounded hover:shadow-md hover:shadow-accent/50 flex justify-center items-center gap-1'>
                        view more<IoEyeSharp size={15} />
                    </Link>
                    </div>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        ) : (
        <div className="w-full text-center text-[#d0d2d6] py-10">
            <h2 className="text-lg font-semibold">No user requests found.</h2>
        </div>
        )}


               </div>
               
               {
                totalUsers > parPage && ( // Render only if totalSellers is greater than parPage
                    <div className="w-full flex justify-between mt-4 bottom-4 right-4 px-3">
                         <div className="pl-3 text-xs font-semibold text-slate-100">
                        <h2>Page <span className='text-accent'>{currentPage}</span> of {totalPages}</h2>
                    </div>
                        
                    <Pagination
                        pageNumber={currentPage}
                        setPageNumber={setCurrentPage}
                        totalItem={totalUsers}
                        parPage={parPage}
                        showItem={totalPages}
                    />
                    </div>
                )
                }

    </div>
</div>
  )
}

export default SellerRequest