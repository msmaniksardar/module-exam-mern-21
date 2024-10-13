import mongoose, { set } from "mongoose";
import bcryptjs from "bcryptjs";
const studentSchema = new mongoose.Schema({
    fname: { type: String, required: [true, "First name is required"] },
    lname: { type: String, required: [true, "Lname is required"] },
    phone: { type: Number, required: [true, "Phone Number is required"] },
    email: { type: String, unique: true, required: [true, "Email is required"] },
    password: { type: String, required: [true, "Password is required"], set: (v) => bcryptjs.hashSync(v, 10)  },

}, { timestamps: true, versionKey: false })


export const studentModel = mongoose.model("students", studentSchema);