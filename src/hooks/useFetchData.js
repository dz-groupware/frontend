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
  const [shouldFetchState, setShouldFetch] = useState(shouldFetch); 
  const [statusCode, setStatusCode] = useState(null);

  const [currentParams, setParams] = useState(params); 
  const [currentPaths, setPaths] = useState(paths); 
  const [currentData, setData] = useState(data); 

  useEffect(() => {
    if (JSON.stringify(params) !== JSON.stringify(currentParams)) {
      setParams(params);
    }
    if (JSON.stringify(paths) !== JSON.stringify(currentPaths)) {
      setPaths(paths);
    }
    if (JSON.stringify(data) !== JSON.stringify(currentData)) {
      setData(data);
    }
  }, [params, paths, data]);

  useEffect(() => {
    if (shouldFetch !== shouldFetchState) {
      setShouldFetch(shouldFetch);
    }
  }, [shouldFetch]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      if (!shouldFetchState) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await apiFunction({ params: currentParams, paths: currentPaths, data: currentData });
        setFetchedData(response.data);
        setStatusCode(response.status);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
        setShouldFetch(false);
      }
    };
    
    fetchData();
  }, [apiFunction, currentParams, currentPaths, currentData, shouldFetchState]); 

  return { data: fetchedData, setData: setFetchedData, isLoading, error, setShouldFetch, statusCode};  
};
