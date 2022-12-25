import Link from "next/link";
import { usePathname } from "next/dist/client/components/navigation";
import { useGetInvitedGames } from "@/api/invitedGames";
import { formatDistanceToNow, parseISO } from "date-fns";

export default function Games() {
  const pathname = usePathname();

  const { data, isLoading, error } = useGetInvitedGames();

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: ";

  return (
    <div className="prose">
      <div>
        <h1>Play</h1>
        <p>Play games others have created</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Created</th>
            <th>Word Length</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((obj) => (
            <tr key={obj.id}>
              <td>{formatDistanceToNow(parseISO(obj.created_at))}</td>
              <td>
                <Link href={`${pathname}/${obj.id}`}>{obj.word_length}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
