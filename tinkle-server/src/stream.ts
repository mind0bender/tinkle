import {
  OutputGeneratorReturnType,
  OutputStream,
  OutputType,
} from "./commands";
import { Socket } from "socket.io";

export default async function streamOutput(
  generator: (input: string) => OutputGeneratorReturnType,
  user: Socket,
  input: string
): Promise<void> {
  const outputGenerator: OutputGeneratorReturnType = generator(input);
  let outputIter: IteratorResult<OutputStream, OutputStream> =
    await outputGenerator.next();
  while (true) {
    const output: OutputStream = outputIter.value;
    if (!output) break;
    switch (output.type) {
      case OutputType.info:
        user.emit("info", output);
        break;
      case OutputType.error:
        user.emit("err", output);
        break;
      case OutputType.normal:
        user.emit("out", output);
        break;
    }
    if (output.done) {
      user.emit("done");
      break;
    }
    outputIter = await outputGenerator.next();
  }
}

export function sleepAndReturn(
  ms: number,
  output: OutputStream
): Promise<OutputStream> {
  return new Promise(
    (
      resolve: (value: OutputStream | PromiseLike<OutputStream>) => void
    ): NodeJS.Timeout => setTimeout((): void => resolve(output), ms)
  );
}
