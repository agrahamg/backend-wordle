import Link from "next/link";
import { usePathname } from "next/dist/client/components/navigation";
import { useRouter } from "next/router";
import { useGetGame } from "@/api/games";

export default function IndexItem() {
  const router = useRouter();
  const path = usePathname();
  const id = router.query.id?.toString();

  const { data, isLoading, error } = useGetGame(id);

  if (isLoading) return "Loading...";
  if (error || !data) return "An error has occurred: ";

  return (
    <div className="prose">
      <h1>Game</h1>

      <div>word: {data.word}</div>

      <div>hint: {data.hint}</div>

      <Link href={path + "/edit"} className="rounded border bg-blue-400 p-1">
        edit
      </Link>
    </div>
  );
}
