create or replace view "public"."totals" as  SELECT ( SELECT count(*) AS count
           FROM games) AS games,
    ( SELECT count(*) AS count
           FROM guesses) AS guesses;



