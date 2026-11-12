create table if not exists public.toeic_exam_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  exam_id text not null,
  mode text not null check (mode in ('practice', 'test')),
  answers jsonb not null default '{}'::jsonb,
  marked_question_ids jsonb not null default '[]'::jsonb,
  correct_count integer not null,
  total_questions integer not null check (total_questions > 0),
  duration_seconds integer not null check (duration_seconds >= 0),
  submitted_at timestamptz not null default now(),
  constraint toeic_exam_attempts_correct_count_check
    check (correct_count >= 0 and correct_count <= total_questions)
);

create index if not exists toeic_exam_attempts_user_submitted_idx
  on public.toeic_exam_attempts (user_id, submitted_at desc);

alter table public.toeic_exam_attempts enable row level security;

grant select, insert on table public.toeic_exam_attempts to authenticated;

drop policy if exists "Users can read their own TOEIC attempts"
  on public.toeic_exam_attempts;
create policy "Users can read their own TOEIC attempts"
  on public.toeic_exam_attempts
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can create their own TOEIC attempts"
  on public.toeic_exam_attempts;
create policy "Users can create their own TOEIC attempts"
  on public.toeic_exam_attempts
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);
