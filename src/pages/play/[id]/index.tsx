import { useRouter } from "next/router";
import { useGetInvitedGame } from "@/api/invitedGames";
import { useGetMyGuesses } from "@/api/guesses";
import Row from "@/components/Row";
import { ActiveRow } from "@/components/ActiveRow";
import { OtherPlayers } from "@/components/OtherPlayers";
import { Keyboard } from "@/components/Keyboard";

export default function IndexItem() {
  const router = useRouter();
  const id = router.query.id?.toString();

  const { data: game, isLoading, error } = useGetInvitedGame(id);
  const { data: serverGuesses, isLoading: guessesLoading } =
    useGetMyGuesses(id);

  if (isLoading || guessesLoading) return "Loading...";
  if (error || !game || !serverGuesses) return "An error has occurred: ";

  const isFinished = serverGuesses.some((guess) => guess.correct);

  return (
    <div className="prose space-y-5">
      <div>
        <h1>Play</h1>

        <div>Word Length: {game.word_length}</div>

        <div>Hint: {game.hint}</div>

        <div className="flex flex-col items-start gap-1">
          {Array.from({ length: 6 }).map((_, i) => {
            const guess = serverGuesses[i];

            if (guess) {
              return <Row length={game.word_length} {...guess} key={i} />;
            }

            if (!guess && !isFinished && (i === 0 || serverGuesses[i - 1])) {
              return <ActiveRow game={game} key={i} />;
            }

            return <Row length={game.word_length} key={i} />;
          })}
        </div>
      </div>

      <Keyboard guesses={serverGuesses} />

      <OtherPlayers id={game.id} />
    </div>
  );
}
