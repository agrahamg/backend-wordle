import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Header() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();

  return (
    <nav className="flex justify-between">
      <div className="flex gap-2">
        <Link href="/">Wordle</Link>
        {user ? (
          <>
            <Link href="/games">Created Games</Link>
            <Link href="/play">Playable Games</Link>
          </>
        ) : null}
      </div>

      {user ? (
        <button
          onClick={() => {
            supabase.auth.signOut();
            router.push("/");
          }}
        >
          logout
        </button>
      ) : (
        <Link href="/login">login</Link>
      )}
    </nav>
  );
}
