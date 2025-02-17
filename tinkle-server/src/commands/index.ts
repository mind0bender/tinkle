import yargsParser, { Arguments } from "yargs-parser";
import read from "./read";
import write from "./write";
import help from "./help";

export enum OutputType {
  normal,
  info,
  error,
}

export interface OutputStream {
  text?: string;
  type: OutputType;
  timestamp?: Date;
  done: boolean;
}

export type OutputGeneratorReturnType = AsyncGenerator<
  OutputStream,
  OutputStream,
  OutputStream
>;

export default async function* execCommand(
  input: string
): OutputGeneratorReturnType {
  const parsedInput: Arguments = yargsParser(input);
  const command: string | number = parsedInput._[0];
  const args: (string | number)[] = parsedInput._.slice(1).map(
    (arg: string | number): string | number => {
      if (typeof arg === "string" && arg.match(/['"]*['"]/)) {
        return arg.slice(1, -1);
      }
      return arg;
    }
  );
  let output: OutputGeneratorReturnType | null = null;
  switch (command) {
    case "help":
      output = help();
      break;
    case "read":
      output = read(args);
      break;
    case "write":
      output = write(args);
      break;
    case "delete":
      console.log("Delete command");
      return {
        text: "Delete command",
        type: OutputType.normal,
        timestamp: new Date(),
        done: true,
      };
    case "list":
      console.log("List command");
      return {
        text: "List command",
        type: OutputType.normal,
        timestamp: new Date(),
        done: true,
      };
    case "clear":
      console.log("Clear command");
      return {
        text: "Clear command",
        type: OutputType.normal,
        timestamp: new Date(),
        done: true,
      };
    case "history":
      console.log("History command");
      return {
        text: "History command",
        type: OutputType.normal,
        timestamp: new Date(),
        done: true,
      };
    default:
      console.warn("Invalid command", { command, args });
      return {
        text: "Invalid command",
        type: OutputType.error,
        timestamp: new Date(),
        done: true,
      };
  }
  let iter: IteratorResult<OutputStream, OutputStream> = await output.next();
  while (true) {
    const outputStream: OutputStream = iter.value;
    if (!outputStream) break;
    if (!outputStream.done) {
      yield outputStream;
    } else {
      return outputStream;
    }
    iter = await output.next();
  }
  return {
    text: "wtf",
    type: OutputType.error,
    timestamp: new Date(),
    done: true,
  };
}
