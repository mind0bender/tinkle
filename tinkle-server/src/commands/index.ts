import yargsParser, { Arguments } from "yargs-parser";

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
  switch (command) {
    case "help":
      console.log("Help command");
      yield {
        text: "Help command",
        type: OutputType.normal,
        timestamp: new Date(),
        done: false,
      };
      break;
    case "read":
      console.log("Get command");
      yield {
        text: "Get command",
        type: OutputType.normal,
        timestamp: new Date(),
        done: false,
      };
      break;
    case "write":
      console.log("Post command");
      yield {
        text: "Post command",
        type: OutputType.normal,
        timestamp: new Date(),
        done: false,
      };
      break;
    case "delete":
      console.log("Delete command");
      yield {
        text: "Delete command",
        type: OutputType.normal,
        timestamp: new Date(),
        done: false,
      };
      break;
    case "list":
      console.log("List command");
      yield {
        text: "List command",
        type: OutputType.normal,
        timestamp: new Date(),
        done: false,
      };
      break;
    case "clear":
      console.log("Clear command");
      yield {
        text: "Clear command",
        type: OutputType.normal,
        timestamp: new Date(),
        done: false,
      };
      break;
    case "history":
      console.log("History command");
      yield {
        text: "History command",
        type: OutputType.normal,
        timestamp: new Date(),
        done: false,
      };
      break;
    default:
      console.warn("Invalid command", { command, args });
      yield {
        text: "Invalid command",
        type: OutputType.error,
        timestamp: new Date(),
        done: false,
      };
      break;
  }
  return {
    text: "",
    type: OutputType.normal,
    timestamp: new Date(),
    done: true,
  };
}
