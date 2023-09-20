  import React, { useEffect, useState } from 'react'
  import styled from 'styled-components';
  import { FiPlus, FiMinus } from 'react-icons/fi'
  import { useFetchData } from '../../../hooks/useFetchData';

  export default function MenuItem({ item, isEditMode, depth=1 ,hasMenu, fetchApi, paths, checkedItems, setCheckedItems, curChecked, hasMappedChild}) {
    const [expanded, setExpanded] = useState(hasMenu);
    const [checked, setChecked] = useState(curChecked); // 체크박스 상태를 관리하는 state
    const { data: subMenuItems, setShouldFetch, isLoading, error } = useFetchData(fetchApi, { 
      paths: { ...paths },
      shouldFetch: false,
    });
    const handleCheckboxChange = (e) => {
      const isChecked = e.target.checked;

      if (!isChecked && subMenuItems.some(subItem => checkedItems[subItem.menuId])) {
        // 체크 해제 시도 시 하위 메뉴 아이템 중 체크된 것이 있다면 체크 해제를 방지
        alert('하위 메뉴 아이템 중 체크된 항목이 있으므로 체크를 해제할 수 없습니다.');
        return;
      }
      setChecked(isChecked);
      setCheckedItems(prevState => ({
        ...prevState,
        [item.menuId]: isChecked,
      }));
      // setExpanded(false);
    };

    const toggleSubMenu = async () => {
      if (isEditMode && !checked) { // 수정모드이고 체크되지 않았을때
        return;
      }

      if (expanded && !isEditMode) { //열려있고, 조회전용일때
        setExpanded((prev) => !prev);
        return;
      }
      if (subMenuItems.length === 0) {
        setShouldFetch(true);  // 여기를 수정하여 shouldFetch를 true로 설정하여 훅 내에서 API 호출을 트리거합니다.
      }
      
      setExpanded(true);
    };
    
    useEffect(() => {
      if (isEditMode && subMenuItems && subMenuItems.length > 0) {
        const newCheckedItems = subMenuItems.reduce((acc, item) => {
          acc[item.menuId] = item.hasMenu;
          return acc;
        }, {});
        setCheckedItems(prev => ({ ...prev, ...newCheckedItems }));
      }
    }, [subMenuItems]);

    useEffect(() => {
      if (hasMenu) {
        toggleSubMenu();
      }
    }, [hasMenu]);

    useEffect(() => {
      if (isEditMode) {
        setExpanded(checked);
        toggleSubMenu();
      }
    }, [checked, isEditMode]);
    
    return (
      <>
        <StyledRow as="tr" $depth={depth} $childNodeYn={item.childNodeYn} $hasMenu={hasMenu}>
          <td>
            {item.childNodeYn ? (
              <div style={{ width: '1em' }}></div>
              ) : (
              <div style={{ width: '1em' }}>
              {((isEditMode && checked) || (!isEditMode)) ? (
                <StyledButton onClick={toggleSubMenu}>
                  {expanded ? <FiMinus /> : <FiPlus />}
                </StyledButton>
              ) : null}
              </div>
            )}
            {isEditMode && ( // 수정 모드일 때만 체크박스를 보여줍니다
              <input 
                type="checkbox" 
                checked={checked} 
                onChange={(e) => {
                  handleCheckboxChange(e);
                }}
              />
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
              <MenuItem
                key={subItem.menuId}
                item={subItem}
                depth={depth+1}
                isEditMode={isEditMode}
                hasMenu={subItem.hasMenu}
                curChecked={subItem.hasMenu && checked}
                fetchApi={fetchApi}
                paths={{...paths, parId: subItem.menuId}}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
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
