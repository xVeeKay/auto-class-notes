import React,{useState} from 'react'
import { uploadFetch } from '@/api/fetchClient'

const UploadBox = () => {
    const [file,setFile]=useState<File | null>(null)
    async function upload(){
        if(!file) return
        const formData=new FormData()
        formData.append("image",file)
        await uploadFetch("/notes/upload",formData)
        alert("File Uploaded and processing started")
    }
  return (
    <div>
      <input
        type="file"
        onChange={(e) =>
          setFile(e.target.files?.[0] || null)
        }
      />

      <button onClick={upload}>
        Upload
      </button>
    </div>
  )
}

export default UploadBox