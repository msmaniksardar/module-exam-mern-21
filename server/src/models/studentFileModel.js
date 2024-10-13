import mongoose from "mongoose";

const studentFileSchema = new mongoose.Schema({
    studentId: { type: String, requird: [true, "Student Id is required"] },
    image: { type: String, required: [true, "File name is required"] }
}, { timestamps: true, versionKey: false })

export const studentFileModel = mongoose.model("studnentfiles", studentFileSchema);