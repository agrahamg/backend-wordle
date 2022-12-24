import type { SupabaseClient } from "@supabase/supabase-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import type { Database } from "@/database.types";
import { throwOnNoData } from "@/api/utils";

const tableName = "invited_games";

const queryKey = [tableName];

function getSingle(supabase: SupabaseClient<Database>, id?: string) {
  return supabase.from(tableName).select().eq("id", id).single();
}

function getMultiple(supabase: SupabaseClient<Database>) {
  return supabase
    .from("invited_games")
    .select()
    .order("created_at", { ascending: false });
}

export function useGetInvitedGames() {
  const queryClient = useQueryClient();
  const supabase = useSupabaseClient<Database>();

  return useQuery(queryKey, () => throwOnNoData(getMultiple(supabase)), {
    onSuccess(data) {
      data.forEach((obj) =>
        queryClient.setQueryData([...queryKey, obj.id.toString()], obj)
      );
    },
  });
}

export function useGetInvitedGame(id?: string, staleTime = 60) {
  const supabase = useSupabaseClient<Database>();

  return useQuery(
    [...queryKey, id],
    async () => throwOnNoData(getSingle(supabase, id)),
    {
      enabled: !!id,
      staleTime,
    }
  );
}
