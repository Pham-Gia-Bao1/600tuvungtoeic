alter table public.vocabulary_progress
  add column if not exists favorite boolean not null default false,
  add column if not exists repetition_count integer not null default 0,
  add column if not exists interval_days integer not null default 0,
  add column if not exists ease_factor numeric not null default 2.5,
  add column if not exists correct_answers integer not null default 0,
  add column if not exists incorrect_answers integer not null default 0,
  add column if not exists next_review_at timestamptz,
  add column if not exists last_reviewed_at timestamptz;

create table if not exists public.vocabulary_review_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  word_id text not null,
  was_correct boolean not null,
  reviewed_at timestamptz not null default now()
);

create index if not exists vocabulary_review_history_user_reviewed_idx
  on public.vocabulary_review_history (user_id, reviewed_at desc);

alter table public.vocabulary_review_history enable row level security;

grant select on table public.vocabulary_review_history to authenticated;

drop policy if exists "Users can read their own vocabulary review history"
  on public.vocabulary_review_history;
create policy "Users can read their own vocabulary review history"
  on public.vocabulary_review_history
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create or replace function public.record_vocabulary_review(p_word_id text, p_was_correct boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  insert into public.vocabulary_progress (
    user_id,
    word_id,
    learned,
    repetition_count,
    interval_days,
    ease_factor,
    correct_answers,
    incorrect_answers,
    next_review_at,
    last_reviewed_at,
    updated_at
  )
  values (
    v_user_id,
    p_word_id,
    p_was_correct,
    case when p_was_correct then 1 else 0 end,
    1,
    2.5,
    case when p_was_correct then 1 else 0 end,
    case when p_was_correct then 0 else 1 end,
    now() + interval '1 day',
    now(),
    now()
  )
  on conflict (user_id, word_id) do update
  set
    learned = p_was_correct,
    repetition_count = case
      when p_was_correct then public.vocabulary_progress.repetition_count + 1
      else 0
    end,
    interval_days = case
      when not p_was_correct then 1
      when public.vocabulary_progress.repetition_count = 0 then 1
      when public.vocabulary_progress.repetition_count = 1 then 6
      else greatest(1, round(
        public.vocabulary_progress.interval_days * public.vocabulary_progress.ease_factor
      )::integer)
    end,
    ease_factor = greatest(
      1.3,
      public.vocabulary_progress.ease_factor + case when p_was_correct then 0.1 else -0.2 end
    ),
    correct_answers = public.vocabulary_progress.correct_answers
      + case when p_was_correct then 1 else 0 end,
    incorrect_answers = public.vocabulary_progress.incorrect_answers
      + case when p_was_correct then 0 else 1 end,
    next_review_at = now() + make_interval(days => case
      when not p_was_correct then 1
      when public.vocabulary_progress.repetition_count = 0 then 1
      when public.vocabulary_progress.repetition_count = 1 then 6
      else greatest(1, round(
        public.vocabulary_progress.interval_days * public.vocabulary_progress.ease_factor
      )::integer)
    end),
    last_reviewed_at = now(),
    updated_at = now();

  insert into public.vocabulary_review_history (user_id, word_id, was_correct)
  values (v_user_id, p_word_id, p_was_correct);
end;
$$;

revoke all on function public.record_vocabulary_review(text, boolean) from public, anon;
grant execute on function public.record_vocabulary_review(text, boolean) to authenticated;
