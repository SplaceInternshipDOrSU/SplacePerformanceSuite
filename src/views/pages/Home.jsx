import React from 'react'
import {Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

const Home = () => {
  const {category} = useSelector(state=>state.auth)
  // const {role, userInfo} = useSelector(state=>state.auth)
  // const {r} = useSelector(state=>state.auth)

  console.log(category)
  console.log("category ------------------- YWA")


  if(category.name === 'admin') return <Navigate to='admin/dashboard' replace/>
  else if(category === 'rankandfile') return <Navigate to='rank-and-file/dashboard' replace/>
  else if(category === 'supervisor') return <Navigate to='supervisor/dashboard' replace/>
  else if(category === 'manager') return <Navigate to='manager/dashboard' replace/>
  else if(category === 'coo') return <Navigate to='coo/dashboard' replace/>
  else if(category === 'ceo') return <Navigate to='ceo/dashboard' replace/>
  else return <Navigate to='/user' replace/>
}
// rankandfile, supervisor, manager,coo,ceo
export default Home