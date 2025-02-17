import { sleepAndReturn } from "../stream";
import { OutputGeneratorReturnType, OutputType } from "../commands";

export default async function* boot(
  scale: number = 1
): OutputGeneratorReturnType {
  yield await {
    text: "Insecure boot sequence initiated",
    type: OutputType.error,
    done: false,
  };
  yield await sleepAndReturn(2000 * scale, {
    text: "Loading configuration",
    type: OutputType.info,
    done: false,
  });
  yield await sleepAndReturn(8000 * scale, {
    text: "Initializing modules",
    type: OutputType.info,
    done: false,
  });
  yield {
    text: "Done",
    type: OutputType.info,
    done: false,
  };
  yield await sleepAndReturn(8000 * scale, {
    text: "Starting services",
    type: OutputType.info,
    done: false,
  });
  yield {
    text: "Done",
    type: OutputType.info,
    done: false,
  };
  return {
    text: "Boot sequence complete",
    type: OutputType.info,
    timestamp: new Date(),
    done: true,
  };
}
