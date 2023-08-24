import React from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";


export default function CompanyMgmtNav() {
    return (
        <div>
            <Container>
                <Leftdiv>
                    <span style={{ fontSize:'15px', fontWeight:'900', margin: '10px' }}>회사</span>
                    <input style={{ margin: '10px' }} />
                    <span style={{ fontSize:'15px', fontWeight:'900', margin: '10px' }}>사용여부</span>
                    <select style={{ margin: '10px' }} > 
                    <option>전체</option>
                    <option>사용</option>
                    <option>미사용</option>

                    </select>
                   
                </Leftdiv>
                <Rightdiv>
                    <SearchButton><FiSearch style={{color: "lightgrey"}}/></SearchButton>
                </Rightdiv>

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

const Leftdiv = styled.div`
    display: flex;
    align-items:center;
`;

const Rightdiv = styled.div`
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