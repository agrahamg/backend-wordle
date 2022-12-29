# Backend wordle

A version of the popular app Wordle, but with some added features. 
Users can create their own games with any length word and invite others to play. 
Once a game is finished you can see what others guessed.

The word for each game is only stored on the backend so there is no looking at 
the source code to find the answer. 


## Dev setup

run 
- `supabase stop` to set up the database
- `pnpm dev` for starting up Next.js

### Database users

The database is seeded with 3 users:
 - a@a.com password `lettera`
 - b@b.com password `letterb`
 - c@c.com password `letterc`
