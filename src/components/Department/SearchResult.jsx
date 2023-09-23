import styled from 'styled-components';

import DeptItem from './DeptItem';

// 재귀가 아니라 리스트로 할 수 있는지 찾아보기
export default function SearchResult ({ result, setDetail }){
  return (
    <ResultContent>
      {
        result.map((a, i) => (
          <DeptItem key={a['name']+a['id']} setDetail={setDetail} />
        ))
      } 
    </ResultContent>
  );
};

const ResultContent = styled.form`
overflow: scroll;
height: calc(100% - 30px);
&::-webkit-scrollbar {
  display: none;
}
`;