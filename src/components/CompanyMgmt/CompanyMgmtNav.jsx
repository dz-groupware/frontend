import React, { useState } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { axiosInstance } from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { searchInfo } from "../../App";



export default function CompanyMgmtNav() {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("");
    const [selectedOption, setSelectedOption] = useState("");

    const handleSearch = async () => {
        try {
            // searchValue와 selectedOption이 빈 문자열일 경우 *로 처리
            const actualSearchValue = searchValue === "" ? "%25%25" : `%25${searchValue}%25`;
            const actualSelectedOption = selectedOption === "" ? 2 : `${selectedOption}`;

            const response = await axiosInstance.get(`/api/v1/companies/search?name=${actualSearchValue}&enabledYn=${actualSelectedOption}`);

            
            // 응답 데이터 처리
            console.log("API Response:", response.data);
            dispatch(searchInfo(response.data));
        } catch (error) {
            console.error("API Error:", error);
        }
        
    };

    return (
        <div>
            <Container>
                <SearchArea>
                    <span style={{ fontSize: '15px', fontWeight: '900', margin: '10px' }}>회사</span>
                    <input
                        style={{ margin: '10px' }}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)} />
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

                </SearchArea>
                <ButtonArea onClick={handleSearch}>
                    <SearchButton><FiSearch style={{ color: "lightgrey" }} /></SearchButton>
                </ButtonArea>

            </Container>

        </div>
    );
}


const Container = styled.div`
    display: flex;
    justify-content: space-between;
    border: 2px solid lightgrey;
    margin: 20px;
    
`;

const SearchArea = styled.div`
    display: flex;
    align-items:center;
`;

const ButtonArea = styled.div`
    display: flex;
    
    padding:10px;
`;

const SearchButton = styled.button`
  width: fit-content;
  height: fit-content;
  font-weight: 600;
  background: linear-gradient(to bottom, #ffffff,#ffffff,#e4e4e4); 
  padding: 5px;
  margin: 5px;
  border: 1px solid #C9C9C9;
  border-radius: 5px;
  cursor : pointer; 
  &:active {
    background: lightgrey;
    color: white;
  }

`