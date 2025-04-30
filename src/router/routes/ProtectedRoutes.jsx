import React, { Suspense } from 'react'
import {useSelector} from 'react-redux'
import { Navigate } from 'react-router-dom'


const ProtectedRoutes = ({route,children}) => {
  const { category, userInfo } = useSelector(state => state.auth)
  if (category) {
      if (userInfo) {
          if (route.category) {
            console.log(route.category)
            console.log("route.category")
            console.log(userInfo.category)
            console.log("userInfo category")
              if (userInfo.category === route.category) {
                  if (route.status) {
                      if (route.status === userInfo.status) {
                          return <Suspense fallback={null}>{children}</Suspense>
                      } else {
                          if (userInfo.status === 'pending') {
                              return <Navigate to='/user/account-pending' replace />
                          } else {
                              return <Navigate to='/user/account-deactivated' replace />
                          }
                      }
                  } else {
                      if (route.visibility) {
                          if (route.visibility.some(r => r === userInfo.status)) {
                              return <Suspense fallback={null}>{children}</Suspense>
                          } else {
                              return <Navigate to='/user/account-pending' replace />
                          }
                      } else {
                          return <Suspense fallback={null}>{children}</Suspense>
                      }
                  }
                  //return <Suspense fallback={null}>{children}</Suspense>
              } else {
                  return <Navigate to='/unauthorized-access' replace />
              }
          } else {
              if (route.ability === 'user') {
                  return <Suspense fallback={null}>{children}</Suspense>
              }
          }
      }
  } else {
      return <Navigate to='/login' replace />
  }
}


export default ProtectedRoutes