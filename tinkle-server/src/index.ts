import { PORT } from "./const";
import connectToDB from "./db/index";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import {
  InputInterface,
  inputSchema as inputSchema,
} from "./validation/tinkle";
import { SafeParseReturnType, ZodIssue } from "zod";
import morgan from "morgan";
import helmet from "helmet";
import execInput from "./commands";

const app: Application = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

app.get("/", function (req: Request, res: Response): void {
  res.status(200).json({ message: "Hello World" });
});
app.post("/", function (req: Request, res: Response): void {
  const { input }: { input: string } = req.body;

  const parsedInput: SafeParseReturnType<InputInterface, InputInterface> =
    inputSchema.safeParse({
      input,
    });

  if (parsedInput.success) {
    const validatedInput: string = parsedInput.data.input;
    execInput(validatedInput);
  } else {
    parsedInput.error.errors.forEach((error: ZodIssue): void =>
      console.error(error.message)
    );
    res.status(200).json({ errors: parsedInput.error.errors });
  }
});

app.listen(PORT, function (): void {
  console.log(`Server is running on port ${PORT}`);
  connectToDB()
    .then((): void => {
      console.log("Connected to DB");
    })
    .catch(console.error);
});
