import { useCallback, useState } from "react";
import Output from "./components/Output";
import { Color } from "./helper/color";
import Prompt from "./components/Prompt";
import axios, { AxiosResponse } from "axios";

enum OutputType {
  normal,
  info,
  error,
}

interface OutputInterface {
  type: OutputType;
  timestamp: Date;

  text?: string | undefined;
  time?: number;
}

interface CommandResponse {
  hash: string;
}

function App(): JSX.Element {
  const SERVER_URL: string = import.meta.env.VITE_SERVER_URL;

  const [command, setCommand] = useState<string>("");

  const [outputs, setOutputs] = useState<OutputInterface[]>([]);

  const handleCommand: () => void = useCallback((): void => {
    axios
      .post(SERVER_URL, {
        input: command,
      })
      .then(({ data: { hash } }: AxiosResponse<CommandResponse>): void => {
        setOutputs((prev: OutputInterface[]): OutputInterface[] => [
          ...prev,
          {
            text: `message saved\nhash ${hash}`,
            timestamp: new Date(),
            type: OutputType.normal,
          },
        ]);
        setCommand("");
      })
      .catch(console.error);
  }, [SERVER_URL, command]);

  return (
    <div
      className={`w-full min-h-screen flex flex-col bg-stone-950 text-primary-50`}>
      <div className={`flex w-full sticky top-0 z-10`}>
        <div
          className={`py-5 px-10 bg-stone-950 border-b border-r border-stone-800`}
        />
        <div
          className={`grow bg-transparent backdrop-blur-sm backdrop-opacity-10 border-b border-stone-800 px-4 py-2  h-12 flex items-center`}>
          <Output
            theme={Color.info}
            isOutput={false}
            text={`mounting /mind0bender/tinkle.quack`}
          />
        </div>
        <div
          className={`py-5 px-10 bg-stone-950 border-b border-l border-stone-800`}
        />
      </div>
      <div className={`flex grow`}>
        <div className={`py-5 px-10 bg-black border-r border-stone-800`} />
        <div
          className={`flex flex-col  justify-end grow px-4 mb-12 h-[calc(100vh-6rem)] overflow-y-auto`}>
          <div className={`py-4 overflow-y-auto scrollbar`}>
            <Output
              nextOutputs={[
                {
                  text: "Insecure boot sequence initiated",
                  theme: Color.danger,
                  waitBefore: 3000,
                  waitAfterRounds: 3,
                },
                {
                  text: "Initializing modules",
                  waitAfterRounds: Math.random() * 3 + 3,
                },
                {
                  text: "Done.",
                },
              ]}
            />
            <Output nextOutputs={outputs} />
          </div>
          <Prompt
            command={command}
            setCommand={setCommand}
            handlenCommand={handleCommand}
          />
        </div>
        <div className={`fixed bottom-0 flex w-full z-10`}>
          <div
            className={`py-5 px-10 bg-black border-t border-r border-stone-800`}
          />
          <div
            className={`grow bg-transparent backdrop-blur-sm backdrop-opacity-10 border-t border-stone-800 px-4 py-2  h-12 flex items-center`}>
            <Output
              isOutput={false}
              text="Type help for more info"
              waitBefore={1200}
            />
          </div>
          <div
            className={`py-5 px-10 bg-black border-t border-l border-stone-800`}
          />
        </div>
        <div className={`py-5 px-10 bg-black border-l border-stone-800`} />
      </div>
    </div>
  );
}

export default App;
