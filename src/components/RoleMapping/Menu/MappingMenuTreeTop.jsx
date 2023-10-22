import React from 'react'
import styled from 'styled-components';
import LinkButton from '../../Commons/LinkButton';

export default function MappingMenuTreeTop({isEditMode, setIsEditMode, setIsSaveClicked, setIsDeleteClicked}) {

  return (
    <Container>
      <HeaderWrapper>
        <LinkButton 
            cursor="none"
            onClick={(e)=>e.preventDefault()}
            name="전체"
            padding="0 1.2rem"
            selected={true}
            showBorderLeft={true}
            showBorderRight={true}
        />
      </HeaderWrapper>
      <SearchWrapper>
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
      </SearchWrapper>
    </Container>
  );
}

const Container = styled.div`
  flex:1;
  padding-top: 0.8rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
`;

const SearchWrapper = styled.div`
  display: flex;
  border: 1px solid lightgrey;
`;

const Element = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;