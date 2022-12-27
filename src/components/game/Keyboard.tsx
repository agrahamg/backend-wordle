import type { Database } from "@/database.types";
import { keyboardColors } from "@/utils/keyboardColors";
import type { HTMLAttributes, PropsWithChildren } from "react";
import { colorKey } from "@/utils/colorKey";

type Guess = Database["public"]["Tables"]["guesses"]["Row"];
export function Keyboard({ guesses }: { guesses: Guess[] }) {
  const colors = keyboardColors(guesses);

  return (
    <div
      className="flex flex-col items-center space-y-1"
      style={{ marginLeft: "-50px" }}
    >
      <div className="flex gap-1">
        {"qwertyuiop".split("").map((key) => (
          <Key character={key} key={key} colors={colors} />
        ))}
      </div>
      <div className="flex gap-1">
        {"asdfghjkl".split("").map((key) => (
          <Key character={key} key={key} colors={colors} />
        ))}
      </div>
      <div className="flex gap-1">
        <Key character={"Enter"} />
        {"zxcvbnm".split("").map((key) => (
          <Key character={key} key={key} colors={colors} />
        ))}
        <Key character={"Backspace"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            className="game-icon"
            data-testid="icon-backspace"
          >
            <path
              fill="var(--color-tone-1)"
              d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
            ></path>
          </svg>
        </Key>
      </div>
    </div>
  );
}

function Key({
  character,
  colors,
  children,
}: PropsWithChildren<{
  character: string;
  colors?: Record<string, string | null>;
}>) {
  const backgroundColor = colorKey(colors?.[character]);

  let style = { minWidth: "35px" } as HTMLAttributes<HTMLDivElement>["style"];
  if (backgroundColor) {
    style = { ...style, backgroundColor };
  }

  return (
    <div
      onClick={() =>
        window.dispatchEvent(new KeyboardEvent("keydown", { key: character }))
      }
      className="select-none rounded bg-gray-300 p-3 text-center capitalize"
      style={style}
    >
      {children ?? character}
    </div>
  );
}
