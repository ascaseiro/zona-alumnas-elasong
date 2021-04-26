import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setCargando(true);
      const httpAbort = new AbortController();
      activeHttpRequests.current.push(httpAbort);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbort.signal,
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (req) => req !== httpAbort
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setCargando(false);
        return responseData;
      } catch (err) {
        setError(error.message);
        setCargando(false);
        throw error;
      }
    },
    [error]
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abort) => abort.abort());
    };
  }, []);

  return { cargando, error, sendRequest, clearError };
};
