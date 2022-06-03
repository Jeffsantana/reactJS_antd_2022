import { useState, useEffect } from 'react';
import { AxiosRequestConfig } from 'axios';

import api from '../services/api';

function useFetch<T = any>(url: string, options?: AxiosRequestConfig) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState<T | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api(url, options);
        setResponse(res.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [url, options]);

  return { response, loading, error, mutate: {} };
}

export default useFetch;
