import React, { useEffect, useState } from 'react'
import { VscChevronDown, VscChevronRight } from "react-icons/vsc";
import styled from 'styled-components';
import { useFetchData } from '../../../hooks/useFetchData';

export default function MenuItemEditor({ item, depth=1 , fetchApi, paths, checkedItems, setCheckedItems, curChecked, hasMappedChild, headers}) {
  const [expanded, setExpanded] = useState(item.hasMenu);
  const [checked, setChecked] = useState(curChecked);
  const { data: subMenuItems, setShouldFetch, isLoading, error } = useFetchData(fetchApi, { 
    paths: { ...paths },
    shouldFetch: false,
    headers
  });
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;

    if (!isChecked && subMenuItems.some(subItem => checkedItems[subItem.menuId])) {
      alert('하위 메뉴 아이템 중 체크된 항목이 있으므로 체크를 해제할 수 없습니다.');
      return;
    }
    setChecked(isChecked);
    setCheckedItems(prevState => ({
      ...prevState,
      [item.menuId]: isChecked,
    }));
  };

  const toggleSubMenu = async () => {
    if (!checked) { 
      return;
    }

    if (subMenuItems.length === 0) {
      setShouldFetch(true);
    }
    
    setExpanded(true);
  };
  
  useEffect(() => {
    if (subMenuItems && subMenuItems.length > 0) {
      const newCheckedItems = subMenuItems.reduce((acc, item) => {
        acc[item.menuId] = item.hasMenu;
        return acc;
      }, {});
      setCheckedItems(prev => ({ ...prev, ...newCheckedItems }));
    }
  }, [subMenuItems]);


  useEffect(() => {
    setExpanded(checked);
    toggleSubMenu();
  }, [checked]);
  
  return (
    <>
      <StyledRow as="tr" $depth={depth} $childNodeYn={item.childNodeYn} $hasMenu={item.hasMenu}>
        <td>
          {item.childNodeYn ? (
            <div style={{ width: '1em' }}></div>
            ) : (
            <div style={{ width: '1em' }}>
              <Icon>
                {expanded ? <VscChevronDown /> : <VscChevronRight />}
              </Icon>
            </div>
          )}
          <input 
            type="checkbox" 
            checked={checked} 
            onChange={(e) => {
              handleCheckboxChange(e);
            }}
          />
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
            <MenuItemEditor
              key={subItem.menuId}
              item={subItem}
              depth={depth+1}
              curChecked={subItem.hasMenu && checked}
              fetchApi={fetchApi}
              paths={{...paths, parId: subItem.menuId}}
              checkedItems={checkedItems}
              setCheckedItems={setCheckedItems}
              headers={headers}
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
      $depth === 1 ? '#d6ecf8' : ($childNodeYn ? 'white' : '#E3F4F7'
    )};
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
        color: black;
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

const Icon = styled.div`
  width: 1em;
  color: black;

  & > svg {
    color: black;
  }
`;
