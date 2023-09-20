import React, { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useFetchData } from '../../../hooks/useFetchData';
import styled from 'styled-components';

export default function MenuItemView({ item, depth = 1, fetchApi, paths }) {
  const [expanded, setExpanded] = useState(false);
  const { data: subMenuItems, setShouldFetch, isLoading, error } = useFetchData(fetchApi, { 
    paths,
    shouldFetch: false,
  });
  const toggleSubMenu = () => {
    if (expanded) {
      setExpanded((prev) => !prev);
      return;
    }
    if (subMenuItems.length === 0) {
      setShouldFetch(true);
    }
    setExpanded(true);
  };

  return (
    <>
      <StyledRow as="tr" $depth={depth} $hasMappedChild={item.hasMappedChild}>
        <td>
          {item.hasMappedChild ?  (
              <div style={{ width: '1em' }}>
                <StyledButton 
                  onClick={toggleSubMenu}
                >
                  {expanded ? <FiMinus /> : <FiPlus />}
                </StyledButton>
              </div>
            ): (
              <div style={{ width: '1em' }}></div>
            )}
          {/* <div>
            {item.menuId}
          </div> */}
          <div>
            {item.menuName}
          </div>
        </td>
        <td>{item.enabledYn ? 'O' : 'X'}</td>
      </StyledRow>
      {expanded && subMenuItems.length > 0 && (
        <>
          {subMenuItems.map((subItem, subIndex) => (
            <MenuItemView
              key={subItem.menuId}
              item={subItem}
              depth={depth+1}
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
  background-color: ${({ $depth, $hasMappedChild }) => 
    $depth === 1 ? '#d6ecf8' : ($hasMappedChild ? '#E3F4F7' : 'white'
  )};

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
      position: relative;
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