drop policy "Only see your guesses on games you can see" on "public"."guesses";

create or replace view "public"."completed_plays" as  SELECT guesses.user_id,
    guesses.game_id
   FROM guesses
  WHERE (guesses.correct = true);


create or replace view "public"."user_email" as  SELECT users.id,
    users.email
   FROM auth.users;


create policy "Crud actions: your guesses on games you can see"
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


create policy "See all guesses on games you are invited to"
on "public"."guesses"
as permissive
for select
to public
using (((EXISTS ( SELECT 1
   FROM games
  WHERE ((guesses.game_id = games.id) AND (games.user_id = auth.uid())))) OR ((EXISTS ( SELECT 1
   FROM invited_games
  WHERE (guesses.game_id = invited_games.id))) AND (EXISTS ( SELECT 1
   FROM completed_plays
  WHERE ((completed_plays.user_id = auth.uid()) AND (completed_plays.game_id = completed_plays.game_id)))))));



