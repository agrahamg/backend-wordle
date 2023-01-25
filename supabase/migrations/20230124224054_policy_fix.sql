drop policy "See all guesses on games you are invited to" on "public"."guesses";

create policy "See all guesses on games you are invited to"
on "public"."guesses"
as permissive
for select
to public
using ((((EXISTS ( SELECT 1
   FROM invited_games
  WHERE (guesses.game_id = invited_games.id))) AND (EXISTS ( SELECT 1
   FROM completed_plays
  WHERE ((completed_plays.user_id = auth.uid()) AND (completed_plays.game_id = guesses.game_id))))) OR (EXISTS ( SELECT 1
   FROM games
  WHERE (guesses.game_id = games.id)))));



