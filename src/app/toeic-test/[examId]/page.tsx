import { redirect } from "next/navigation";

type LegacyExamPageProps = {
  params: Promise<{ examId: string }>;
  searchParams: Promise<{ mode?: string | string[] }>;
};

export default async function LegacyExamPage({
  params,
  searchParams,
}: LegacyExamPageProps) {
  const [{ examId }, query] = await Promise.all([params, searchParams]);
  const mode = Array.isArray(query.mode) ? query.mode[0] : query.mode;
  const destination = `/courses/${encodeURIComponent(examId)}`;

  redirect(mode ? `${destination}?mode=${encodeURIComponent(mode)}` : destination);
}
