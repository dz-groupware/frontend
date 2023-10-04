import { useState } from 'react';
import styled from 'styled-components';

import { AiFillProfile, AiFillFolderOpen, AiFillFolder, AiOutlineProfile } from 'react-icons/ai';


export default function DeptItem({ dept, setItem, detail, setDetail }){
  const [open, setOpen] = useState(false);

  // console.log("dept : ", dept.subItem);
  const handleDetail = () => {
    if(!open && !dept.subItem) {
      console.log('request subItem : ', dept['id']);
      setItem(dept['id']);
    }
    setOpen(!open);
    if (detail.id === '' ){
      setDetail({ ...detail, id: dept['id'], type: 'basic'});
    } else {
      setDetail({ ...detail, state: dept['id'] , type: detail.type ? detail.type : 'basic'});
    }
  }

  return (
    <> 
    <DeptArea>
      <div className='DeptTreeItem'>
      { 
        open ? 
        (dept['childNodeYn'] === true ? <AiFillProfile /> : < AiFillFolderOpen/>)
        :    
        (dept['childNodeYn'] === true ? <AiOutlineProfile /> : <AiFillFolder /> ) 
      }
      <div onClick={handleDetail} >
        {dept['code']}.{dept['name']}
      </div>
      </div>
      {
        open && dept.subItem && dept.subItem.map((a, i) => {
          if (a['id'] !== a['parId']) {
            return (
              <DeptItem dept={a} setItem={setItem} detail={detail} setDetail={setDetail} key={'item::'+a['name']}/>
            )
          }
          return null;
        })
      }    
    </DeptArea>
    </>
  );
}


const DeptArea = styled.div`
margin: 10px;
padding: 10px;
background-color: rgb(214,236,248);

> .DeptTreeItem {
  display: flex;
}
`;
