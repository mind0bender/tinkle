import Tinkle, { TinkleInterface } from "../db/schema/tinkle";
import { OutputGeneratorReturnType, OutputType } from "../commands";

export default async function* read(
  args: (string | number)[]
): OutputGeneratorReturnType {
  if (!args.length) {
    return {
      text: "Read what?",
      type: OutputType.error,
      timestamp: new Date(),
      done: true,
    };
  }
  yield {
    text: `Reading ${args[0]}`,
    type: OutputType.normal,
    done: false,
  };
  const tinkle: TinkleInterface | null = await Tinkle.findOne(
    {
      hash: args[0],
    },
    {
      text: 1,
      createdAt: 1,
    }
  );
  if (!tinkle) {
    return {
      text: `tinkel not found
make sure you have the right hash`,
      type: OutputType.error,
      timestamp: new Date(),
      done: true,
    };
  }
  yield {
    text: `Tinkle:
\t───────┬────────────────────
\t       │ hash: ${args[0]}\t\t\t
\t───────┼────────────────────`,
    type: OutputType.normal,
    done: false,
  };
  const lines: string[] = tinkle.text.split("\n");
  for (let i: number = 0; i < lines.length; i++) {
    const line: string = lines[i];
    yield {
      text: `\t\t${i + 1}  │ ${line}`,
      type: OutputType.normal,
      done: false,
    };
  }
  yield {
    text: `\t───────┴────────────────────`,
    type: OutputType.normal,
    done: false,
  };
  return {
    text: `created at: ${tinkle.createdAt.toISOString()}`,
    type: OutputType.normal,
    timestamp: new Date(),
    done: true,
  };
}
