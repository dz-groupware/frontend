import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { employeeActions } from "../../utils/Slice";
import { getEmployeeDetailsById, getEmployeeMgmtList } from "../../api/employeemgmt";

export default function EmployeeMgmtAside({menuId}) {
  const dispatch = useDispatch();
  const [employeeDataList, setEmployeeDataList] = useState([]);
  const [sortType, setSortType] = useState("default");
  const searchedEmployeeDataList = useSelector(state => state.employeeMgmt.searchList);
  const isSearchExecuted = useSelector(state => state.employeeMgmt.isSearchExecuted);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const isVisible = useSelector(state => state.employeeMgmt.isVisible);
  const reduxbasicInfo = useSelector(state => state.employeeMgmt.employeeBasicInfo);
  const [currentPage, setCurrentPage] = useState(1);




  useEffect(() => {
    async function fetchEmployees() {
      const data = await getEmployeeMgmtList(menuId);
      // console.log("data", data);
      setEmployeeDataList(data);
    }

    fetchEmployees();
  }, [searchedEmployeeDataList]);

  useEffect(() => {

    if (isVisible === false) {
      // console.log("이즈비지블 처리됏니");

      setSelectedEmployeeId(null);
    }
  }, [isVisible]);




  if (!employeeDataList) {
    return <div>Loading...</div>;
  };

  // const itemsPerPage = 5;
  //   const totalPages = Math.ceil(employeeDataList.length / itemsPerPage);

  // const renderPageNumbers = () => {
  //   const pageNumbers = [];
  //   for (let i = 1; i <= totalPages; i++) {
  //     pageNumbers.push(
  //       <PageNumber
  //         key={i}
  //         isSelected={i === currentPage}
  //         onClick={() => setCurrentPage(i)}
  //       >
  //         {i}
  //       </PageNumber>
  //     );
  //   }
  //   return pageNumbers;
  // };



  function renderEmployeeDataList(dataList) { //dataList는 배열
  

    let sortedDataList = Object.keys(dataList).map(key => dataList[key]);
    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    // sortedDataList = sortedDataList.slice(startIndex, endIndex);
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
console.log("너네 뭐니",employeeMgmt);
    setSelectedEmployeeId(employeeMgmt.id);
    // console.log("selectedEmployeeId", selectedEmployeeId);


    try {
      const fetchedEmployeeData = await getEmployeeDetailsById(employeeMgmt.id,menuId);
      console.log(fetchedEmployeeData);
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
        deletedYn: employee.deletedYn
      }));



      // Redux에 업데이트
      dispatch(employeeActions.updateBasicInfo(employeeBasicInfo)); // Redux action이 단일 객체를 받아야 함
      dispatch(employeeActions.updateGroupInfo(employeeGroupInfo)); // Redux action이 배열을 받아야 함

      console.log("3333basic", reduxbasicInfo.id);//잘나옴
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
      <NumberOfEmployeesArea>
        <NumberArea>
          <Element>
            <span style={{ margin: "5px", fontWeight: 600 }}>사용자: </span>
            <span style={{ color: "#308EFC", fontWeight: 600 }}>
              {isSearchExecuted ? Object.keys(searchedEmployeeDataList).length : Object.keys(employeeDataList).length}</span>
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
        {isSearchExecuted ? renderEmployeeDataList(searchedEmployeeDataList) : renderEmployeeDataList(employeeDataList)}
      </EmployeeListArea>
      <EmployeeListPageNation>
        {/* {renderPageNumbers()} */}
      </EmployeeListPageNation>


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

const NumberOfEmployeesArea = styled.div`
  position: sticky;
  height: 50px;
  display:flex;
  justify-content: space-between;
  align-items: center;
  border-bottom:1px solid #ECECEB;
  background-color: #F8F9F9;
  top: 0;
  font-size: 14px;
`;

const EmployeeListArea = styled.div`
position: relative; 
padding: 10px;
padding-bottom: 50px;
height: calc(450px - 40px - 50px);
overflow-y: auto;
background-color: #F9F9F9;
border: none;

`;

const EmployeeListPageNation = styled.div`
display:flex;
justify-content:center;
position: absolute;
bottom: 0;
width: 100%;   // Container의 width와 동일하게 설정
background-color: #FFFEFE;
border-top: 1.5px solid #ECECEB ;
padding : 15px;
height:50px;

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
font-weight:bold;
width: 78px;
border : none;
background:none;
cursor: pointer;
font-size: 12px;
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
  background-color: ${props => props.$isselected === "true" ? '#EFEFEF' : 'white'};

  padding :10px;
`;
const Image = styled.img`

  width: 30px;  // 원하는 이미지 크기로 조절
  height: 30px;
  margin-right: 20px;  // 오른쪽 여백
`;
const EmployeeInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 12px;

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
`
const PageNumber = styled.span`
  margin: 0 5px;
  cursor: pointer;
  color: ${props => (props.isSelected ? "blue" : "black")};
  font-weight: ${props => (props.isSelected ? "bold" : "normal")};
`;
