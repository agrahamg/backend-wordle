import type { AppProps } from "next/app";
import { trpc } from "@/utils/trpc";
import "../styles/globals.css";
import {
  type Session,
  SessionContextProvider,
} from "@supabase/auth-helpers-react";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Header } from "@/components/nav/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <QueryClientProvider client={queryClient}>
        <Header />
        <main className="container mx-auto flex justify-center pt-5">
          <Component {...pageProps} />
        </main>
        {process.env.NODE_ENV === "development" ? <ReactQueryDevtools /> : null}
      </QueryClientProvider>
    </SessionContextProvider>
  );
}

export default trpc.withTRPC(MyApp);
