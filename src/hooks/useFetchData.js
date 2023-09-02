import { useMemo } from 'react';
import { useState, useEffect } from 'react';

/** 
  @prop {func} apiFunction - 사용할 api
  @prop {object} params - queryParameter
  @prop {object} paths = pathVaraible
*/
export const useFetchData = (apiFunction, { params = {}, paths = {} } = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const stableApiFunction = useCallback(apiFunction, []);
  const paramsString = JSON.stringify(params);
  const pathsString = JSON.stringify(paths);

  const stableParams = useMemo(() => params, [paramsString]);
  const stablePaths = useMemo(() => paths, [pathsString]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedData = await apiFunction({ params: stableParams, paths: stablePaths });
        setData(fetchedData);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [apiFunction, stableParams, stablePaths]);

  return { data, setData, isLoading, error };
}