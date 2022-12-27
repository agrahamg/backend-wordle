import { useEffect, useState } from "react";
import { type Database } from "@/database.types";
import { Row } from "@/components/game/Row";
import { useMakeGuess } from "@/api/guesses";

export function ActiveRow({
  game,
}: {
  game: Database["public"]["Views"]["invited_games"]["Row"];
}) {
  const [localGuess, setLocalGuess] = useState("");

  const mutation = useMakeGuess(game?.id?.toString());

  useEffect(() => {
    const handleKeyUp = async ({ key }: KeyboardEvent) => {
      if (
        key === "Enter" &&
        !mutation.isLoading &&
        localGuess.length === game.word_length
      ) {
        mutation.mutate({ id: game.id, guess: localGuess });
      } else if (key === "Backspace") {
        setLocalGuess((guess) => guess.slice(0, -1));
      } else if (
        key >= "a" &&
        key <= "z" &&
        localGuess.length < game.word_length
      ) {
        setLocalGuess((guess) => guess + key);
      }
    };

    window.addEventListener("keydown", handleKeyUp);
    return () => window.removeEventListener("keydown", handleKeyUp);
  }, [setLocalGuess, localGuess, game, mutation]);

  return (
    <Row
      length={game.word_length}
      guess={localGuess}
      loading={mutation.isLoading}
    />
  );
}
