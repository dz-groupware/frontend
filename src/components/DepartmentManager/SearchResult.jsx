import styled from 'styled-components';

import DeptItem from './DeptItem';

// 재귀가 아니라 리스트로 할 수 있는지 찾아보기
export default function SearchResult ({ result, setItem, detail, setDetail }){
  // console.log("SearchResult : ", result)
  return (
    <ResultContent>
      {
        result.map((a, i) => (
          <DeptItem key={'item::'+ a['name']} dept={a} setItem={setItem} detail={detail} setDetail={setDetail} className={`${detail.id === a['id']}`}/>
        ))
      } 
    </ResultContent>
  );
};

const ResultContent = styled.form`
padding-top: 2px;
overflow: scroll;
height: calc(100% - 150px);
/* &::-webkit-scrollbar {
  display: none;
} */
background-color: #d9dde1;
&::-webkit-scrollbar {
    width: 5px; 
    height: 5px;
    background-color: transparent; 
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(214,236,248);
    border-radius: 5px; 
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: rgb(18, 172, 226);
  }
`;