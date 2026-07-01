import React, { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { Navigate } from 'react-router-dom'
import { SpinnerCustom } from './ui/spinner.tsx'

const ProtectedRoutes = ({children}:any) => {
    const {user,loading}=useContext(AuthContext)
    if (loading) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <SpinnerCustom />
        </div>
      );
    }
    if(!user){
        console.log("Note User")
        return <Navigate to={"/login"}/>
    }
  return children
}

export default ProtectedRoutes