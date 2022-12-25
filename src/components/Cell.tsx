import { memo } from "react";

function Cell({
  letter,
  answer_key,
}: {
  letter?: string;
  answer_key?: string;
}) {
  let color = "unset";
  if (answer_key === "🟩") {
    color = "#6aaa64";
  } else if (answer_key === "🟨") {
    color = "#c9b458";
  } else if (answer_key === "⬜️") {
    color = "#787c7e";
  }

  return (
    <div
      className={`${
        answer_key ? "text-white" : " "
      } flex items-center justify-center border-2 border-gray-300 font-bold capitalize `}
      style={{ width: "54px", height: "54px", backgroundColor: color }}
    >
      {letter}
    </div>
  );
}

export default memo(Cell);
