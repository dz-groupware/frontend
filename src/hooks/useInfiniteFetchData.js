import { useState, useEffect } from 'react';

export const useInfiniteFetchData = (apiFunction, { params = {}, paths = {}, data = {}, shouldFetch = true } = {}) => {
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [initialState, setInitialState] = useState(shouldFetch); 
  const [statusCode, setStatusCode] = useState(null);
  const [lastId, setLastId] = useState(null);  // lastId 상태 추가
  const [isFetching, setIsFetching] = useState(false);  // 현재 데이터를 불러오고 있는지 확인하는 상태

  useEffect(() => {
    if (initialState) {  //여기조건을 바꿔야할까?
      fetchMoreData();
    }
  }, [initialState]);  

  const fetchMoreData = async () => {
    if (isFetching) return;  // 이미 데이터를 불러오고 있다면 함수를 종료
    console.log('요청되는중');
    console.log('')
    setIsFetching(true);
    setIsLoading(true);

    if (!shouldFetch || !hasMore) {
      setIsLoading(false);
      setIsFetching(false);
      return;
    }

    try {
      const response = await apiFunction({ params: { ...params, lastId: lastId !== null ? lastId : 0 }, paths, data });
      // 중복 데이터 제거
      const newFetchedData = response.data.filter(newData => !fetchedData.some(existingData => existingData.id === newData.id));
      setFetchedData(prev => [...prev, ...newFetchedData]);

      if (response.data.length > 0) {
        setLastId(response.data[response.data.length - 1].id); 
      }

      setHasMore(response.data.length >= params.pageSize); // pageSize와 동일하게 설정; 
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
      setIsFetching(false);  // 데이터 불러오기가 완료되면 isFetching을 false로 설정
    }
  };

  return { data: fetchedData, setData: setFetchedData, isLoading, error, hasMore, statusCode, fetchMoreData };
};
