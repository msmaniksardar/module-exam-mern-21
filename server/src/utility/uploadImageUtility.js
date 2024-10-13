import multer from "multer";

export const uploadImage = () => {
    try {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) { cb(null, "./public/images") },
            filename: function (req, file, cb) {
                const fileName = Date.now() +"_"+ file.originalname;
                cb(null, fileName)
            }
        });
        return multer({ storage: storage }).single("image");
    } catch (error) {
        throw new Error("Failed To upload Picture")
    }

}