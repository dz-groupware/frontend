import React, { useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { companyActions} from "../../App";
import MgmtNav from "../Commons/MgmtNav";



export default function CompanyMgmtNav() {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("");
    const [selectedOption, setSelectedOption] = useState("");

    const handleSearch = async () => {
        try {
            dispatch(companyActions.hideForm());
            // searchValue와 selectedOption이 빈 문자열일 경우 *로 처리
            const actualSearchValue = searchValue === "" ? "%25%25" : `%25${searchValue}%25`;
            const actualSelectedOption = selectedOption === "" ? 2 : `${selectedOption}`;

            const response = await axiosInstance.get(`/companies/company-list?name=${actualSearchValue}&enabledYn=${actualSelectedOption}`);

            
            // 응답 데이터 처리
            console.log("API Response:", response.data);
            dispatch(companyActions.searchInfo(response.data));
        } catch (error) {
            console.error("API Error:", error);
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