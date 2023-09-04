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
    </Container>
  );
}

const Container = styled.div`
  flex:1;
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

