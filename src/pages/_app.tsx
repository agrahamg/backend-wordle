import type { AppProps } from "next/app";
import { trpc } from "../utils/trpc";
import "../styles/globals.css";
import {
  type Session,
  SessionContextProvider,
} from "@supabase/auth-helpers-react";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Header } from "../components/Header";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <Header />
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}

export default trpc.withTRPC(MyApp);
