import Cell from "@/components/game/Cell";
import { memo } from "react";
import { Loading } from "@/components/Loading";

export function Row({
  loading = false,
  length,
  guess,
  answer_key,
}: {
  loading?: boolean;
  length: number;
  guess?: string;
  answer_key?: string[];
}) {
  const guessArray = Array.from({ length }, (_, i) => ({
    letter: guess?.[i],
    answer_key: answer_key?.[i],
  }));

  return (
    <div className="flex items-center gap-1">
      {guessArray.map((item, i) => (
        <Cell {...item} key={i} />
      ))}
      {loading ? <Loading /> : <span style={{ width: "40px" }} />}
    </div>
  );
}

export default memo(Row);
