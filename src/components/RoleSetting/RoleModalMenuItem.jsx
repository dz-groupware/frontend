import React, { useState } from 'react'
import styled from 'styled-components';
import { useFetchData } from '../../hooks/useFetchData';
import { FiPlus, FiMinus } from 'react-icons/fi'

export default function RoleModalMenuItem({ item, depth=1 ,hasMenu, fetchApi, paths}) {
  const [expanded, setExpanded] = useState(false);
  const { data: subMenuItems, setData:setSubMenuItems, isLoading, error } = useFetchData(fetchApi, { 
    paths: { ...paths }
  });

  const toggleSubMenu = async () => {
    if (expanded) {
      setExpanded(false);
      return;
    }

    if (subMenuItems.length === 0) {
      const fetchedSubMenuItems = await fetchApi({paths:{ ...paths }});
      setSubMenuItems(fetchedSubMenuItems);
    }
    setExpanded(true);
  };

  return (
    <>
      <StyledRow as="tr" $depth={depth} $childNodeYn={item.childNodeYn} $hasMenu={hasMenu}>
        <td>
          {item.childNodeYn ? (
            <div style={{ width: '1em' }}></div>
          ) : (
            <div style={{ width: '1em' }}>
              <StyledButton onClick={toggleSubMenu}>
                {expanded ? <FiMinus/> : <FiPlus/>}
              </StyledButton>
            </div>
          )}
          <div>
            {item.menuId}
          </div>
          <div>
            {item.menuName}
          </div>
        </td>
        <td>{item.enabledYn ? 'O' : 'X'}</td>
      </StyledRow>
      {expanded && subMenuItems.length > 0 && (
        <>
          {subMenuItems.map((subItem, subIndex) => (
            <RoleModalMenuItem
              key={subItem.menuId}
              item={subItem}
              depth={depth+1}
              hasMenu={hasMenu}
              fetchApi={fetchApi}
              paths={{...paths, parId: subItem.menuId}}
            />
          ))}
        </>
      )}
    </>
  );
}

const StyledRow = styled.tr`
  height: 2rem;
  background-color: ${({ $depth, $childNodeYn }) => 
    $depth === 1 ? 'skyblue' : ($childNodeYn ? 'yellow' : 'white')};
  color: ${({ $hasMenu }) => ($hasMenu ? 'red' : 'black')};
  
  td {
    height: 2rem;
    vertical-align: middle;
    border-bottom: 1px solid #ccc;
    &:first-child {
      width: 100%; // 75%로 설정하거나 원하는 비율로 조절하세요
      display: flex;
      align-items: center;
      gap: 1rem;
      border-left: 1px solid #ccc;
      border-right: 1px dashed #ccc;
      padding-left: ${({ $depth }) => `${$depth * 20}px`}; // 여기를 수정했습니다
    }

    &:last-child {
      width: 13%; // 25%로 설정하거나 원하는 비율로 조절하세요
      text-align: center;
      border-left: none;
      border-right: 1px solid #ccc;
    }
  }
  
`;



const StyledButton = styled.button`
  background-color: white;
  border: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
