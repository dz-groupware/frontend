import { useDispatch } from 'react-redux';
import MgmtNav from '../Commons/MgmtNav';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../utils/axiosInstance';
import { styled } from 'styled-components';
import { employeeActions } from '../../utils/Slice';
import { getCompanyMgmtList } from '../../api/companymgmt';
import { findEmployeeMgmtList } from '../../api/employeemgmt';
//회사 목록 선택시 보내는 Search 부분 api 변경해야함 선택 옵션도 달라져야함 


export default function EmployeeMgmtNav({pageId}) {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [companyOptions, setCompanyOptions] = useState([]); // 회사 옵션을 담을 상태


  const fetchCompanies = async () => {
    try {
        const companyList = await getCompanyMgmtList(pageId);
        setCompanyOptions(companyList);
    } catch (error) {
        console.error("Error fetching company data:", error);
    }
};

  useEffect(() => {
    fetchCompanies(); 
  }, []);



  const handleSearch = async () => {
    try {
        dispatch(employeeActions.hideForm());
        
        const responseData = await findEmployeeMgmtList(searchValue, selectedOption,pageId);
            
        // 응답 데이터 처리
        console.log("API Response:", responseData);
        dispatch(employeeActions.searchInfo(responseData));
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
      <Label>회사</Label>
      <Select style={{ width: 'fitContent' }}
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="0">전체</option>


        {Array.isArray(companyOptions) && companyOptions.length > 0 ? companyOptions.map((company) => (
          <option key={company.id} value={company.id}>{company.name}</option>
        )) : <option disabled>Loading companies...</option>}

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