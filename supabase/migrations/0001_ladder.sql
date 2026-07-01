-- ============================================================
-- The Padel Range — Ladder & Auth schema
-- Run this in Supabase: Dashboard → SQL Editor → paste → Run
-- ============================================================

-- 1. Profiles (one row per signed-up user, linked to Supabase auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 2. Ladder players (rank position + win/loss record)
create table if not exists public.ladder_players (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  rank_position int not null unique,
  wins int not null default 0,
  losses int not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.ladder_players enable row level security;

create policy "Ladder is viewable by everyone"
  on public.ladder_players for select
  using (true);

-- No direct insert/update policies for ladder_players — all writes go
-- through the report_match() function below (security definer), so
-- players can't just edit their own rank/wins from the client.

-- 3. Match history
create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  winner_id uuid not null references public.profiles(id),
  loser_id uuid not null references public.profiles(id),
  score text,
  winner_rank_before int not null,
  loser_rank_before int not null,
  created_at timestamptz not null default now()
);

alter table public.matches enable row level security;

create policy "Match history is viewable by everyone"
  on public.matches for select
  using (true);

-- 4. Auto-create profile + ladder entry when someone signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  next_rank int;
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)));

  select coalesce(max(rank_position), 0) + 1 into next_rank from public.ladder_players;

  insert into public.ladder_players (user_id, rank_position)
  values (new.id, next_rank);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 5. Report a match result. This is the ONLY way rank_position changes.
-- Ladder rule: if the winner was ranked below the loser, they swap spots
-- (classic ladder "climb by winning" behavior). If the winner was already
-- ranked above the loser, ranks don't change — just wins/losses update.
create or replace function public.report_match(
  p_winner_id uuid,
  p_loser_id uuid,
  p_score text default null
)
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  v_winner_rank int;
  v_loser_rank int;
  v_caller uuid := auth.uid();
begin
  if v_caller is null then
    raise exception 'Must be logged in to report a match';
  end if;

  if v_caller not in (p_winner_id, p_loser_id) then
    raise exception 'You can only report matches you played in';
  end if;

  if p_winner_id = p_loser_id then
    raise exception 'Winner and loser must be different players';
  end if;

  select rank_position into v_winner_rank from public.ladder_players where user_id = p_winner_id;
  select rank_position into v_loser_rank from public.ladder_players where user_id = p_loser_id;

  if v_winner_rank is null or v_loser_rank is null then
    raise exception 'Both players must be on the ladder';
  end if;

  insert into public.matches (winner_id, loser_id, score, winner_rank_before, loser_rank_before)
  values (p_winner_id, p_loser_id, p_score, v_winner_rank, v_loser_rank);

  update public.ladder_players set wins = wins + 1, updated_at = now() where user_id = p_winner_id;
  update public.ladder_players set losses = losses + 1, updated_at = now() where user_id = p_loser_id;

  -- Winner climbs: swap rank positions if the winner ranked below the loser
  if v_winner_rank > v_loser_rank then
    update public.ladder_players set rank_position = v_loser_rank where user_id = p_winner_id;
    update public.ladder_players set rank_position = v_winner_rank where user_id = p_loser_id;
  end if;
end;
$$;

grant execute on function public.report_match(uuid, uuid, text) to authenticated;
