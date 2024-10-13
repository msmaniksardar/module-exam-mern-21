import { deleteStudentFileByFileNameService, deleteStudentFileByIdService, getStudentByIdService, loginStudentService, readStudentFileByNameService, readStudentFileService, resgistrationStudentService, updateStudentByIdService, uploadStudentFileService  } from "../services/studentService.js"

export const registrationStudent = async(req,res,next)=>{
    await resgistrationStudentService(req,res,next); 
}
export const loginStudent = async(req,res,next)=>{
    await loginStudentService(req,res,next); 
}
export const getStudentById = async(req,res,next)=>{
    await getStudentByIdService(req,res,next); 
}
export const updateStudentById = async(req,res,next)=>{
    await updateStudentByIdService(req,res,next); 
}

export const uploadStudentFile = async(req,res,next)=>{
    await uploadStudentFileService(req,res,next);
}

export const readStudentFile = async(req, res,next)=>{
    await readStudentFileService(req,res,next); 
}

export const readStudentFileByName = async(req, res,next)=>{
        await readStudentFileByNameService(req,res,next)
}


export const deleteStudentFile = async( req, res, next)=>{
    await deleteStudentFileByIdService(req,res,next);
}


export const deleteStudentFileByFileName = async( req, res, next)=>{
    await deleteStudentFileByFileNameService(req,res,next);
}