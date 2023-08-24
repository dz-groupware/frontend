import styled from 'styled-components';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { showForm } from '../../App';
import { useEffect, useState } from 'react';
import axios from 'axios';




export default function CompanyMgmtAside({ onShowForm }) {
  const dispatch = useDispatch();
  const [companyDataList, setCompanyDataList] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/companyData'); // 적절한 API endpoint로 수정해야 합니다.
        setCompanyDataList(response.data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    }

    fetchData();
  }, []); 

  if (!companyDataList) {
    return <div>Loading...</div>;
  }

 
  function renderCompanyDataList(dataList) {
    const elements = [];
    Object.keys(dataList).forEach(key => {
      const data = dataList[key];
      const CorpTypeStyled = data.corpType === "1" ? CorpType1 : CorpType2;
      const CorpTypeName = data.corpType === "1" ? "개인" : "법인";
      const element = (
        <Wrapper2 key={key} onClick={() => handleCompanyClick(data)}>
          <CompanyInfo>
            <div>{data.code}</div>
            <div style={{ marginTop: '5px' }}>{data.name}</div>
          </CompanyInfo>
          <PersonInfo>
            <div>{data.repName}</div>
            <CorpTypeStyled>{CorpTypeName}</CorpTypeStyled>
          </PersonInfo>
        </Wrapper2>
      );
      elements.push(element);
    });

    return elements;
  }

  function handleCompanyClick(company) {
    dispatch(showForm());
  }

  return (
    <Container>
      <TopFixedWrapper>
        <Wrapper1>
          <Element>
            <span style={{ margin: "5px" , fontWeight: 600}}>회사</span>
            <span style={{ color: "#308EFC" , fontWeight: 600}}>{Object.keys(companyDataList).length}</span>
            <span  style={{ margin: "5px" , fontWeight: 600}}>건</span>
          </Element>
          <SelectBox>
            <option>정렬순</option>
            <option>코드순</option>
            <option>회사명순</option>
          </SelectBox>
        </Wrapper1>
      </TopFixedWrapper>


      <MiddleFixedWrapper>
        {renderCompanyDataList(companyDataList)}
      </MiddleFixedWrapper>

      <BottomFixedWrapper>

        <FullWidthButton onClick={() => dispatch(showForm())}>

          <AiOutlinePlusCircle />추가

        </FullWidthButton>

      </BottomFixedWrapper>


    </Container>

  );
}




const Container = styled.div`
position: relative;   // 추가
width: 250px;
max-width: 250px;  
min-width: 250px;  
margin-left: 20px;
margin-top: 10px;
border : 1.5px solid #CCCCCC;
`;


const Wrapper1 = styled.div`
  display: flex;
  width: 100%;
  margin:10px;
  
  
`;
const SelectBox = styled.select`
&:focus {
  outline: none;
  border-color: none;
  box-shadow: none;
  background:none;
  
}
width: 65px;
border : none;
background:none;
cursor: pointer;
`

const Element = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  
  
`;

const Wrapper2 = styled.div`
  display: flex;
  justify-content: space-between;  // 양 끝에 내용을 배치
  cursor: pointer;
  border: 1.5px solid #CCCCCC;
  margin-bottom: 10px;
  background-color: white;
  padding :10px;
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;  // 세로로 내용 배치
  align-items: flex-start;  // 왼쪽 정렬
`;

const PersonInfo = styled.div`
  display: flex;
  flex-direction: column;  // 세로로 내용 배치
  align-items: flex-end;  // 오른쪽 정렬
`;




const TopFixedWrapper = styled.div`
  position: sticky;
  height: 50px;
  display:flex;
  justify-content: space-between;
  align-items: center;
  border-bottom:1px solid #CCCCCC;
  background-color: #F5F5F5;
  top: 0;
`;

const MiddleFixedWrapper = styled.div`
position: relative; 
border: 1px solid #CCCCCC;
padding: 10px;
height: calc(400px - 50px); 
overflow-y: auto;
background-color: #F5F5F5;
border: none; // 이 부분을 추가

&::-webkit-scrollbar {
  display: none; // Chrome, Safari, newer versions of Opera
}
`;

const CorpType1 = styled.div`
display: flex;
  align-items:center;
  background-color: #947AFF;
  color: white;
  border-radius: 20px;
  margin-top : 5px;
  height: 20px;
  padding: 3px;
  padding-left: 10px;
  padding-right: 10px;
`;

const CorpType2 = styled.div`
  display: flex;
  align-items:center;
  background-color: #4DE9D6;
  color: white;
  border-radius: 20px;
  margin-top : 5px;
  height: 20px;
  padding: 3px;
  padding-left: 10px;
  padding-right: 10px;
`;

const BottomFixedWrapper = styled.div`
display:flex;
justify-content:center;
position: absoulte;
bottom: 0;
width: 100%;   // Container의 width와 동일하게 설정
border-top: 1.5px solid #CCCCCC;

`;



const FullWidthButton = styled.button`
  width: 100%;
  height: 50px;
  background: white;
  color: grey;
  cursor: pointer;
  padding: 0;
  border: none;
  &:active {
    background: lightgrey;
    color: white;
  }
`;


