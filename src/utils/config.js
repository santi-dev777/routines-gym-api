import {config} from "dotenv"

config();

export const PORT = process.env.PORT || 1234;
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "root123";
export const DB_DATABASE = process.env.DB_DATABASE || "gymdb";
export const DB_PORT = process.env.DB_PORT || 3307;