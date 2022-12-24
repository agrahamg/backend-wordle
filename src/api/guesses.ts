import type { SupabaseClient } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import type { Database } from "@/database.types";
import { throwOnNoData } from "@/api/utils";

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
