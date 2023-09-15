import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { employeeActions } from "../../utils/Slice";
import { getEmployeeDetailsById, getEmployeeMgmtList } from "../../api/employeemgmt";

export default function EmployeeMgmtAside() {
  const dispatch = useDispatch();
  const [employeeDataList, setEmployeeDataList] = useState([]);
  const [sortType, setSortType] = useState("default");
  const searchedEmployeeDataList = useSelector(state => state.employeeMgmt.searchList);
  const isSearchExecuted = useSelector(state => state.employeeMgmt.isSearchExecuted);

  useEffect(() => {
    async function fetchCompanies() {
      const data = await getEmployeeMgmtList();
      setEmployeeDataList(data);
    }

    fetchCompanies();
  }, [searchedEmployeeDataList]);
  if (!employeeDataList) {
    return <div>Loading...</div>;
  };


  function renderEmployeeDataList(dataList) { //dataList는 배열

    let sortedDataList = Object.keys(dataList).map(key => dataList[key]);


    // sortType에 따라서 정렬
    if (sortType === "sortdate") {
      sortedDataList = sortedDataList.sort((a, b) => a.joinDate.localeCompare(b.joinDate));
    } else if (sortType === "sortname") {
      sortedDataList = sortedDataList.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    const elements = sortedDataList.map((data, index) => {
      const truncatedLoginId = truncateString(data.loginId, 10);
      const truncatedName = truncateString(data.name, 10);
      return (

        <Wrapper key={index}>
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







  // async function handleEmployeeClick(employeeMgmt) {
  //   try {
  //     // 회사 정보를 가져옵니다.
  //     console.log(employeeMgmt.id);
  //     const fetchedEmployeeData = await getEmployeeDetailsById(employeeMgmt.id);
  //     console.log(fetchedEmployeeData);
  //     // 가져온 회사 정보와 코드를 함께 showForm 액션에 전달합니다.
  //     dispatch(employeeActions.showForm({ employeeInfo: fetchedEmployeeData, id: fetchedEmployeeData.id }));

  //     console.log("fetchdata:", fetchedEmployeeData);
  //   } catch (error) {
  //     console.error("Error fetching employee data by code:", error);
  //   }
  // }
  return (
    <Container>
      <NumberOfEmployeesArea>
        <NumberArea>
          <Element>
            <span style={{ margin: "5px", fontWeight: 600 }}>사용자: </span>
            <span style={{ color: "#308EFC", fontWeight: 600 }}>  {isSearchExecuted ? Object.keys(searchedEmployeeDataList).length : Object.keys(employeeDataList).length}</span>
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
        페이지네이션구현예정
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
  background-color: white;
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