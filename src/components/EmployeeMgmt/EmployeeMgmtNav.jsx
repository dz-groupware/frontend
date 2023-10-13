import { useDispatch } from 'react-redux';
import MgmtNav from '../Commons/MgmtNav';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../utils/axiosInstance';
import { styled } from 'styled-components';
import { employeeActions } from '../../utils/Slice';
import { getCompanyMgmtList } from '../../api/companymgmt';
import { findEmployeeMgmtList, getDepartmentList } from '../../api/employeemgmt';
//회사 목록 선택시 보내는 Search 부분 api 변경해야함 선택 옵션도 달라져야함 


export default function EmployeeMgmtNav({pageId}) {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [departmentOptions, setDepartmentOptions] = useState([]); // 회사 옵션을 담을 상태


  const fetchdepartment = async () => {
    try {
        const departmentList = await getDepartmentList(pageId);
        setDepartmentOptions(departmentList);
    } catch (error) {
        console.error("Error fetching company data:", error);
    }
};

  useEffect(() => {
    fetchdepartment(); 
  }, []);



  const handleSearch = async () => {
    try {
        dispatch(employeeActions.hideForm());
        dispatch(employeeActions.setSearchValue(searchValue));
        dispatch(employeeActions.setSelectedOption(selectedOption));  
    
        
        
    } catch (error) {
        console.error("API Error:", error);
    }
};
    


const handleKeyDown  = (e) => {
  if (e.key === 'Enter') {
    handleSearch(); // Enter 키를 누르면 검색 실행
  }
};

  const searchFields = (
    <>
      <Label>부서</Label>
      <Select style={{ width: 'fitContent' }}
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="0">전체</option>


        {Array.isArray(departmentOptions) && departmentOptions.length > 0 ? departmentOptions.map((department) => (
          <option key={department.id} value={department.id}>{department.name}</option>
        )) : <option disabled>Loading department...</option>}

      </Select>


      <Label>이름/ID/Mail ID</Label>
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown } 
      />
    </>
  );
  return (
    <Container>

      <MgmtNav onSearch={handleSearch}>
        {searchFields}
      </MgmtNav>

    </Container >
  );
}



const Label = styled.span`
  font-size: 15px;
  font-weight: 900;
  margin: 10px;
`;

const Select = styled.select`
  margin: 10px;
`;

const Input = styled.input`
  margin: 10px;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;  // 가로 중앙 정렬

`;