import { useEffect, useState } from "react";

export function useFetch<T = any>(fn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    fn()
      .then(res => { if (mounted) setData(res); })
      .catch(err => { if (mounted) setError(err); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [fn]);

  return { data, loading, error };
}
