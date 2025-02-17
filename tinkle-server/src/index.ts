import { PORT } from "./const";
import connectToDB from "./db/index";
import express, { Application } from "express";
import cors from "cors";
import {
  InputInterface,
  inputSchema as inputSchema,
} from "./validation/tinkle";
import { SafeParseReturnType, ZodIssue } from "zod";
import morgan from "morgan";
import helmet from "helmet";
import execInput from "./commands";
import { createServer, Server as HTTPServer } from "http";
import { Server, Socket } from "socket.io";
import boot from "./easter/boot";
import streamOutput from "./stream";

const app: Application = express();
const server: HTTPServer = createServer(app);
const io: Server = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

io.on("connection", (user: Socket): void => {
  console.log(`+ user connected\t - ${user.id}}`);
  streamOutput(boot, user, "");
  user.on("exec", (input: string): void => {
    const parsedInput: SafeParseReturnType<InputInterface, InputInterface> =
      inputSchema.safeParse({
        input,
      });
    if (parsedInput.success) {
      const validatedInput: string = parsedInput.data.input;
      streamOutput(execInput, user, validatedInput);
    } else {
      parsedInput.error.errors.forEach((error: ZodIssue): void => {
        console.warn(error.message);
        user.emit("err", error);
      });
    }
  });
  user.on("disconnect", (): void => {
    console.log(`user disconnected\t - ${user.id}`);
  });
});

server.listen(PORT, function (): void {
  console.log(`Server is running on port ${PORT}`);
  connectToDB()
    .then((): void => {
      console.log("Connected to DB");
    })
    .catch(console.error);
});
