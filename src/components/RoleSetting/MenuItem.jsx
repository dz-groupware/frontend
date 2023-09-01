import React, { useEffect, useState } from 'react'
import { getLnbList } from '../../api/company';
import { styled } from 'styled-components';

export default React.memo(function MenuItem({ item, companyId, depth=0 }) {
  const [subMenuItems, setSubMenuItems] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const toggleSubMenu = async () => {
    if (expanded) {
      setExpanded(false);
      return;
    }

    if (subMenuItems.length === 0) {
      const fetchedSubMenuItems = await getLnbList({ companyId, parId: item.id });
      setSubMenuItems(fetchedSubMenuItems);
    }
    setExpanded(true);
  };

  return (
    <Container depth={depth}>
      {item.childNodeYn ? (
        <button onClick={toggleSubMenu} >
          {expanded ? '-' : '+'}
        </button>
      ) : (
        <span style={{ width: '1em', display: 'inline-block' }}></span>
      )}
      <div>{item.id} - {item.name}</div>
      {expanded && subMenuItems.length > 0 ? (
        <div>
          {subMenuItems.map((subItem, subIndex) => (
            <MenuItem
              key={subItem.id}
              item={subItem}
              companyId={companyId}
              depth={1}
            />
          ))}
        </div>
      ) : null}
    </Container>
  );
})

const Container = styled.div`
  margin-left: ${({ depth }) => `${depth * 20}px`};
`;


