import { config } from "dotenv";

config();

export const DB_USER = process.env.DB_USER;
export const DB_PSWD = process.env.DB_PSWD;

console.log({ DB_USER, DB_PSWD });
