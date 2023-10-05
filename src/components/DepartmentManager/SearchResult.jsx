import styled from 'styled-components';

import DeptItem from './DeptItem';

// 재귀가 아니라 리스트로 할 수 있는지 찾아보기
export default function SearchResult ({ result, setItem, detail, setDetail }){
  // console.log("SearchResult : ", result)
  return (
    <ResultContent>
      {
        result.map((a, i) => (
          <DeptItem key={'item::'+ a['name']} dept={a} setItem={setItem} detail={detail} setDetail={setDetail}/>
        ))
      } 
    </ResultContent>
  );
};

const ResultContent = styled.form`
overflow: scroll;
height: calc(100% - 150px);
&::-webkit-scrollbar {
  display: none;
}
`;