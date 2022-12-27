import { useGetGuesses } from "@/api/guesses";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import type { Database } from "@/database.types";
import { useQuery } from "@tanstack/react-query";
import { throwOnNoData } from "@/api/utils";

type Guess = Database["public"]["Tables"]["guesses"]["Row"];

export function OtherPlayers({ id }: { id: number }) {
  const user = useUser();
  const { data: guesses } = useGetGuesses(id.toString());

  const otherGuesses = guesses?.filter((obj) => obj.user_id !== user?.id);

  if (!otherGuesses || otherGuesses.length === 0) {
    return null;
  }

  const foo = otherGuesses.reduce((acc, guess) => {
    acc[guess.user_id] = acc[guess.user_id] ?? [];
    acc[guess.user_id]?.push(guess);

    return acc;
  }, {} as Record<string, Guess[]>);

  return (
    <div className="pt-5">
      <h1>Other Players</h1>
      {Object.entries(foo).map(([user_id, guesses]) => (
        <OtherPlayer key={user_id} guesses={guesses} user_id={user_id} />
      ))}
    </div>
  );
}

function OtherPlayer({
  guesses,
  user_id,
}: {
  guesses: Guess[];
  user_id: string;
}) {
  const supabase = useSupabaseClient<Database>();
  const { data: user } = useQuery(
    ["users", user_id],
    async () =>
      throwOnNoData(
        supabase
          .from("user_email")
          .select()
          .eq("id", user_id)
          .throwOnError()
          .single()
      ),
    { staleTime: Infinity }
  );

  return (
    <div>
      <h2>{user?.email}</h2>
      <h3>guesses</h3>
      {guesses.map((guess) => (
        <div key={guess.attempt}>
          {guess.guess} {guess.correct ? "✅" : null}
        </div>
      ))}
    </div>
  );
}
