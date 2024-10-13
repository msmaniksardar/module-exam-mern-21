import dotenv from "dotenv"
dotenv.config(); 

export const SERVER_PORT = 3000;
export const SERVER_URL = process.env.DATABASE_URL;
export const REQUEST_SIZE = "10mb";
export const URL_ENCODED = true;
export const SERVER_REQUEST_TIME = 15 * 60 * 1000; // 15 minutes 
export const SERVER_REQUEST_LIMIT = 200;
export const JSON_TOKEN_KEY = "AMARSONARBANGLAAMITOMAI@@!!!11";
export const JSON_TOKEN_EXPIRE_TIME = "30d";