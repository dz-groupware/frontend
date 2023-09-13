import styled from 'styled-components';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../utils/axiosInstance';
import { companyActions } from '../../utils/Slice';
import { getCompanyDetailsById, getCompanyMgmtList } from '../../api/companymgmt';




export default function CompanyMgmtAside({ onShowForm }) {
  const dispatch = useDispatch();
  const [companyDataList, setCompanyDataList] = useState([]);
  const [sortType, setSortType] = useState("default");
  const searchedCompanyDataList = useSelector(state => state.companyMgmt.searchList);
  const isSearchExecuted = useSelector(state => state.companyMgmt.isSearchExecuted);




  useEffect(() => {
    async function fetchCompanies() {
      const data = await getCompanyMgmtList();
      setCompanyDataList(data);
    }

    fetchCompanies();
  }, [searchedCompanyDataList]);


  if (!companyDataList) {
    return <div>Loading...</div>;
  };

  function renderCompanyDataList(dataList) { //dataList는 배열

    let sortedDataList = Object.keys(dataList).map(key => dataList[key]);


    // sortType에 따라서 정렬
    if (sortType === "sortcode") {
      sortedDataList = sortedDataList.sort((a, b) => a.code.localeCompare(b.code));
    } else if (sortType === "sortname") {
      sortedDataList = sortedDataList.sort((a, b) => a.name.localeCompare(b.name));
    }


    const elements = sortedDataList.map((data, index) => {
      const truncatedName = truncateString(data.name, 10);
      const truncatedRepName = truncateString(data.repName, 6);


      const CorpTypeStyled = data.corpType === 1 ? CorpType1 : CorpType2;
      const CorpTypeName = data.corpType === 1 ? "개인" : "법인";
      return (
        <Wrapper key={index} onClick={() => handleCompanyClick(data)}>
          <CompanyInfo>
            <div>{data.code}</div>
            <div>{truncatedName}</div>
          </CompanyInfo>
          <PersonInfo>
            <div>{truncatedRepName}</div>
            <CorpTypeStyled>{CorpTypeName}</CorpTypeStyled>
          </PersonInfo>
        </Wrapper>
      );
    });

    return elements;
  }


  function truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength - 3) + '...';  // -3은 '...'의 길이를 고려
    }
    return str;
  }


  async function handleCompanyClick(companyMgmt) {
    try {
      // 회사 정보를 가져옵니다.
      console.log(companyMgmt.id);
      const fetchedCompanyData = await getCompanyDetailsById(companyMgmt.id);

      console.log(fetchedCompanyData);
      // 가져온 회사 정보와 코드를 함께 showForm 액션에 전달합니다.
      dispatch(companyActions.showForm({ companyInfo: fetchedCompanyData, id: fetchedCompanyData.id }));

      console.log("fetchdata:", fetchedCompanyData);
    } catch (error) {
      console.error("Error fetching company data by code:", error);
    }
  }

  return (
    <Container>
      <NumberOfCompaniesArea>
        <NumberArea>
          <Element>
            <span style={{ margin: "5px", fontWeight: 600 }}>회사</span>
            <span style={{ color: "#308EFC", fontWeight: 600 }}>  {isSearchExecuted ? Object.keys(searchedCompanyDataList).length : Object.keys(companyDataList).length}</span>
            <span style={{ margin: "5px", fontWeight: 600 }}>건</span>
          </Element>
          <SelectBox onChange={e => setSortType(e.target.value)}>
            <option value="default">정렬순</option>
            <option value="sortcode">코드순</option>
            <option value="sortname">회사명순</option>
          </SelectBox>
        </NumberArea>
      </NumberOfCompaniesArea>


      <CompanyListArea>
        {isSearchExecuted ? renderCompanyDataList(searchedCompanyDataList) : renderCompanyDataList(companyDataList)}
      </CompanyListArea>

      <CompanyAddArea>

        <FullWidthButton onClick={() => dispatch(companyActions.showForm())}>

          <AiOutlinePlusCircle />추가

        </FullWidthButton>

      </CompanyAddArea>


    </Container>

  );
}




const Container = styled.div`
position: relative;   
max-width: 250px;  
margin-left: 20px;
margin-top: 10px;
border : 1.5px solid #CCCCCC;
`;


const NumberArea = styled.div`
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
width: 80px;
border : none;
background:none;
cursor: pointer;
`

const Element = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  
  
`;

const Wrapper = styled.div`
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
  flex-direction: column;
  align-items: flex-start;

  & > div + div {
    margin-top: 10px;
  }
`;

const PersonInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  & > div + div {
    margin-top: 10px;
  }
`;




const NumberOfCompaniesArea = styled.div`
  position: sticky;
  height: 50px;
  display:flex;
  justify-content: space-between;
  align-items: center;
  border-bottom:1.5px solid #CCCCCC;
  background-color: #F5F5F5;
  top: 0;
`;

const CompanyListArea = styled.div`
position: relative; 
border: 1px solid #CCCCCC;
padding: 10px;
height: calc(360px - 50px); 
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

const CompanyAddArea = styled.div`
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
