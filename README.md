# TOEIC Mastery

TOEIC Mastery is a Next.js App Router application with Supabase Auth and
database-backed learning content.

## Local setup

Requirements: Node.js `>=20.19.5` and npm `>=10.8.2`.

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SUPABASE_URL` and
   `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
3. Start the development server with `npm run dev`.

The Supabase browser and server clients use `@supabase/ssr`. The server client
reads and updates auth cookies, and `src/middleware.ts` refreshes sessions.
Google sign-in is the only supported sign-in method; no app-managed password
or custom JWT is used.

Enable the Google provider in **Supabase Dashboard → Authentication → Sign In
/ Providers → Google**, adding the OAuth client ID and secret from Google
Cloud. Set the Supabase callback URL shown on that provider page in Google
Cloud's authorized redirect URIs, and allow your app URL under **Authentication
→ URL Configuration → Redirect URLs**. Google login is at `/login`.

## Routes

- `/` — home
- `/login` — Google sign-in
- `/courses` — TOEIC exam catalog
- `/vocab`, `/vocab/lesson/[id]`, `/vocab/review`, `/vocab/favorites` —
  vocabulary study and review
- `/courses/[examId]` — exam practice
- `/toeic-test` and `/toeic-test/[examId]` — legacy URLs redirected to `/courses`
- `/chat` — chat demo

## Supabase database

Courses, TOEIC exam slots and questions, vocabulary lessons and words are read
from Supabase; the frontend does not fall back to bundled catalog data. Apply
these migrations in order in the Supabase SQL Editor or with the Supabase CLI:

1. [`20261109211500_vocabulary_progress.sql`](./supabase/migrations/20261109211500_vocabulary_progress.sql)
2. [`20261109220000_vocabulary_review.sql`](./supabase/migrations/20261109220000_vocabulary_review.sql)
3. [`20261109222000_learning_content.sql`](./supabase/migrations/20261109222000_learning_content.sql)
4. [`20261109223000_toeic_exam_attempts.sql`](./supabase/migrations/20261109223000_toeic_exam_attempts.sql)
5. [`20261109224000_original_toeic_curriculum.sql`](./supabase/migrations/20261109224000_original_toeic_curriculum.sql)

To apply with the CLI, link the project and run `supabase db push`; the CLI
requests the database password locally. Never put a database password or
service-role key in the browser environment.

If you apply these files manually in the Dashboard SQL Editor, the SQL changes
are applied but the CLI migration history is not updated. Before using
`supabase db push` later, link the project and mark these already-applied
migrations in the CLI history:

```powershell
supabase link --project-ref ebkwilstsinuzmjgqawv
supabase migration repair --status applied 20261109211500 20261109220000 20261109222000 20261109223000 20261109224000
```

The CLI will request the database password locally.

The learning-content migration seeds 3 courses, 20 lessons, 600 words, 20 exam
catalog slots, and one original 20-question Reading diagnostic. The original
curriculum migration replaces the legacy vocabulary with 600 curated words
and five authored cloze exercises per lesson. It preserves any progress and
review history against the retired word IDs in a private legacy table; the new
curriculum starts with fresh progress because the old IDs refer to different
words. Learning catalogs are publicly readable; RLS restricts progress, review
history, and exam attempts to the signed-in user.

The vocabulary, examples, and exercises are original. Broad workplace themes
were informed by the [ETS TOEIC preparation overview](https://www.ets.org/toeic/test-takers/prepare.html);
no official test questions or lesson text are reproduced.
