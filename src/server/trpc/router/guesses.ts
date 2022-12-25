import { z } from "zod";

import { router, publicProcedure } from "../trpc";
import { checkLetters } from "@/utils/checkLetters";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/env/server.mjs";
import { type Database } from "@/database.types";

export const guessesRouter = router({
  guess: publicProcedure
    .input(z.object({ id: z.number().min(1), guess: z.string() }))
    .mutation(async ({ input, ctx: { supabase } }) => {
      const serviceClient = createClient<Database>(
        env.NEXT_PUBLIC_SUPABASE_URL,
        env.SUPABASE_SERVICE_KEY
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

      const { data: guess } = await supabase
        .from("guesses")
        .insert(insert)
        .throwOnError()
        .select("*")
        .single();

      if (!guess) {
        throw Error("No record found");
      }

      return guess;
    }),
});
