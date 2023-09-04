import { useState } from "react";
import styled from "styled-components";

export default function EmployeeMgmtAside() {
  const [sortType, setSortType] = useState("default");
   return(
    <Container>
       <NumberOfEmployeesArea>
         <NumberArea>
          <Element>
            <span style={{ margin: "5px", fontWeight: 600 }}>사용자: </span>
            {/* <span style={{ color: "#308EFC", fontWeight: 600 }}>  {isSearchExecuted ? Object.keys(searchedEmployeeDataList).length : Object.keys(employeeDataList).length}</span> */}
            <span style={{ margin: "5px", fontWeight: 600 }}>명</span>
          </Element>
          <SelectBox onChange={e => setSortType(e.target.value)}>  
            <option value="default">정렬순</option>
            <option value="sortcode">입사일순</option>
            <option value="sortname">이름순</option>
          </SelectBox>
        </NumberArea> 
      </NumberOfEmployeesArea>

      <EmployeeListArea>
      {/* {isSearchExecuted ? renderCompanyDataList(searchedEmployeeDataList) : renderCompanyDataList(employeeDataList)} */}
      </EmployeeListArea>
      <EmployeeListPageNation>
        11
      </EmployeeListPageNation>

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
border : 1.5px solid #ECECEB;
border-top: 2px solid black;

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
  font-size: 14px;
`;
const EmployeeListArea = styled.div`
position: relative; 

padding: 10px;
height: calc(360px - 40px); 
overflow-y: auto;
background-color: #F9F9F9;
border: none; // 이 부분을 추가

`;

const EmployeeListPageNation = styled.div`
display:flex;
justify-content:center;
position: absolute;
bottom: 0;
width: 100%;   // Container의 width와 동일하게 설정
background-color: #FFFEFE;
border-top: 1.5px solid #ECECEB ;

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
