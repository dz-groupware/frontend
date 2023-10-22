import styled from "styled-components";

import DeptItem from "./DeptItem";
import { useEffect, useState } from "react";
import Retry from "../../pages/Error/Retry";

export default function SearchResult ({ result, setItem, detail, setDetail, filter }){
  const [data, setData] = useState([]);
  const [error, setError] = useState({ org: false });

  useEffect(() => {
    if (result.length > 0) {
      setError({ org: false });

      try{
        switch (filter) {
          case "all":
            setData(result);
            break;
          case "enableY":
            console.log("enabledY : ", result);
            setData(result.filter(a => a["enabledYn"] === true));
            break;
          case "enableN":
            setData(result.filter(a => a["enabledYn"] === false));
            break;
          case "manageY":
            setData(result.filter(a => a["managementYn"] === true));
            break;
          case "manageN":
            setData(result.filter(a => a["managementYn"] === false));
            break;
          case "includY":
            console.log("여기 in Y")
            setData(result.filter(a => a["includedYn"] === true));
            break;
          case "includN":
            setData(result.filter(a => a["includedYn"] === false));
            break;
          default: 
           setData([]);
            console.log("error : 잘못된 필터 입니다.");
        }
      } catch (error) {
        setData([]);
        setError({ org: true });
      }
    } else {
      setData([]);
    }
  }, [filter, result]);
  
  return (
    <ResultContent>
      {data.length > 0 && 
        data.map((a, i) => (
          <DeptItem 
            dept={a} 
            setItem={setItem} 
            detail={detail} 
            setDetail={setDetail} 
            className={`${detail.id === a["id"]}`}
            key={"item::"+ a["name"]} 
          />
        ))
      } 
      {error.org &&
        <Retry />
      }
    </ResultContent>
  );
};

const ResultContent = styled.ul`
padding-top: 2px;
overflow: auto;
height: calc(100% - 150px);
&::-webkit-scrollbar {
    width: 5px; 
    height: 5px;
    background-color: transparent; 
  }
  &::-webkit-scrollbar-thumb {
    background-color: #318dfc;
    border-radius: 5px; 
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #7dafdc;
  }
`;