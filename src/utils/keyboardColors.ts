import type { Database } from "@/database.types";

type Guess = Database["public"]["Tables"]["guesses"]["Row"];

export function keyboardColors(guesses: Guess[]) {
  return guesses.reduce<Record<string, string | null>>((acc, guess) => {
    [...guess.guess].forEach((letter, i) => {
      //TODO find out duplicate key logic
      acc[letter] = guess.answer_key[i] ?? null;
    });
    return acc;
  }, {});
}
