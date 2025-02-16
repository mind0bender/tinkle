import yargsParser, { Arguments } from "yargs-parser";

export default function execCommand(input: string): Promise<void> {
  return new Promise(
    (
      resolve: (value: void | PromiseLike<void>) => void,
      reject: (reason?: any) => void
    ): void => {
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
          break;
        case "read":
          console.log("Get command");
          break;
        case "write":
          console.log("Post command");
          break;
        case "delete":
          console.log("Delete command");
          break;
        case "list":
          console.log("List command");
          break;
        case "clear":
          console.log("Clear command");
          break;
        case "history":
          console.log("History command");
          break;
        default:
          console.warn("Invalid command", { command, args });
          break;
      }
      resolve();
    }
  );
}
