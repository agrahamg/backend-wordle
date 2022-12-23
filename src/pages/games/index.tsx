import Link from "next/link";
import { usePathname } from "next/dist/client/components/navigation";
import { useGetGames } from "@/api/games";

export default function Games() {
  const pathname = usePathname();

  const { data, isLoading, error } = useGetGames();

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: ";

  return (
    <div className="prose">
      <div>
        <h1>Games</h1>
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
            <th>id</th>
            <th>createdAt</th>
            <th>name</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((obj) => (
            <tr key={obj.id}>
              <td>{obj.id}</td>
              <td>{obj.created_at}</td>
              <td>
                <Link href={`${pathname}/${obj.id}`}>{obj.word}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
