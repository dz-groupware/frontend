import React, { useEffect, useRef } from 'react';
import AuthGroupItem from './AuthGroupItem';
import { useInfiniteFetchData } from '../../hooks/useInfiniteFetchData';
import { getAuthGroupApi } from '../../api/authgroup';
import { styled } from 'styled-components';

export default function AuthGroupList({ activeAuthId, setActiveAuthId }) {
  const {
    data,
    fetchMoreData,
    hasMore,
    isLoading,
    lastId,
    setLastId,
    setData
  } = useInfiniteFetchData(getAuthGroupApi, { params: { lastId:0, pageSize: 8, orderBy: 'none' } });
  
  const lastElementRef = useRef();  // 초기값을 함수 대신 null로 설정합니다

  useEffect(() => {
    if (lastElementRef.current && hasMore) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log('교차점 감지됨');
          fetchMoreData();
        }
      });
  
      observer.observe(lastElementRef.current);
  
      return () => {
        observer.disconnect();  // 컴포넌트가 언마운트되거나 업데이트될 때 observer 연결을 해제합니다
      };
    }
  }, [lastElementRef.current, hasMore, data]);  // data 객체 의존성을 추가했습니다.
  return (
    <Container>
      <div style={{ border: '1px solid #a9a9a9', height: '100%', overflowY: 'auto' }}>
        {data.map((item, i) => (
          <AuthGroupItem
            key={item.id}
            item={item}
            onClick={() => {
              setActiveAuthId(item.id);
            }}
            isActive={activeAuthId === item.id}
            ref={i === data.length - 1 ? lastElementRef : null}  // ref 속성에 lastElementRef를 직접 전달합니다
          >
          </AuthGroupItem>
        ))}
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