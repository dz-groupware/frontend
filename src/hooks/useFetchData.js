  import { useMemo } from 'react';
  import { useState, useEffect } from 'react';

  /** 
    @prop {func} apiFunction - 사용할 api
    @prop {object} params - queryParameter
    @prop {object} paths - pathVaraible
    @prop {object} data - request body
    @prop {boolean} shouldFetch - API 호출을 할지 말지 결정. 
  */
  export const useFetchData = (apiFunction, { params = {}, paths = {}, data = {}, shouldFetch = true } = {}) => {
    const [fetchedData, setFetchedData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [shouldFetchState, setShouldFetch] = useState(shouldFetch);  // shouldFetch를 상태로 관리
    const [statusCode, setStatusCode] = useState(null);

    const paramsString = JSON.stringify(params);
    const pathsString = JSON.stringify(paths);
    const dataString = JSON.stringify(data);

    const stableParams = useMemo(() => params, [paramsString]);
    const stablePaths = useMemo(() => paths, [pathsString]);
    const stableData = useMemo(() => data, [dataString]);

    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);

        if (!shouldFetchState) { // shouldFetchState를 사용
          setIsLoading(false);
          return;
        }
        try {
          const response = await apiFunction({ params: stableParams, paths: stablePaths, data: stableData });
          setFetchedData(response.data);
          setStatusCode(response.status); // 상태 코드 저장
        } catch (e) {
          setError(e);
        } finally {
          setIsLoading(false);
          setShouldFetch(false);
        }
      };
      
      fetchData();
    }, [apiFunction, stableParams, stablePaths, stableData, shouldFetchState]); 

    return { data: fetchedData, setData: setFetchedData, isLoading, error, setShouldFetch, statusCode};  // setShouldFetch를 반환
  };