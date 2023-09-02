import styled from 'styled-components';
import {  AiOutlineFolderOpen, AiOutlineFileText } from 'react-icons/ai';

export default function TreeItem(props){
  return (
    <div>{props.value.map((a, i) => (
      props.parId===a['parId'] && a['id'] !== props.parId ? 
      <Item>{a['sub'] === 0 ? <AiOutlineFolderOpen /> : <AiOutlineFileText /> } {a['name']}
        <TreeItem value={props.value} parId={a['id']}/>
      </Item> : null
    ))}
    </div>
  );
}

export const Item = styled.div`
margin-left: 10px;
margin-top: 5px;
`;