import connectToDB from "./db/index";
import express, { Application } from "express";
const app: Application = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(8080, async () => {
  console.log("Server is running on port 8080");
  try {
    await connectToDB();
    console.log("Connected to DB");
  } catch (e) {
    console.error("Error connecting to DB", e);
  }
});
