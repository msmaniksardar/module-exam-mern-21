import express from "express";
export const route = express.Router();

import * as studentController from "../controllers/studentController.js";
import { authenticate } from "../middlewares/authentication.js";
import { uploadImage } from "../utility/uploadImageUtility.js";



// Student Route  

route.post("/registration", studentController.registrationStudent);
route.get("/login", studentController.loginStudent);
route.get("/student/:id", studentController.getStudentById);
route.post("/update-student/:id", studentController.updateStudentById);

// handle student file upload 
route.post("/upload-file", uploadImage(),  authenticate, studentController.uploadStudentFile);
route.get("/read-file", authenticate, studentController.readStudentFile);
route.get("/read-file/:fileName", authenticate, studentController.readStudentFileByName);
route.post("/delete-file/:id", authenticate, studentController.deleteStudentFile);
route.post("/delete/:fileName", authenticate, studentController.deleteStudentFileByFileName);



