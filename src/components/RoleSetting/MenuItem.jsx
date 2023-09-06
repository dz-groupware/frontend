import React, { useState } from 'react'
import { getLnbList } from '../../api/authgroup';
import { styled } from 'styled-components';
import { useFetchData } from '../../hooks/useFetchData';

export default React.memo(function MenuItem({ item, companyId, depth=0 }) {
  // const [subMenuItems, setSubMenuItems] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const { data: subMenuItems, setData:setSubMenuItems, isLoading, error } = useFetchData(getLnbList, { 
    paths: { companyId: 1, parId: item.menuId }
  });
  

  const toggleSubMenu = async () => {
    if (expanded) {
      setExpanded(false);
      return;
    }

    if (subMenuItems.length === 0) {
      const fetchedSubMenuItems = await getLnbList({paths:{ companyId:1, parId: item.menuId }});
      setSubMenuItems(fetchedSubMenuItems);
    }
    setExpanded(true);
  };

  return (
    <Container>
      <StyledMenu $depth={depth} $childNodeYn={item.childNodeYn}>
        {item.childNodeYn ? (
          <button onClick={toggleSubMenu} >
            {expanded ? '-' : '+'}
          </button>
        ) : (
          <span style={{ width: '1em', display: 'inline-block' }}></span>
          )}
        <div>{item.menuId} - {item.menuName}</div>
      </StyledMenu>

      {expanded && subMenuItems.length > 0 ? (
        <div>
          {subMenuItems.map((subItem, subIndex) => (
            <MenuItem
              key={subItem.menuId}
              item={subItem}
              childNodeYn={subItem.childNodeYn}
              companyId={companyId}
              depth={depth+1}
            />
          ))}
        </div>
      ) : null}
    </Container>
  );
})

const Container = styled.div`
  width: 100%;
  display: block;
`;

const StyledMenu = styled.div`
  padding-left: ${({ $depth }) => `${$depth * 20}px`};
  background-color: ${({ $depth ,$childNodeYn }) => ($depth == 0 ? 'skyblue' : ($childNodeYn ? 'yellow' : 'white'))};
  border-bottom: 1px solid black;
`;


