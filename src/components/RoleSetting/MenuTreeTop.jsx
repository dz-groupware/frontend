import React, { useState } from 'react';
import styled from 'styled-components';

export default function MenuTreeTop() {
  const [selectedKey, setSelectedKey] = useState(null);

  const handleItemClick = (key) => {
    setSelectedKey(selectedKey === key ? null : key);
  };

  return (
    <Container>
      <Wrapper1>
        <Button selected>전체</Button>
        <Button>사용자 메뉴</Button>
        <Button>관리자 메뉴</Button>
        <Button>수정</Button>
      </Wrapper1>
      <Wrapper2>
        <Element>
          <span>대메뉴</span>
          <select>
            <option>전체</option>
            {/* 다른 옵션 */}
          </select>
        </Element>
        <Element>
          <span>메뉴명</span>
          <input placeholder="메뉴명을 입력하세요" />
          <button>🔍</button>
        </Element>
      </Wrapper2>
      <Wrapper3>
        <h3>메뉴명</h3>
        <MenuTree>
          <MenuItem onClick={() => handleItemClick('1')}>
            - 임직원 업무 관리
            {selectedKey === '1' && (
              <>
                <Line />
                <MenuItem onClick={() => handleItemClick('2')}>-- 마이페이지</MenuItem>
                {selectedKey === '2' && (
                  <>
                    <Line />
                    <MenuItem onClick={() => handleItemClick('3')}>--- 내 정보 관리</MenuItem>
                    {selectedKey === '3' && (
                      <>
                        <Line />
                        <MenuItem>---- 개인 인사 정보 조회</MenuItem>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </MenuItem>
          {/* 다른 메뉴 아이템들... */}
        </MenuTree>
      </Wrapper3>
    </Container>
  );
}

const Container = styled.div`

`;

const Wrapper1 = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background: ${(props) => (props.selected ? 'blue' : 'none')};
  color: ${(props) => (props.selected ? 'white' : 'black')};
  border: none;
  cursor: pointer;
`;

const Wrapper2 = styled.div`
  display: flex;
  border: 1px solid lightgrey;
`;

const Element = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Wrapper3 = styled.div`
  border-top: 1px solid black;
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
`;

const Line = styled.div`
  border-left: 1px solid black;
  height: 10px;
`;

const MenuTree = styled.div`
  /* 메뉴 트리 스타일링 */
`;

const MenuItem = styled.div`
  cursor: pointer;
`;
