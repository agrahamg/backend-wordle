import type { SupabaseClient } from "@supabase/supabase-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import type { Database } from "@/database.types";
import { throwOnNoData } from "@/api/utils";

const tableName = "games";

const queryKey = [tableName];

function getSingle<T>(supabase: SupabaseClient<T>, id?: string) {
  return supabase.from(tableName).select().eq("id", id).throwOnError().single();
}

function getMultiple(supabase: SupabaseClient<Database>) {
  return supabase
    .from(tableName)
    .select()
    .order("created_at", { ascending: false });
}

export function useGetGames() {
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

export function useGetGame(id?: string, staleTime = 60) {
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

export type Insert = Database["public"]["Tables"][typeof tableName]["Insert"];

export function useUpdateGame() {
  const queryClient = useQueryClient();
  const supabase = useSupabaseClient<Database>();

  return useMutation(
    async (update: Insert) => {
      return throwOnNoData(
        supabase.from(tableName).upsert(update).select().single()
      );
    },
    {
      onSuccess(data) {
        queryClient.setQueryData([...queryKey, data.id.toString()], data);
      },
    }
  );
}
