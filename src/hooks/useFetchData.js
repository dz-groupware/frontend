import { useState, useEffect } from 'react';

/** 
  @prop {func} apiFunction - 사용할 api
  @prop {object} params - queryParameter
  @prop {object} paths - pathVaraible
  @prop {object} data - request body
  @prop {boolean} shouldFetch - API 호출을 할지 말지 결정. 
*/
export const useFetchData = (apiFunction, { params = {}, paths = {}, data = {}, headers = {},shouldFetch = true } = {}) => {
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shouldFetchState, setShouldFetch] = useState(shouldFetch); 
  const [status, setStatus] = useState(null);

  const [currentParams, setParams] = useState(params); 
  const [currentPaths, setPaths] = useState(paths); 
  const [currentData, setData] = useState(data); 
  const [currentHeaders, setHeaders] = useState(headers); 

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
    if (JSON.stringify(headers) !== JSON.stringify(currentHeaders)) {
      setHeaders(headers);
    }
  }, [params, paths, data, headers]);

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
        const response = await apiFunction({ params: currentParams, paths: currentPaths, data: currentData, headers: currentHeaders });
        setFetchedData(response.data.data);
        setStatus(response.status);
      } catch (e) {
        if(e.status === 401 || e.status === 403){
          window.location.href="/login";
        }
        setError(e);
      } finally {
        setIsLoading(false);
        setShouldFetch(false);
      }
    };
    
    fetchData();
  }, [apiFunction, currentParams, currentPaths, currentData, currentHeaders, shouldFetchState]); 

  return { data: fetchedData, setData: setFetchedData, isLoading, error, shouldFetch, setShouldFetch, status, setStatus};  
};
