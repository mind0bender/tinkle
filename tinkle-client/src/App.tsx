import Output from "./components/Output";
import { Color } from "./helper/color";

function App(): JSX.Element {
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
          className={`flex flex-col justify-between grow px-4 mb-12 py-2 h-[calc(100vh-6rem)] overflow-y-auto`}>
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
                waitAfterRounds: Math.floor(Math.random() * 3 + 3),
              },
              {
                text: "Done.",
              },
            ]}
          />
          <br />
          <br />
        </div>
        <div className={`fixed bottom-0 flex w-full z-10`}>
          <div
            className={`py-5 px-10 bg-black border-t border-r border-stone-800`}
          />
          <div
            className={`grow bg-transparent backdrop-blur-sm backdrop-opacity-10 border-t border-stone-800 px-4 py-2  h-12 flex items-center`}>
            <Output
              text="Type help for more info"
              theme={Color.primary}
              waitBefore={800}
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
