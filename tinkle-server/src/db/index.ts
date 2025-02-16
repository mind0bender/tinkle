import { DB_PSWD, DB_USER } from "../const";
import { connect, Mongoose } from "mongoose";

export default function connectToDB(): Promise<Mongoose> {
  return new Promise(
    (
      resolve: (value: Mongoose) => void,
      reject: (reason?: any) => void
    ): void => {
      console.log("Connecting to DB...");
      connect(
        `mongodb+srv://${DB_USER}:${DB_PSWD}@winks01.x9xys.mongodb.net/?retryWrites=true&w=majority&appName=winks01`
      )
        .then(resolve)
        .catch(reject);
    }
  );
}
