import { config } from "dotenv";

config();

export const DB_USER: string | undefined = process.env.DB_USER;
export const DB_PSWD: string | undefined = process.env.DB_PSWD;
export const PORT: string | number = process.env.PORT || 8080;
