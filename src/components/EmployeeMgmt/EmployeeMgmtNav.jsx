import { useDispatch } from 'react-redux';
import MgmtNav from '../Commons/MgmtNav';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../utils/axiosInstance';
import { styled } from 'styled-components';
import { employeeActions } from '../../utils/Slice';
import { getCompanyMgmtList } from '../../api/companymgmt';
//회사 목록 선택시 보내는 Search 부분 api 변경해야함 선택 옵션도 달라져야함 


export default function EmployeeMgmtNav() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [companyOptions, setCompanyOptions] = useState([]); // 회사 옵션을 담을 상태


  const fetchCompanies = async () => {
    try {
        const companyList = await getCompanyMgmtList();
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
      // searchValue와 selectedOption이 빈 문자열일 경우 *로 처리
      const actualSearchValue = searchValue === "" ? "%25%25" : `%25${searchValue}%25`;
      const actualSelectedOption = selectedOption === "" ? 2 : `${selectedOption}`;

      const response = await axiosInstance.get(`/companies/search?name=${actualSearchValue}&enabledYn=${actualSelectedOption}`);


      // 응답 데이터 처리
      console.log("API Response:", response.data);
      dispatch(employeeActions.searchInfo(response.data));
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const searchFields = (
    <>
      <Label>회사</Label>
      <Select style={{ width: 'fitContent' }}
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="0">선택</option>


        {Array.isArray(companyOptions) && companyOptions.length > 0 ? companyOptions.map((company) => (
          <option key={company.id} value={company.id}>{company.name}</option>
        )) : <option disabled>Loading companies...</option>}

      </Select>


      <Label>이름/ID/Mail ID</Label>
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </>
  );
  return (
    <div>

      <MgmtNav onSearch={handleSearch}>
        {searchFields}
      </MgmtNav>

    </div >
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
