import { type PostgrestSingleResponse } from "@supabase/supabase-js";

export async function throwOnNoData<T>(
  builder: PromiseLike<PostgrestSingleResponse<T>>
) {
  const { data, error } = await builder;

  if (error) {
    throw error;
  }

  if (!data) {
    throw Error("No record found");
  }

  return data;
}
