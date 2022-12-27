import { memo } from "react";
import { colorKey } from "@/utils/colorKey";

function Cell({
  letter,
  answer_key,
}: {
  letter?: string;
  answer_key?: string;
}) {
  const backgroundColor = colorKey(answer_key) ?? "unset";

  return (
    <div
      className={`${
        answer_key ? "text-white" : " "
      } flex items-center justify-center border-2 border-gray-300 font-bold capitalize `}
      style={{ width: "54px", height: "54px", backgroundColor }}
    >
      {letter}
    </div>
  );
}

export default memo(Cell);
