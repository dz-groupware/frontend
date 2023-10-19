import React, { useEffect,useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import MgmtNav from "../Commons/MgmtNav";
import { companyActions } from "../../utils/Slice";
import { findCompanyMgmtList } from "../../api/companymgmt";



export default function CompanyMgmtNav({pageId}) {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("");
    const [selectedOption, setSelectedOption] = useState("");



    const handleSearch = async () => {
      try {
          dispatch(companyActions.hideForm());
          dispatch(companyActions.setSearchValue(searchValue));
          dispatch(companyActions.setSelectedOption(selectedOption));  
         
      } catch (error) {
          console.error("API Error:", error);
      }
  };

  
const handleKeyDown  = (e) => {
  if (e.key === 'Enter') {
    handleSearch(); // Enter 키를 누르면 검색 실행
  }
};
      
        // MgmtNav에 전달할 children 요소들을 정의
        const searchFields = (
          <>
            <span style={{ fontSize: '15px', fontWeight: '900', margin: '10px' }}>회사</span>
            <input
              style={{ margin: '10px' }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown } 
            />
            <span style={{ fontSize: '15px', fontWeight: '900', margin: '10px' }}>사용여부</span>
            <select
              style={{ margin: '10px' }}
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="2">전체</option>
              <option value="1">사용</option>
              <option value="0">미사용</option>
            </select>
          </>
        );
      
        return (
          <MgmtNav onSearch={handleSearch}>
            {searchFields}
          </MgmtNav>
        );
      }