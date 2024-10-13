import createHttpError from "http-errors";
import { successResponse } from "../controllers/responseController.js"
import { studentModel } from "../models/studentModel.js";
import bcryptjs from "bcryptjs";
import { ENCODE_TOKEN } from "../utility/jsonwebtoken.js";
import mongoose from 'mongoose';
import { studentFileModel } from "../models/studentFileModel.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { access, accessSync, unlink, unlinkSync } from "fs";

const __filename = fileURLToPath(import.meta.url);

const ObjectId = mongoose.Types.ObjectId;

export const resgistrationStudentService = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const isEmailExist = await studentModel.findOne({ email: reqBody.email });
        if (isEmailExist) { return next(createHttpError(409, "Email Already in Database")) }
        const data = await studentModel.create(reqBody);
        return successResponse(res, {
            statatusCode: 200,
            message: "STUDENT REGISTRATION SUCCESSFULL",
            payload: data
        })
    } catch (error) {
        next(error)
    }
}

export const loginStudentService = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const isEmailExist = await studentModel.findOne({ email: reqBody.email });

        if (!isEmailExist) {
            return next(createHttpError(404, "Email Doesn't Exist")); // Use next to pass the error
        }

        const matchPassword = await bcryptjs.compare(reqBody.password, isEmailExist.password); // Await the password comparison

        if (!matchPassword) {
            return next(createHttpError(404, "Please Enter Correct Password")); // Use next to pass the error
        }

        const createToken = ENCODE_TOKEN({ isEmailExist });

        res.cookie("token", createToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: "none"
        })
        return successResponse(res, {
            statusCode: 200, // Corrected spelling
            message: "STUDENT LOGIN SUCCESSFUL",
            payload: createToken
        });
    } catch (error) {
        next(error); // Pass any unexpected errors to the next middleware
    }
}

export const getStudentByIdService = async (req, res, next) => {
    try {
        const reqParam = req.params;
        const id = new ObjectId(reqParam.id);
        const user = await studentModel.findById({ _id: id });
        if (!user) {
            return next(createHttpError(404, "User Not Found "));
        }
        return successResponse(res, {
            statatusCode: 200,
            message: "RETURN STUDENT INFORMATION",
            payload: user
        })
    } catch (error) {

        next(error)
    }
}

export const updateStudentByIdService = async (req, res, next) => {
    try {
        const reqParam = req.params;
        const reqBody = req.body;
        const isUserExist = await studentModel.findById({ _id: reqParam.id });
        if (!isUserExist) { return next(createHttpError(404, "Please Enter a vaild Id")) };
        const data = await studentModel.updateOne({ _id: reqParam.id }, reqBody, { new: true });
        return successResponse(res, {
            statatusCode: 200,
            message: "SUCCESSFULLY UPDATE STUDENT",
            payload: data
        })
    } catch (error) {
        next(error)
    }
}


export const uploadStudentFileService = async (req, res, next) => {
    try {

        const id = req.body.id;
        const reqFile = req.file;

        const imagePath = path.join(dirname(__filename), "../../public/images/" + reqFile.filename);

        const fileData = {
            studentId: id,
            image: reqFile.filename
        }
        const upload = await studentFileModel.create(fileData);
        console.log(id);
        return successResponse(res, {
            statatusCode: 200,
            message: "SUCCESSFULLY UPLOAD FILE",
            payload: upload
        })
    } catch (error) {
        next(error)
    }
}

export const readStudentFileService = async (req, res, next) => {
    try {
        const id = req.body.id;
        const data = await studentFileModel.find({ studentId: id });
        return successResponse(res, {
            statatusCode: 200,
            message: "READ STUDENT FILE",
            payload: data

        })
    } catch (error) {
        next(error)
    }
}

export const readStudentFileByNameService = async (req, res, next) => {
    try {
        const reqParam = req.params;
        const filePath = path.join(dirname(__filename), "../../public/images/" + reqParam.fileName)
        return res.sendFile(filePath);
    } catch (error) {
        next(error)
    }
}


export const deleteStudentFileByIdService = async (req, res, next) => {
    try {

        const id = new ObjectId(req.params.id);
        const imageFile = await studentFileModel.findById({ _id: id });
        if (!id) { return next(createHttpError(404, "Image id Not found")) }

        const imagePath = path.join(dirname(__filename), "../../public/images/" + imageFile.image)

        console.log(imagePath);
        //remove from local device  
        try {
            accessSync(imagePath);
            unlinkSync(imagePath);
            console.log("successfully detected image!");
        } catch (error) {
            throw new Error("FAILED IMAGE OPERATION", error)
        }

        await studentFileModel.findByIdAndDelete({ _id: id });


        return successResponse(res, {
            statatusCode: 200,
            message: "FILE DELETE SUCCESSFULLY",
        })
    } catch (error) {
        next(error)
    }
}


export const deleteStudentFileByFileNameService = async (req, res, next) => {
    try {
        const reqParam = req.params;
        const findImage = await studentFileModel.findOne({ image: reqParam.fileName });
        if(!findImage){ return next(createHttpError( 404 , "Faild To Find Image"))} 
        const imageURL = path.join(dirname(__filename), "../../public/images/" +  reqParam.fileName);
          //remove from local device  
          try {
            accessSync(imageURL);
            unlinkSync(imageURL);
            console.log("successfully detected image!");
        } catch (error) {
            throw new Error(`FAILED IMAGE OPERATION ${error}`)
        }

        await studentFileModel.findOneAndDelete({image: reqParam.fileName})
        return successResponse(res, {
            statusCode: 200, // Corrected typo
            message: "FILE DELETED SUCCESSFULLY",
        });
    } catch (error) {
        next(error)
    }
}