import { useRouter } from "next/router";
import { useGetInvitedGame } from "@/api/invitedGames";

export default function IndexItem() {
  const router = useRouter();
  const id = router.query.id?.toString();
  console.log({ id, router });

  const { data, isLoading, error } = useGetInvitedGame(id);

  if (isLoading) return "Loading...";
  if (error || !data) return "An error has occurred: ";

  return (
    <div className="prose">
      <h1>Play</h1>

      <div>word: {data.word_length}</div>

      <div>hint: {data.hint}</div>
    </div>
  );
}
