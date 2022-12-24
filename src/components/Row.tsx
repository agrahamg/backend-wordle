import Cell from "@/components/Cell";
import { memo } from "react";

export function Row({
  length,
  guess,
  answer_key,
}: {
  length: number;
  guess?: string;
  answer_key?: string[];
}) {
  const guessArray = Array.from({ length }, (_, i) => ({
    letter: guess?.[i],
    answer_key: answer_key?.[i],
  }));

  return (
    <div className="flex gap-1">
      {guessArray.map((item, i) => (
        <Cell {...item} key={i} />
      ))}
    </div>
  );
}

export default memo(Row);
