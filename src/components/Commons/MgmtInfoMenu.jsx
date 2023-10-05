import React from "react";
import styled from "styled-components";

export default function MgmtInfoMenu({ activeTab, setActiveTab }) {
    return (
        <TabContainer>
            <Tab 
                $isactive={activeTab === "basic"} 
                onClick={() => setActiveTab("basic")}
            >
                기본정보
            </Tab>
            <span style={{ height: '24px', borderRight: '2px solid lightgrey', marginLeft: '0px', marginRight: '-5px' }} />
            <Tab 
                $isactive={activeTab === "department"} 
                onClick={() => setActiveTab("department")}
            >
                부서정보
            </Tab>
        </TabContainer>
    );
}

const TabContainer = styled.div`
display: flex;
border-bottom: 2px solid #BABBBB;
width: 100%;
margin: 0 auto;
height: 40px;
justify-content: left;
align-items : center;
`;

const Tab = styled.div`
  padding: 10px;
  cursor: pointer;
  font-size: 15px; 
  font-weight: 900; 
  margin: 5px; 
  border-bottom: ${props => (props.$isactive ? "2px solid #1D89F4" : "none")};
  color: ${props => (props.$isactive ? "#1D89F4" : "#7E7F7E")};
`;
