  import React, { useCallback, useEffect, useRef, useState } from 'react';
  import AuthGroupItem from './AuthGroupItem';
  import { styled } from 'styled-components';
  import { getAuthGroupApi } from '../../../api/authgroup';

  export default function AuthGroupList({ activeAuthId, orderBy, searchTerm, refresh, showCloseRequest, handleItemClick }) {
    const [lastId, setLastId] = useState(99999999);
    const [lastAuthName, setLastAuthName] = useState(null);
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); // 에러 상태 변수 추가

    const lastElementRef = useRef();

    const fetchMoreData = useCallback(async () => {
      if (isLoading || !hasMore) return;
      setIsLoading(true);
      
      let queryParam = { 
        pageSize: 8, 
        orderBy, 
        searchTerm,
        ...(lastAuthName !== null && orderBy.includes('authName') && { lastAuthName: encodeURIComponent(lastAuthName) }),
        ...(lastId !== null && !orderBy.includes('authName') && { lastId }),
      };
    
      
      try {
        const res = await getAuthGroupApi({ params: queryParam });
        const response = res.data;
        if (response.data && response.data.length > 0) {
          if(orderBy.includes('authName')) {
            setLastAuthName(response.data[response.data.length - 1].authName);
          } else {
            setLastId(response.data[response.data.length - 1].id);
          }
          
          setData(prevData => [...prevData, ...response.data]);

          if (response.data.length < 8) {  // 페이지 사이즈보다 데이터의 길이가 작으면 hasMore을 false로 설정합니다.
            setHasMore(false);
          }
          
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Data fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    }, [lastId, lastAuthName, orderBy, searchTerm, isLoading, hasMore]);

    useEffect(() => {
      setData([]);
      setHasMore(true);
      if (orderBy.includes('authName')) {
        setLastId(null); // authName 기준 정렬에서 lastId 는 null로 설정
        if (orderBy === 'authNameAsc') {
            setLastAuthName(''); // 빈 문자열로 설정하여 오름차순 정렬을 시작합니다.
        } else {
            setLastAuthName('ㅎㅎㅎㅎㅎ'); // 'ㅎ' 문자를 사용하여 내림차순 정렬을 시작합니다.
        }
    } else {
        setLastAuthName(null); // ID 기준 정렬에서 lastAuthName은 null로 설정
        if (orderBy.includes('Desc')) {
            setLastId(99999999); // ID 내림차순 정렬을 시작합니다.
        } else {
            setLastId(0); // ID 오름차순 정렬을 시작합니다.
        }
    }
    }, [orderBy, searchTerm,refresh]);

    useEffect(() => {
      if(data.length === 0 && hasMore) {
        fetchMoreData(); 
      }
    }, [fetchMoreData, data.length]);

    useEffect(() => {
      if (lastElementRef.current && hasMore) {
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            fetchMoreData();
          }
        });

        observer.observe(lastElementRef.current);

        return () => {
          observer.disconnect();
        };
      }
    }, [lastElementRef.current, hasMore, data]);

    if (error) return <div>에러가 발생했어요...</div>;
    if (!data) return null;

    return (
      <Container>
        <div style={{ border: '1px solid #a9a9a9', height: '100%', overflowY: 'auto' }}>
          {data.map((item, i) => (
            <AuthGroupItem
              key={item.id}
              item={item}
              onClick={() => handleItemClick(item.id)}
              isActive={activeAuthId === item.id}
              ref={i === data.length - 1 ? lastElementRef : null}
            />
            ))}
        </div>
        <div>
          {showCloseRequest ? <div>닫기 버튼을 눌러주세요.</div> : null}
          {isLoading? (<div>로딩중입니다!...</div>) : null}
        </div>
      </Container>
    );
  }

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 80%;
    overflow-y: auto; 
  `;
