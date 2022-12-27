import type { SupabaseClient } from "@supabase/supabase-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import type { Database } from "@/database.types";
import { throwOnNoData } from "@/api/utils";
import { Input } from "@/pages/api/guess";

const tableName = "guesses";

const queryKey = [tableName];

function getMultiple(supabase: SupabaseClient<Database>, id?: string) {
  return supabase
    .from(tableName)
    .select()
    .eq("game_id", id)
    .order("created_at");
}

export function useGetGuesses(id?: string) {
  const supabase = useSupabaseClient<Database>();

  return useQuery(
    [...queryKey, id],
    async () => throwOnNoData(getMultiple(supabase, id)),
    { enabled: !!id }
  );
}

export function useCreateGuess(id: number) {
  const queryClient = useQueryClient();

  return useMutation(
    [...queryKey, id.toString()],
    async (input: Input) => {
      const res = await fetch("/api/guess", {
        method: "POST",
        body: JSON.stringify(input),
      });
      const resData = await res.json();
      return resData as Database["public"]["Tables"]["guesses"]["Row"];
    },
    {
      onSuccess(data) {
        const queryKey = ["guesses", id.toString()];
        const queryData = queryClient.getQueryData(queryKey);
        if (Array.isArray(queryData)) {
          queryClient.setQueryData(queryKey, [...queryData, data]);
        }
      },
    }
  );
}
