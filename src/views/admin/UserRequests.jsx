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
import Search from './../components/Search';



const SellerRequest = () => {
    const dispatch = useDispatch()
    // const {userInfo} = useSelector(state=>state.auth)
    const {users, totalUsers} = useSelector(state=>state.user)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [parPage, setParpage] = useState(5)
  // const [show,setShow] = useState(false)
  


  useEffect(()=>{
    dispatch(get_users_request({
        parPage,
        searchValue,
        page: currentPage
    }))
  },[parPage, searchValue])

  
  return (
    <div className='pt-5'>
    <div className="w-full bg-[#283046] rounded-md p-4">
    <Search setParpage={setParpage} setSearchValue={setSearchValue} searchValue={searchValue}/>
       <div className="relative overflow-x-auto">
                   <table className='w-full text-sm text-left text-[#d0d2d6] my-3'>
                       <thead className='text-base text-[#d0d2d6] uppercase border-b border-slate-700'>
                       <tr>
                           <th scope='col' className='py-3 px-4'>No</th>
                           <th scope='col' className='py-3 px-4'>Name</th>
                           <th scope='col' className='py-3 px-4'>Email</th>
                           <th scope='col' className='py-3 px-4'>Role</th>
                           <th scope='col' className='py-3 px-4'>Status</th>
                           <th scope='col' className='py-3 px-4 w-fit'>Action</th>
                          
                       </tr>

                       </thead>
                       <tbody className='text-xs'>
                           {
                              users.map((u,i)=> 
                                   <tr className='border-b border-slate-700' key={i}>
                                       <td scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'>{i + 1}</td>
                  
                                       <td scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'>
                                           <span>{u.firstName} {u.lastName}</span>
                                       </td>
                                       <td scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'>
                                           <span className='font-medium`'>{u.email}</span>
                                       </td>
                                       <td scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'>
                                           <h2 className='font-bold text-accent uppercase'>{u.role} </h2>
                                       </td>
                                       {/* <td scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'>
                                           <span className='text-orange-400 font-semibold`'>{d.payment}</span>
                                       </td> */}
                                       <td scope='row' className='py-1 pl-4 font-medium whitespace-nowrap'>
                                           <span className='text-orange-400 font-semibold`'>{u.status}</span>
                                       </td>
                                       <td scope='row' className='py-2 px-4 font-medium whitespace-nowrap'>
                                          <div className="flex justify-start items-center gap-4">
                                               <Link to={`/admin/dashboard/user-details/${u._id}`}  className='p-2 bg-accent rounded hover:shadow-md hover:shadow-accent/50 flex justify-center items-center gap-1'> view more<IoEyeSharp size={15} /></Link>
                                               {/* <Link className='p-2 bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'><FaTrash/></Link> */}
                                          </div>
                                       </td>
                                   </tr>
                           ) }
                       </tbody>
                   </table>

               </div>
               
               {
                totalUsers > parPage && ( // Render only if totalSellers is greater than parPage
                    <div className="w-full flex justify-between mt-4 bottom-4 right-4 px-3">
                    <Pagination
                        pageNumber={currentPage}
                        setPageNumber={setCurrentPage}
                        totalItem={totalUsers}
                        parPage={parPage}
                        showItem={4}
                    />
                    </div>
                )
                }

    </div>
</div>
  )
}

export default SellerRequest