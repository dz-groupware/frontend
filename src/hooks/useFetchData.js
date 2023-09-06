import { useMemo } from 'react';
import { useState, useEffect } from 'react';

/** 
  @prop {func} apiFunction - 사용할 api
  @prop {object} params - queryParameter
  @prop {object} paths - pathVaraible
  @rpop {boolean} shouldFetch - API 호출을 할지 말지 결정. 
*/
export const useFetchData = (apiFunction, { params = {}, paths = {} , shouldFetch = true} = {}) => {
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

      if (!shouldFetch) { // false 일때는 API 요청을 보내지 않음.
        setIsLoading(false);
        return ;
      }
      
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
  }, [apiFunction, stableParams, stablePaths, shouldFetch]);

  return { data, setData, isLoading, error };
}