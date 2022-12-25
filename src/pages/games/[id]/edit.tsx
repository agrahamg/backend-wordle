import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useGetGame, useUpdateGame } from "@/api/games";
import { InputGroup } from "@/components/InputGroup";
import { Button } from "@/components/Button";

export default function ClientEdit() {
  //get the data
  const router = useRouter();
  const id = router.query.id?.toString();

  const { data, isLoading, error } = useGetGame(id, Infinity);

  const { register, handleSubmit } = useForm({
    values: {
      ...data,
      players: data?.players.join(", "),
      word: data?.word || "",
    },
  });

  // set up mutation
  const mutation = useUpdateGame();

  if (id !== "new") {
    if (isLoading) return "Loading...";
    if (error || !data) return `An error has occurred: ${error}`;
  }

  const onSubmit = handleSubmit((formData) => {
    mutation.mutate(
      {
        ...formData,
        players:
          formData?.players?.split(",")?.map((player) => player.trim()) ?? [],
      },
      {
        onSuccess({ id }) {
          router.push(`/games/${id}`);
        },
      }
    );
  });

  return (
    <div className="prose">
      <h1>This is an update</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <InputGroup
          label="Word"
          type="text"
          {...register("word", { required: true })}
        />

        <InputGroup label="Hint" type="text" {...register("hint")} />

        <InputGroup label="Players" type="text" {...register("players")} />

        <div className="flex justify-end">
          <Button type="submit" disabled={mutation.isLoading}>
            Submit
          </Button>
        </div>

        {mutation.isLoading ? "loading" : null}
      </form>
    </div>
  );
}
