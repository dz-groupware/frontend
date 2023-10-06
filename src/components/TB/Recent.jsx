import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { BiLinkExternal } from 'react-icons/bi';

export default function Recent(){
  const maxVisibleChips = 4; 
  const [showChipButton, setShowChipButton] = useState(maxVisibleChips);
  const [showAddMoreButton, setShowAddMoreButton] = useState(false);
  const [chipData, setChipData] = useState([]);
  const contentRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (contentRef.current) {
      const contentWidth = contentRef.current.clientWidth;
      setShowAddMoreButton(contentWidth < chipData.length * 230);
      setShowChipButton(Math.floor(contentWidth/240));
    }
  }, [chipData, contentRef]);

  const navigator = (path) => {
    navigate(`${path}`);
  }

  const currentURL = decodeURI(window.location.href);

  const handleDelete = (pathName) => () => {
    setChipData((chips) => {
      const newChips = chips.filter((chip) => chip.name !== pathName);
      return newChips;
    });
  };

  useEffect(() => {
    const splitURL =  currentURL.split('/');
    const pathName = splitURL[splitURL.length - 1];
    if( pathName !== 'FORBIDDEN' && pathName !== ''){
      setChipData((chips) => {
        const newChips = chips.filter((chip) => chip.name !== pathName);
        newChips.unshift({ name: pathName, path: "/"+currentURL.split('http://localhost:3000/')[1] })
        return newChips;
      });
    }
  }, [window.location.href]);

  return(
    <Content ref={contentRef}>
      {chipData.slice(0, showChipButton).map((data) => {
        return (
          <ListItem key={'recent'+data.name}>
            <BiLinkExternal />
            <Chip
              name={data.name}
              path={data.path}
              onDelete={handleDelete(data.name)}
              navigator={navigator}
            />
          </ListItem>
        );
      })}
      {showAddMoreButton && (
        <ChipMore/>
      )}
    </Content>
  )
}

const Chip = ({ name, path, onDelete, navigator }) => {
  return (
    <ChipContainer onClick={() => navigator(path)}>
      {name.length < 7 ? name : `${name.slice(0, 7)}...`}
      {onDelete && (
        <span onClick={onDelete}>X</span>
      )}
    </ChipContainer>
  );
};

const ChipMore = () => {
  return (
    <ChipMoreContainer> ... </ChipMoreContainer>
  );
};

const ListItem = styled.div`
width: 200px;
height: 50px;
display: flex;
justify-content: center;
border: 1px solid blue;
border-radius: 5px;
margin: 10px;

> svg {
  width: 25px;
  height: 25px;
  margin: 10px;
}
`;
const Content = styled.div`
width: 100%;
display: flex;
justify-content: start;
flex-wrap: wrap;
list-style: none;
margin: 10px;
margin-left: 20px;
`;
const ChipContainer = styled.div`
width: 140px;
height: 50px;
font-size: large;
display: flex;
justify-content: space-between;
white-space: normal;
padding-top: 12px;

white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
> span {
  z-index: 1;
  margin-left: 4;
  cursor: pointer;
}
`;
const ChipMoreContainer = styled.div`
border: 1px solid blue;
border-radius: 5px;
margin: 10px;
width: 40px;
height: 50px;
font-size: large;
display: flex;
justify-content: space-between;
white-space: normal;
padding: 10px;
`;