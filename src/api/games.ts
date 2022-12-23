import type { SupabaseClient } from "@supabase/supabase-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import type { Database } from "@/database.types";

const queryKey = ["games"];

export function getGame<T>(supabase: SupabaseClient<T>, id: string) {
  return supabase.from("games").select().eq("id", id).throwOnError().single();
}
export function useGetGames() {
  const queryClient = useQueryClient();

  const supabase = useSupabaseClient<Database>();
  return useQuery(
    queryKey,
    async () => {
      const { data } = await supabase
        .from("games")
        .select()
        .order("created_at", { ascending: false })
        .throwOnError();

      if (!data) {
        throw Error("No record found");
      }
      return data;
    },
    {
      onSuccess(data) {
        data.forEach((game) =>
          queryClient.setQueryData([...queryKey, game.id.toString()], game)
        );
      },
    }
  );
}

export function useGetGame(id?: string, staleTime = 60) {
  const supabase = useSupabaseClient<Database>();

  return useQuery(
    [...queryKey, id],
    async () => {
      if (!id) {
        throw Error("No id provided");
      }

      const { data } = await getGame(supabase, id);

      if (!data) {
        throw Error("No data returned");
      }

      return data;
    },
    {
      enabled: !!id && id !== "new",
      staleTime,
    }
  );
}

export type Insert = Database["public"]["Tables"]["games"]["Insert"];

export function useUpdateGame() {
  const supabase = useSupabaseClient<Database>();

  return useMutation(async (update: Insert) => {
    const { data } = await supabase
      .from("games")
      .upsert(update)
      .select("id")
      .throwOnError()
      .single();

    if (!data) {
      throw Error("No data returned");
    }

    return data;
  });
}
