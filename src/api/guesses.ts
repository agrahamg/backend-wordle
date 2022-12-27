import type { SupabaseClient } from "@supabase/supabase-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import type { Database } from "@/database.types";
import { throwOnNoData } from "@/api/utils";
import { trpc } from "@/utils/trpc";

const tableName = "guesses";

const queryKey = [tableName];

function getMultiple(supabase: SupabaseClient<Database>, id?: string) {
  return supabase
    .from(tableName)
    .select()
    .eq("game_id", id)
    .order("created_at");
}

export function useGetMyGuesses(id?: string) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();

  return useQuery(
    [...queryKey, id],
    async () => throwOnNoData(getMultiple(supabase, id)),
    {
      enabled: !!id,
      select(data) {
        return data.filter((obj) => obj.user_id === user?.id);
      },
    }
  );
}

export function useGetGuesses(id?: string) {
  const supabase = useSupabaseClient<Database>();

  return useQuery(
    [...queryKey, id],
    async () => throwOnNoData(getMultiple(supabase, id)),
    { enabled: !!id }
  );
}

export function useMakeGuess(id?: string) {
  const queryClient = useQueryClient();
  return trpc.guesses.guess.useMutation({
    onSuccess(data) {
      const queryKey = ["guesses", id];
      //If they finished the game fetch other players guesses
      if (data.correct) {
        return queryClient.invalidateQueries(queryKey);
      }

      const queryData = queryClient.getQueryData(queryKey);
      if (Array.isArray(queryData)) {
        queryClient.setQueryData(queryKey, [...queryData, data]);
      }
    },
  });
}
