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
    color = "green";
  } else if (answer_key === "🟨") {
    color = "yellow";
  } else if (answer_key === "⬜️") {
    color = "gray";
  }

  return (
    <div
      className="flex items-center justify-center border border-gray-500"
      style={{ width: "54px", height: "54px", backgroundColor: color }}
    >
      {letter}
    </div>
  );
}

export default memo(Cell);
