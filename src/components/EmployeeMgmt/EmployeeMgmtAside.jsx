import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { employeeActions } from "../../utils/Slice";
import { findCloseEmployeeMgmtList, findEmployeeMgmtList, findOpenEmployeeMgmtList, getClosedEmployeeMgmtList, getEmployeeDetailsById, getEmployeeMgmtList, getOpenedEmployeeMgmtList } from "../../api/employeemgmt";
import { GrNext, GrPrevious } from 'react-icons/gr';

export default function EmployeeMgmtAside({ pageId }) {
  const dispatch = useDispatch();
  const [employeeDataList, setEmployeeDataList] = useState([]);
  const [sortType, setSortType] = useState("default");
  const searchedEmployeeDataList = useSelector(state => state.employeeMgmt.searchList);
  const isSearchExecuted = useSelector(state => state.employeeMgmt.isSearchExecuted);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const isVisible = useSelector(state => state.employeeMgmt.isVisible);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState([1, 5]);
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const [openEmployeeDataList, setOpenEmployeeDataList] = useState([]);
  const [closeEmployeeDataList, setCloseEmployeeDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchCriteria = useSelector(state => state.employeeMgmt.isSearchValue);
  const searchOption = useSelector(state => state.employeeMgmt.isSelectedOption);
  

  useEffect(() => {
    setCurrentPage(1); // 페이지를 1로 초기화
}, [selectedFilter]);



  useEffect(() => {

    if (isVisible === false) {
      // console.log("이즈비지블 처리됏니");

      setSelectedEmployeeId(null);
    }
  }, [isVisible]);
 
  

  useEffect(() => {
    setEmployeeDataList([]);
    async function fetchEmployeesByFilter() {
      let data;
      if (selectedFilter === "재직자") {
        if (isSearchExecuted) {
          data = await findOpenEmployeeMgmtList(searchCriteria, searchOption, pageId);
          setOpenEmployeeDataList(prevData => data);
        } else {
          data = await getOpenedEmployeeMgmtList(pageId);
          setOpenEmployeeDataList(prevData => data);
        }
      } else if (selectedFilter === "퇴사자") {
        if (isSearchExecuted) {
          console.log("퇴사자니");
          data = await findCloseEmployeeMgmtList(searchCriteria, searchOption, pageId);
          setCloseEmployeeDataList(prevData => data);
        } else {
          data = await getClosedEmployeeMgmtList(pageId);
          setCloseEmployeeDataList(prevData => data);
        }
      } else {
        if (isSearchExecuted) {
          console.log("전체인경우");
          data = await findEmployeeMgmtList(searchCriteria, searchOption,pageId);
          setEmployeeDataList(prevData => data);
        } else {
          data = await getEmployeeMgmtList(pageId)
          console.log("무슨 값 받아왓니?",data);
    
          dispatch(employeeActions.setLoginCompanyId(data[0].companyId));
          setEmployeeDataList(prevData => data);
          console.log("로그인한 컴퍼니 아이디",data[0].companyId);
        }
      }
      setLoading(false); // 모든 데이터 상태 업데이트 후 로딩 상태 업데이트
    }
    fetchEmployeesByFilter().finally(() => setLoading(false));
  }, [selectedFilter, searchedEmployeeDataList, searchCriteria, searchOption, isSearchExecuted]);
  



  if (!employeeDataList) {
    return <div>Loading...</div>;
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  const itemsPerPage = 5;
  const dataForPagination =
  isSearchExecuted? 
  selectedFilter === "재직자" ? openEmployeeDataList
    :selectedFilter === "퇴사자" ?closeEmployeeDataList
      :employeeDataList
      :selectedFilter === "재직자" ? openEmployeeDataList
    :selectedFilter === "퇴사자" ?closeEmployeeDataList
      :employeeDataList;



  const renderPageNumbers = () => {

    const totalPages = Math.ceil(dataForPagination.length / itemsPerPage);
    const pageNumbers = [];
    

    for (let i = pageRange[0]; i <= Math.min(pageRange[1], totalPages); i++) {
      pageNumbers.push(
        <PageNumber
          key={i}
          $isselected={i === currentPage}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </PageNumber>
      );
    }

    return pageNumbers;
  };

  const handleNextPageRange = () => {
    setPageRange(prevRange => [prevRange[1] + 1, prevRange[1] + 5]);
  };

  const handlePrevPageRange = () => {
    setPageRange(prevRange => [prevRange[0] - 5, prevRange[0] - 1]);
  };





  function renderEmployeeDataList(dataList) { //dataList는 배열


    let sortedDataList = Object.keys(dataList).map(key => dataList[key]);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    sortedDataList = sortedDataList.slice(startIndex, endIndex);
    // sortType에 따라서 정렬
    if (sortType === "sortdate") {
      sortedDataList = sortedDataList.sort((a, b) => a.joinDate.localeCompare(b.joinDate));
    } else if (sortType === "sortname") {
      sortedDataList = sortedDataList.sort((a, b) => a.name.localeCompare(b.name));
    }

    const elements = sortedDataList.map((data, index) => {
      const truncatedLoginId = truncateString(data.loginId, 7);
      const truncatedName = truncateString(data.name, 6);
      // console.log("data.id", data.id);
      return (
        <Wrapper key={index} onClick={() => handleEmployeeClick(data)} $isselected={(data.id === selectedEmployeeId).toString()}>
          <ImageAndName>
            <Image src={data.imageUrl} alt="Employee Image" />
            <EmployeeInfo>
              <div>{truncatedLoginId}</div>
              <div>{truncatedName}</div>
            </EmployeeInfo>
          </ImageAndName>
          <JoinInfo>
            <div>{data.joinDate}</div>
          </JoinInfo>
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



  async function handleEmployeeClick(employeeMgmt) {
    // console.log("너네 뭐니", employeeMgmt);
    setSelectedEmployeeId(employeeMgmt.id);
    // console.log("selectedEmployeeId", selectedEmployeeId);


    try {
      const fetchedEmployeeData = await getEmployeeDetailsById(employeeMgmt.id, pageId);
      // console.log(fetchedEmployeeData);
      if (!fetchedEmployeeData) {
        console.error("No data returned for employee ID:", employeeMgmt.id);
        return;
      }



      const fetchedEmployeeArray = Object.values(fetchedEmployeeData);
      // 첫 번째 데이터로 basicInfo 생성
      const firstEmployee = fetchedEmployeeArray[0];
      // console.log("firstEmployee", firstEmployee);

      const employeeBasicInfo = {
        id: firstEmployee.id,
        imageUrl: firstEmployee.imageUrl,
        name: firstEmployee.name,
        empIdNum: firstEmployee.empIdNum,
        gender: firstEmployee.gender,
        accountYn: firstEmployee.accountYn,
        loginId: firstEmployee.loginId,
        loginPw: firstEmployee.loginPw,
        privEmail: firstEmployee.privEmail,
        mobileNumber: firstEmployee.mobileNumber,
        homeNumber: firstEmployee.homeNumber,
        address: firstEmployee.address,
        joinDate: firstEmployee.joinDate,
        resignationDate: firstEmployee.resignationDate
      };

      // 모든 데이터에서 groupInfo 수집
      const employeeGroupInfo = fetchedEmployeeArray.map(employee => ({
        departmentId: employee.departmentId,
        position: employee.position,
        compId: employee.compId,
        deptId: employee.deptId,
        transferredYn: employee.transferredYn,
        edjoinDate: employee.edjoinDate,
        leftDate: employee.leftDate,
        deletedYn: employee.deletedYn,
        empId: employee.empId,
      }));



      // Redux에 업데이트
      dispatch(employeeActions.updateBasicInfo(employeeBasicInfo)); // Redux action이 단일 객체를 받아야 함
      dispatch(employeeActions.updateGroupInfo(employeeGroupInfo)); // Redux action이 배열을 받아야 함

      // console.log("3333basic", reduxbasicInfo.id);//잘나옴
      console.log("3333group", employeeGroupInfo);//잘나옴


      dispatch(employeeActions.showForm({
        employeeBasicInfo,
        employeeGroupInfo,
        id: employeeBasicInfo.id
      }));



    } catch (error) {
      console.error("Error fetching employee data by code:", error);
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
          onClick={() => setSelectedFilter("재직자")}
          $isActive={selectedFilter === "재직자"}
        >
          재직자
        </FilterButton>
        <Divider>|</Divider>
        <FilterButton
          onClick={() => setSelectedFilter("퇴사자")}
          $isActive={selectedFilter === "퇴사자"}
        >
          퇴사자
        </FilterButton>

      </FilterSection>
      <NumberOfEmployeesArea>
        <NumberArea>
          <Element>
            <span style={{ margin: "7px", fontWeight: 600 }}>사용자: </span>
            <span style={{ color: "#308EFC", fontWeight: 600 }}>
              {
                isSearchExecuted? 
                selectedFilter === "재직자" ? openEmployeeDataList.length
                  :selectedFilter === "퇴사자" ?closeEmployeeDataList.length
                    :employeeDataList.length
                    :selectedFilter === "재직자" ? openEmployeeDataList.length
                  :selectedFilter === "퇴사자" ?closeEmployeeDataList.length
                    :employeeDataList.length
              }
            </span>

            <span style={{ margin: "5px", fontWeight: 600 }}>명</span>
          </Element>
          <SelectBox onChange={e => setSortType(e.target.value)}>
            <option value="default">정렬순</option>
            <option value="sortdate">입사일순</option>
            <option value="sortname">이름순</option>
          </SelectBox>
        </NumberArea>
      </NumberOfEmployeesArea>

      <EmployeeListArea>
        {isSearchExecuted?
            selectedFilter === "재직자" ? renderEmployeeDataList(openEmployeeDataList) 
            :  selectedFilter === "퇴사자" ? renderEmployeeDataList(closeEmployeeDataList)
              : renderEmployeeDataList(employeeDataList)
          : selectedFilter === "재직자" ? renderEmployeeDataList(openEmployeeDataList) 
          :  selectedFilter === "퇴사자" ? renderEmployeeDataList(closeEmployeeDataList)
            : renderEmployeeDataList(employeeDataList)
        }
      </EmployeeListArea>
      <EmployeeListPageNation>
        <SpaceArea>
          {pageRange[0] > 1 && <StyledGrPrevious onClick={handlePrevPageRange} />}
          {renderPageNumbers()}
          {/* 데이터의 끝 페이지가 현재 페이지 범위의 끝보다 클 경우 "다음" 버튼을 표시 */}
          {Math.ceil(dataForPagination.length / itemsPerPage) > pageRange[1] && <StyledGrNext onClick={handleNextPageRange} />}
        </SpaceArea>
      </EmployeeListPageNation>


    </Container>

  );
}



const Container = styled.div`

  position: relative;   
 width: 100%;  
  margin-left: 20px;
  margin-top: 10px;
  margin-right: 20px;
  border: 1.5px solid #CCCCCC;
  box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
  outline: none;
  display: flex;  
  flex-direction: column;  
  height: auto;  // 자동으로 높이를 조절하여 내용을 모두 포함
`;

const NumberOfEmployeesArea = styled.div`
  position: sticky;
  height: 40px;
  display:flex;
  justify-content: space-between;
  align-items: center;
  border-bottom:1px solid #ECECEB;
  background-color: #F8F9F9;
  top: 0;
  font-size: 10px;
  padding : 10px;
`;

const EmployeeListArea = styled.div`
  padding: 20px;
  background-color: #F9F9F9;
  border: none;
  height: 400px;
`;

const EmployeeListPageNation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;  
  background-color: #FFFEFE;
  border-top: 1.5px solid #ECECEB;
  padding: 5px 0; 
  height: auto;  // 페이지네이션 영역의 높이도 자동으로 조절
`;


const NumberArea = styled.div`
  display: flex;
  width: 100%;
  margin:15px;
  
`;


const SelectBox = styled.select`
&:focus {
  outline: none;
  border-color: none;
  box-shadow: none;
  background:none;
  
}
font-weight:bold;
width: 90px;
border : none;
background:none;
cursor: pointer;
font-size: 15px;
`
const Element = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 16px;
  
  
  
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;  // 양 끝에 내용을 배치
cursor: pointer;
border: 1.5px solid #CCCCCC;
margin-bottom: 10px;
margin-top: 5px;
padding :10px;
background-color: ${props => props.$isselected === "true" ? '#e6f4ff' : 'white'};
border-color: ${props => props.$isselected === "true"? '#7BAAF1' : '#CCCCCC'};
transition: transform 0.2s ease, box-shadow 0.2s ease;  // 부드러운 변환 효과
height: 60px;

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
const Image = styled.img`

  width: 40px;  // 원하는 이미지 크기로 조절
  height: 40px;
  margin-right: 20px;  // 오른쪽 여백
`;
const EmployeeInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 15px;

  & > div + div {
    margin-top: 10px;
  }
`;

const JoinInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 12px;

  & > div + div {
    margin-top: 10px;
  }
`;

const ImageAndName = styled.div`
display: flex;
align-items:center;
justify-content:center;
`;

const SpaceArea = styled.div`
  display: flex;
  align-items: center; // 중앙 정렬 추가
  gap: 1px; // 아이템 간의 간격 추가
`;



const PageNumber = styled.span`
  cursor: pointer;
  padding: 10px 10px;
  color: ${props => (props.$isselected ? "#308EFC" : "#333")};
  font-weight: ${props => (props.$isselected ? "bold" : "normal")};
  border-radius: 3px;
  font-size: 15px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #f3f3f3;
  }
`;

const StyledGrNext = styled(GrNext)`
flex-shrink: 0;  // 위치 고정
  cursor: pointer;
  color: #333;
  transition: background-color 0.3s;
  border-radius: 3px;

  &:hover {
    background-color: #f3f3f3;
  }
`;

const StyledGrPrevious = styled(GrPrevious)`
flex-shrink: 0;  // 위치 고정
  cursor: pointer;
  color: #333;
  transition: background-color 0.3s;
  border-radius: 3px;

  &:hover {
    background-color: #f3f3f3;
  }
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F8F9F9;
  height: 50px;

`;

const FilterButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  margin: 5px;
  font-weight: bold;  
  font-size: 16px; 
  color: ${props => props.$isActive ? '#308EFC' : 'grey'};
  border-bottom: ${props => props.$isActive ? '2px solid #308EFC' : 'none'};
  
  &:hover {
    background-color: #EFEFEF;
  }
`;

const Divider = styled.span`
  margin: 0 5px;
`;