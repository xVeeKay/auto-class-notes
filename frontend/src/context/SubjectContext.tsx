import { createContext,useContext,useState,useEffect } from "react";
import { apiFetch } from "@/api/fetchClient.ts";

const SubjectContext=createContext<any>(null)

export const SubjectProvider=({children}:{children:React.ReactNode})=>{
    const [subjects,setSubjects]=useState([])
    const [loading,setLoading]=useState(true)
    const fetchSubjects=async()=>{
        try{
            setLoading(true)
            const res=await apiFetch("/subjects")
            setSubjects(res.data)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchSubjects()
    },[])
    return(
        <SubjectContext.Provider value={{subjects,fetchSubjects,loading}}>
            {children}
        </SubjectContext.Provider>
    )
}

export const useSubjects=()=>useContext(SubjectContext)