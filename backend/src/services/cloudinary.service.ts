import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier"


const uploadToCloudinary=(fileBuffer:Buffer):Promise<string>=>{
    return new Promise((resolve,reject)=>{
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'study-notes-ai',
          },
          (error,result)=>{
            if(error || !result){
                return reject(error)
            }
            resolve(result.secure_url)
          }
        )
        streamifier.createReadStream(fileBuffer).pipe(stream)
    })
}

export default uploadToCloudinary