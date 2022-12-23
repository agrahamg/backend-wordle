import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import type { Insert } from "@/api/games";
import { useGetGame, useUpdateGame } from "@/api/games";

export default function ClientEdit() {
  //get the data
  const router = useRouter();
  const id = router.query.id?.toString();

  const { data, isLoading, error } = useGetGame(id, Infinity);

  const { register, handleSubmit } = useForm<Insert>({
    values: data,
  });

  // set up mutation
  const mutation = useUpdateGame();

  if (id !== "new") {
    if (isLoading) return "Loading...";
    if (error || !data) return `An error has occurred: ${error}`;
  }

  const onSubmit = handleSubmit((formData) => {
    mutation.mutate(formData, {
      onSuccess({ id }) {
        router.push(`/games/${id}`);
      },
    });
  });

  return (
    <div className="prose">
      <h1>This is an update</h1>
      <form onSubmit={onSubmit} className="flex flex-col">
        <label>
          Word
          <input type="text" {...register("word")} />
        </label>

        <label>
          Hint
          <input type="text" {...register("hint")} />
        </label>

        <button
          type="submit"
          className="rounded border bg-blue-400 p-1"
          disabled={mutation.isLoading}
        >
          Submit
        </button>
        {mutation.isLoading ? "loading" : null}
      </form>
    </div>
  );
}
