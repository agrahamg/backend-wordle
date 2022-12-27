import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/database.types";
import { checkLetters } from "@/utils/checkLetters";
import { z } from "zod";
import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const inputSchema = z.object({ id: z.number().min(1), guess: z.string() });

export type Input = z.infer<typeof inputSchema>;

async function guess(req: NextRequest) {
  if (req.method !== "POST") {
    return new Response(null, {
      status: 400,
    });
  }

  const input = inputSchema.parse(await req.json());
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient<Database>({ req, res });

  const serviceClient = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_KEY ?? ""
  );

  const [{ data: game }, { data: guesses }] = await Promise.all([
    serviceClient
      .from("games")
      .select("word, id")
      .eq("id", input.id)
      .throwOnError()
      .single(),
    supabase
      .from("guesses")
      .select("attempt")
      .eq("game_id", input.id)
      .throwOnError(),
  ]);

  if (!game || !guesses) {
    throw Error("No record found");
  }

  const attempt = Math.max(0, ...guesses.map((obj) => obj.attempt)) + 1;

  if (attempt > 6) {
    throw Error("Game over");
  }

  const insert = {
    attempt,
    game_id: game.id,
    correct: game.word === input.guess,
    guess: input.guess,
    answer_key: checkLetters(game.word, input.guess),
  };

  console.log({ game });
  // throw Error("here");

  const { data: guess } = await supabase
    .from("guesses")
    .insert(insert)
    .throwOnError()
    .select("*")
    .single();

  if (!guess) {
    throw Error("No record found");
  }

  return new Response(JSON.stringify(guess), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
export default guess;
