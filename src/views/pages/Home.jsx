import React from 'react'
import {Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

const Home = () => {
  const {role} = useSelector(state=>state.auth)
  // const {role, userInfo} = useSelector(state=>state.auth)
  // const {r} = useSelector(state=>state.auth)

  console.log(role)


  if(role === 'admin') return <Navigate to='admin/dashboard' replace/>
  else if(role === 'agent') return <Navigate to='agent/dashboard' replace/>
  else if(role === 'team-lead') return <Navigate to='team-lead/dashboard' replace/>
  else if(role === 'manager') return <Navigate to='manager/dashboard' replace/>
  else if(role === 'coo') return <Navigate to='coo/dashboard' replace/>
  else if(role === 'ceo') return <Navigate to='ceo/dashboard' replace/>
  else return <Navigate to='/login' replace/>
}

export default Home