import { DB_PSWD, DB_USER } from "../const";
import { connect } from "mongoose";

export default async function connectToDB(): Promise<void> {
  console.log("Connecting to DB...");
  try {
    await connect(
      `mongodb+srv://${DB_USER}:${DB_PSWD}@winks01.x9xys.mongodb.net/?retryWrites=true&w=majority&appName=winks01`
    );
  } catch (e: unknown) {
    console.error("Error connecting to DB", e);
  }
}
