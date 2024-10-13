import createHttpError from "http-errors";
import { DECODE_TOKEN } from "../utility/jsonwebtoken.js";

export const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) { return next(createHttpError(404, "Please Provide token")) };
        const decodeToken = DECODE_TOKEN(token);

        req.body.id = decodeToken.isEmailExist._id
        next();

    } catch (error) {
        throw new Error(`Failed Authenticate middleware ${error}`)
    }
}