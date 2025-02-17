import { OutputGeneratorReturnType, OutputType } from "../commands";

export default async function* help(): OutputGeneratorReturnType {
  const helpText: string = `
Available commands:
- help: Display this help message.
- read: Read a tinkle.
- write: create a tinkle.
  `;
  return {
    text: helpText,
    type: OutputType.normal,
    timestamp: new Date(),
    done: true,
  };
}
