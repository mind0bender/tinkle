import { OutputGeneratorReturnType, OutputType } from "../commands";
import Tinkle, { TinkleInterface } from "../db/schema/tinkle";
import { nanoid } from "nanoid";

export default async function* write(
  args: (string | number)[]
): OutputGeneratorReturnType {
  if (!args.length) {
    return {
      text: "Write what?",
      type: OutputType.error,
      timestamp: new Date(),
      done: true,
    };
  }
  yield {
    text: `Writing ${args[0]}`,
    type: OutputType.normal,
    timestamp: new Date(),
    done: false,
  };
  const hash: string = nanoid(4);
  const tinkle: TinkleInterface = new Tinkle({
    hash,
    text: args[0],
  });
  await tinkle.save();
  return {
    text: `Tinkle saved with hash: ${hash}`,
    type: OutputType.normal,
    timestamp: new Date(),
    done: true,
  };
}
