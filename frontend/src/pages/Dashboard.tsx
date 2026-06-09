import React,{useState,useEffect} from 'react'
import UploadBox from '@/components/UploadBox'
import Sidebar from '@/components/Sidebar'
import { apiFetch } from '@/api/fetchClient'


const Dashboard = () => {
  const [subjects,setSubjects]=useState([])
  useEffect(()=>{
    const load=async()=>{
      const res=await apiFetch("/subjects")
      setSubjects(res.data)
    }
    load()
  },[])
  return (
    <div style={{ display: "flex" }}>
      <Sidebar subjects={subjects} />

      <div style={{ flex: 1 }}>
        <h2>Dashboard</h2>
        <UploadBox />
      </div>
    </div>
  )
}

export default Dashboard