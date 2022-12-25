import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/dist/client/components/navigation";

export function Header() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-2 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center items-stretch gap-2">
          <Link href="/" className="inline-flex items-center pr-2 text-xl">
            Backend Wordle
          </Link>
          <Navigation />
        </div>

        <Login />
      </div>
    </nav>
  );
}

function Navigation() {
  const user = useUser();
  const path = usePathname();

  const links = [
    {
      title: "Create Games",
      href: "/games",
    },
    {
      title: "Play Games",
      href: "/play",
    },
  ].map((link) => ({ ...link, active: path?.startsWith(link.href) }));

  if (!user) {
    return null;
  }

  return (
    <>
      {links.map(({ title, href, active }) => (
        <Link
          href={href}
          key={href}
          className={`${
            active
              ? "border-indigo-500 text-gray-900"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
          } inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`}
        >
          {title}
        </Link>
      ))}
    </>
  );
}

function Login() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();

  if (!user) {
    return <Link href="/login">login</Link>;
  }

  return (
    <button
      onClick={() => {
        supabase.auth.signOut();
        router.push("/");
      }}
    >
      logout
    </button>
  );
}
