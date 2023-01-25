import { type NextPage } from "next";
import Head from "next/head";
import type { InferGetStaticPropsType } from "next";
import { supabase } from "@/utils/supabase";

const Home: NextPage = ({
  games,
  guesses,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Backend Wordle</title>
        <meta name="description" content="A secure worlde implementation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {games} games {guesses} guesses
      </div>
    </>
  );
};

export async function getStaticProps() {
  const { data } = await supabase
    .from("totals")
    .select()
    .throwOnError()
    .single();

  return { props: { ...data }, revalidate: 60 };
}

export default Home;
