import {
  ChangeEvent,
  Dispatch,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
interface PromptProps {
  command: string;
  setCommand: Dispatch<string>;
}

interface CaretPositoin {
  start: number;
  end: number;
}

export default function Prompt({
  command,
  setCommand,
}: PromptProps): JSX.Element {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inpRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  const [caretPosition, setCaretPosition] = useState<CaretPositoin>({
    start: 0,
    end: 0,
  });

  useEffect((): (() => void) => {
    const inp: HTMLInputElement | null = inpRef.current;
    onFocusChange();
    function onFocusChange(): void {
      inp!.focus();
      setIsFocused(document.hasFocus());
    }
    window.addEventListener("focusin", onFocusChange);
    window.addEventListener("focusout", onFocusChange);

    function onSelectionChange(): void {
      if (inp) {
        setCaretPosition({
          start: inp.selectionStart || 0,
          end: inp.selectionEnd || 0,
        });
      }
    }
    inp!.addEventListener("selectionchange", onSelectionChange);
    return (): void => {
      window.removeEventListener("focusin", onFocusChange);
      window.removeEventListener("focusout", onFocusChange);
      inp!.removeEventListener("selectionchange", onSelectionChange);
    };
  }, []);

  return (
    <div className={`flex items-center w-full py-4 border-t border-stone-700`}>
      <pre>
        <code className={`text-primary-300 lowercase`}>
          [theotherguy@tinkle]${" "}
        </code>

        {caretPosition.start === caretPosition.end ? (
          <>
            <code className={``}>{command.slice(0, caretPosition.start)}</code>
            <code
              className={`${
                isFocused
                  ? "bg-primary-300 text-black"
                  : "ring ring-primary-300 text-white"
              }`}>
              {command.slice(caretPosition.start, caretPosition.end + 1)}
            </code>
            <code className={``}>{command.slice(caretPosition.end + 1)}</code>
            {caretPosition.start === command.length && (
              <code
                className={`${
                  isFocused
                    ? "bg-primary-300"
                    : "ring ring-primary-300 text-white"
                }`}>
                {" "}
              </code>
            )}
          </>
        ) : (
          <>
            <code className={``}>{command.slice(0, caretPosition.start)}</code>
            <code
              className={`${
                isFocused
                  ? "bg-primary-300 text-black"
                  : "ring ring-primary-300 text-white"
              }`}>
              {command.slice(caretPosition.start, caretPosition.end)}
            </code>
            <code className={``}>{command.slice(caretPosition.end)}</code>
          </>
        )}
      </pre>
      <input
        ref={inpRef}
        type="text"
        // value={command}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
          console.log("lol");
          setCommand(e.target.value);
        }}
        autoFocus
        className={`scale-0 absolute`}
      />
    </div>
  );
}
