alter table "public"."guesses" drop constraint "guesses_id_key";

drop index if exists "public"."guesses_id_key";

alter table "public"."games" alter column "players" set not null;

alter table "public"."guesses" add column "answer_key" character varying[] not null;

create policy "Only see your guesses on games you can see"
on "public"."guesses"
as permissive
for all
to public
using (((EXISTS ( SELECT 1
   FROM invited_games
  WHERE (guesses.game_id = invited_games.id))) AND (auth.uid() = user_id)))
with check (((EXISTS ( SELECT 1
   FROM invited_games
  WHERE (guesses.game_id = invited_games.id))) AND (auth.uid() = user_id)));



