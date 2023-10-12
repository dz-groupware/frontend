import styled from 'styled-components';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { companyActions } from '../../utils/Slice';
import { getClosedCompanyMgmtList, getCompanyDetailsById, getCompanyMgmtList, getOpenedCompanyMgmtList } from '../../api/companymgmt';




export default function CompanyMgmtAside({ pageId }) {
  const dispatch = useDispatch();
  const [companyDataList, setCompanyDataList] = useState([]);
  const [sortType, setSortType] = useState("default");
  const searchedCompanyDataList = useSelector(state => state.companyMgmt.searchList);
  const isSearchExecuted = useSelector(state => state.companyMgmt.isSearchExecuted);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const isVisible = useSelector(state => state.companyMgmt.isVisible);
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const [openCompanyDataList, setOpenCompanyDataList] = useState([]);
  const [closeCompanyDataList, setCloseCompanyDataList] = useState([]);

  useEffect(() => {
    async function fetchCompanies() {
      const data = await getCompanyMgmtList(pageId);
      setCompanyDataList(data);
    }

    fetchCompanies();
  }, [searchedCompanyDataList]);


  useEffect(() => {
    async function fetchCompaniesByFilter() {
      if (selectedFilter === "개업") {
        // 해당 API로 데이터 가져오기
        const data = await getOpenedCompanyMgmtList(pageId);
        setOpenCompanyDataList(data);
      } else if (selectedFilter === "폐업") {
        // 해당 API로 데이터 가져오기
        const data = await getClosedCompanyMgmtList(pageId);
        setCloseCompanyDataList(data);
      } else {
        const data = await getCompanyMgmtList(pageId);
        setCompanyDataList(data);
      }
    }
    fetchCompaniesByFilter();
  }, [selectedFilter, searchedCompanyDataList]);


  useEffect(() => {
    if (isVisible === false) {
      setSelectedCompanyId(null);
    }
  }, [isVisible]);


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
        <Wrapper key={index} onClick={() => handleCompanyClick(data)} $isselected={(data.id === selectedCompanyId).toString()}>
          {/* <Wrapper key={index} onClick={() => handleCompanyClick(data)} $isSelected={data.id === selectedCompanyId}> */}
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
    setSelectedCompanyId(companyMgmt.id);

    //   if (selectedCompanyId === companyMgmt.id) {
    //      setSelectedCompanyId(companyMgmt.id);
    //     dispatch(companyActions.hideForm());
    //     setSelectedCompanyId(null); // 선택된 직원 ID를 초기화
    //     return; // 이후 로직을 실행하지 않음
    // }

    // if (selectedCompanyId === null || selectedCompanyId !== companyMgmt.id) {
    //   setSelectedCompanyId(companyMgmt.id);
    // } else {
    //   // 선택된 회사의 ID가 이미 selectedCompanyId와 같다면 초기화합니다.
    //   setSelectedCompanyId(null);
    // }

    try {
      // 회사 정보를 가져옵니다.

      console.log("회사 아이디 알려줘",companyMgmt.id);
      const fetchedCompanyData = await getCompanyDetailsById(companyMgmt.id, pageId);
      console.log(fetchedCompanyData);
      // 가져온 회사 정보와 코드를 함께 showForm 액션에 전달합니다.

      dispatch(companyActions.showForm({ companyInfo: fetchedCompanyData, id: fetchedCompanyData.id }));
      console.log("fetchdata.id", fetchedCompanyData.id);
      console.log("fetchdata:", fetchedCompanyData);

    } catch (error) {
      console.error("Error fetching company data by code:", error);
    }
  }

  return (
    <Container>
      <FilterSection>
        <FilterButton
          onClick={() => setSelectedFilter("전체")}
          $isActive={selectedFilter === "전체"}
        >
          전체
        </FilterButton>
        <Divider>|</Divider>
        <FilterButton
          onClick={() => setSelectedFilter("개업")}
          $isActive={selectedFilter === "개업"}
        >
          개업
        </FilterButton>
        <Divider>|</Divider>
        <FilterButton
          onClick={() => setSelectedFilter("폐업")}
          $isActive={selectedFilter === "폐업"}
        >
          폐업
        </FilterButton>
      </FilterSection>

      <NumberOfCompaniesArea>
        <NumberArea>
          <Element>
            <span style={{ margin: "5px", fontWeight: 600 }}>회사</span>
            <span style={{ color: "#308EFC", fontWeight: 600 }}>   {
              isSearchExecuted
                ? Object.keys(searchedCompanyDataList).length
                : selectedFilter === "개업"
                  ? openCompanyDataList.length
                  : selectedFilter === "폐업"
                    ? closeCompanyDataList.length
                    : companyDataList.length
            }</span>
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
        {isSearchExecuted
          ? renderCompanyDataList(searchedCompanyDataList)
          : selectedFilter === "개업"
            ? renderCompanyDataList(openCompanyDataList)
            : selectedFilter === "폐업"
              ? renderCompanyDataList(closeCompanyDataList)
              : renderCompanyDataList(companyDataList)
        }      </CompanyListArea>

      <CompanyAddArea>

        <FullWidthButton onClick={() => {
          dispatch(companyActions.resetState())
          dispatch(companyActions.hideForm())

          setTimeout(() => {
            dispatch(companyActions.showForm())
          }, 50);

        }}>

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
height: 550px;

box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
            outline: none;
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
padding :10px;
background-color: ${props => props.$isselected === "true" ? '#e6f4ff' : 'white'};
border-color: ${props => props.$isselected === "true"? '#7BAAF1' : '#CCCCCC'};
transition: transform 0.2s ease, box-shadow 0.2s ease;  // 부드러운 변환 효과


&:hover {
  transform: scale(0.98);  // 원래 크기의 98%로 약간 줄임
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);  // 더 부드러운 그림자로 변경

  background-color: #d0cece84;  
  border-color: #d0cece84;             
}
&:active {
  border-color: #5dc3fb;  
  background-color: #5dc3fb;  
}



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
  height: 40px;
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
height: 410px;
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
const FilterSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F5F5F5;

`;

const FilterButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  margin: 5px;
  font-weight: bold;  
  font-size: 16px; 
  color: ${props => props.$isActive ? '#308EFC' : 'grey'};  // 활성화된 탭은 색을 변경
  border-bottom: ${props => props.$isActive ? '2px solid #308EFC' : 'none'}; // 활성화된 탭에는 밑줄 표시

  &:hover {
    background-color: #EFEFEF;
  }
`;

const Divider = styled.span`
  margin: 0 5px;
`;