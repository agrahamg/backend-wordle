import { useEffect, useState } from "react";
import { type Database } from "@/database.types";
import { trpc } from "@/utils/trpc";
import { useQueryClient } from "@tanstack/react-query";
import { Row } from "@/components/Row";

export function ActiveRow({
  game,
}: {
  game: Database["public"]["Views"]["invited_games"]["Row"];
}) {
  const [localGuess, setLocalGuess] = useState("");

  const queryClient = useQueryClient();
  const mutation = trpc.guesses.guess.useMutation({
    onSuccess(data) {
      const queryKey = ["guesses", game.id.toString()];
      const queryData = queryClient.getQueryData(queryKey);
      if (Array.isArray(queryData)) {
        queryClient.setQueryData(queryKey, [...queryData, data]);
      }
    },
  });

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
        localGuess.length < (game.word_length || 0)
      ) {
        setLocalGuess((guess) => guess + key);
      }
    };

    window.addEventListener("keydown", handleKeyUp);
    return () => window.removeEventListener("keydown", handleKeyUp);
  }, [setLocalGuess, localGuess, game, mutation]);

  return <Row length={game.word_length} guess={localGuess} />;
}
