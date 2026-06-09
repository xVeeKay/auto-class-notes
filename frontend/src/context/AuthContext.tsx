import { createContext,useState,useEffect } from "react";
import { apiFetch } from "../api/fetchClient";

type User={
    _id:string,
    name:string,
    email: string
}

export const AuthContext=createContext<any>(null)

const AuthProvider = ({children}:any) => {
    const [user,setUser]=useState<User | null>(null)
    const [loading,setLoading]=useState(true)
    const fetchMe=async()=>{
        try {
            const res=await apiFetch("/auth/me")
            setUser(res.data)
        } catch (error) {
            setUser(null)
        } finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchMe()
    },[])
  return (
    <AuthContext.Provider value={{user,setUser,loading}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider