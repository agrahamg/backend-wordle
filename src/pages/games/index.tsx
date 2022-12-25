import Link from "next/link";
import { usePathname } from "next/dist/client/components/navigation";
import { useGetGames } from "@/api/games";
import { formatDistanceToNow, parseISO } from "date-fns";

export default function Games() {
  const pathname = usePathname();

  const { data, isLoading, error } = useGetGames();

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: ";

  return (
    <div className="prose">
      <div>
        <h1>Games</h1>
        <p>Create games for others to play</p>
        <Link
          href={"/games/new/edit"}
          className="rounded border bg-blue-400 p-1"
        >
          new
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Created</th>
            <th>Word</th>
            <th>Hint</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((obj) => (
            <tr key={obj.id}>
              <td>{formatDistanceToNow(parseISO(obj.created_at))}</td>
              <td>
                <Link href={`${pathname}/${obj.id}`}>{obj.word}</Link>
              </td>
              <td>{obj.hint}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
