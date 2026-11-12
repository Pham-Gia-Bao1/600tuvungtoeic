create table if not exists public.vocabulary_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  word_id text not null,
  learned boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, word_id)
);

alter table public.vocabulary_progress enable row level security;

grant select, insert, update, delete
  on table public.vocabulary_progress
  to authenticated;

drop policy if exists "Users can read their own vocabulary progress"
  on public.vocabulary_progress;
create policy "Users can read their own vocabulary progress"
  on public.vocabulary_progress
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can add their own vocabulary progress"
  on public.vocabulary_progress;
create policy "Users can add their own vocabulary progress"
  on public.vocabulary_progress
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own vocabulary progress"
  on public.vocabulary_progress;
create policy "Users can update their own vocabulary progress"
  on public.vocabulary_progress
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own vocabulary progress"
  on public.vocabulary_progress;
create policy "Users can delete their own vocabulary progress"
  on public.vocabulary_progress
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);
