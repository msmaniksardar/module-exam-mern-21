import jwt from "jsonwebtoken"

import { JSON_TOKEN_EXPIRE_TIME, JSON_TOKEN_KEY } from "../config/config.js"

export const ENCODE_TOKEN = (payload) => {

    return jwt.sign(payload, JSON_TOKEN_KEY, { expiresIn: JSON_TOKEN_EXPIRE_TIME })
}


export const DECODE_TOKEN = (token) => {
    try {
        const decode = jwt.verify(token, JSON_TOKEN_KEY);
        return decode;
    } catch (error) {
        console.error("Token verification error:", error);
        return null
    }
}