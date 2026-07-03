import multer from "multer"
import apiError from "../../utils/apiError.js"

const allowedMimeTypes = [
  "image/png",
  "image/jpeg",
//   "image/webp",

//   "application/pdf",

//   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

//   "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

const storage=multer.memoryStorage()

const fileFilter:multer.Options["fileFilter"]=(_req,file,cb)=>{
    if(allowedMimeTypes.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(
          new apiError(
            400,
            "Only PNG, JPG files are allowed.",
          ),
        );
    }
}

const upload=multer({
    storage,
    limits: {
        fileSize: 25 * 1024 * 1024
    },
    fileFilter
})

export default upload
