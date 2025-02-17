import { sleepAndReturn } from "../stream";
import { OutputGeneratorReturnType, OutputType } from "../commands";

export default async function* boot(): OutputGeneratorReturnType {
  yield await {
    text: "Insecure boot sequence initiated",
    type: OutputType.error,
    done: false,
  };
  yield await sleepAndReturn(2000, {
    text: "Loading configuration",
    type: OutputType.info,
    done: false,
  });
  yield await sleepAndReturn(8000, {
    text: "Initializing modules",
    type: OutputType.info,
    done: false,
  });
  yield {
    text: "Done",
    type: OutputType.info,
    done: false,
  };
  yield await sleepAndReturn(8000, {
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
