import { router } from "../trpc";
import { guessesRouter } from "./guesses";

export const appRouter = router({
  guesses: guessesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
