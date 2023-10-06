import { useState } from 'react';
import styled from 'styled-components';

import { AiFillProfile, AiFillFolderOpen, AiFillFolder, AiOutlineProfile } from 'react-icons/ai';


export default function DeptItem({ dept, setItem, detail, setDetail }){
  const [open, setOpen] = useState(false);

  // console.log('request subItem : ', dept);
  const handleDetail = () => {
    if(!open && !dept.subItem) {
      console.log('request subItem : ', dept['id']);
      setItem(dept['id']);
    }
    setOpen(!open);
    setDetail({ ...detail, isChanging: dept['id'] , type:( detail.type ? detail.type : 'basic')});
  }

  return (
    <> 
    <DeptArea>
      <div className='DeptTreeItem'>
      { 
        open ? 
        (dept['childNodeYn'] === true ? 
        <AiFillProfile  className={`${detail.id === dept['id'] ? 'true' : 'false'}`}/> 
        : < AiFillFolderOpen  className={`${detail.id === dept['id'] ? 'true' : 'false'}`}/>)
        :    
        (dept['childNodeYn'] === true ? 
        <AiOutlineProfile  className={`${detail.id === dept['id'] ? 'true' : 'false'}`}/> 
        : <AiFillFolder className={`${detail.id === dept['id'] ? 'true' : 'false'}`} /> ) 
      }
      <div onClick={handleDetail} className={`item ${detail.id === dept['id'] ? 'true' : 'false'}`}>
        {dept['code']}.{dept['name']}
      </div>
      </div>
      {
        open && dept.subItem && dept.subItem.map((a, i) => {
          if (a['id'] !== a['parId']) {
            return (
              <DeptItem dept={a} setItem={setItem} detail={detail} setDetail={setDetail} key={'item::'+a['name']} />
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
width: 130%;
padding: 10px 0 10px 15px;
background-color: white;
font-size: 20px;
> .DeptTreeItem {
  display: flex;
  align-items: center;
  /* width: 350px; */
  > .true {
    color: rgb(18,172,226);
  }
  > .false {
    color: rgb(21, 21, 21);
  }
  > .item {
    margin-left: 10px;
    margin-bottom: 5px;
    width: calc(100% - 35px);
    white-space: nowrap; 
  }
  > svg .true {
    color: rgb(18,172,226);
    width: 25px;
    height: 25px;
    margin-right: 8px; /* 아이콘과 텍스트 사이의 간격 조절 */
  }
  > svg .false {
    width: 25px;
    height: 25px;
    color: rgb(21, 21, 21);
    margin-right: 8px; /* 아이콘과 텍스트 사이의 간격 조절 */
  }
}
`;
