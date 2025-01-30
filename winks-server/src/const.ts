import { config } from "dotenv";

config();

export const DB_USER = process.env.DB_USER;
export const DB_PSWD = process.env.DB_PSWD;
export const PORT = process.env.PORT || 8080;
