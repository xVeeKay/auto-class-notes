import multer from "multer";
import apiError from "../../utils/apiError.js";
const storage = multer.memoryStorage();
const fileFilter = (_req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(new apiError(400, "Only JPEG and PNG allowed"));
    }
};
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter
});
export default upload;
