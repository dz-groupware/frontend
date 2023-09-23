import { useState } from 'react';
import styled from 'styled-components';

import { getDepartmentById } from '../../api/department';
import { AiFillProfile, AiFillFolderOpen, AiFillFolder, AiOutlineProfile } from 'react-icons/ai';


export default function DeptItem({ dept, id, setId, status, setStatus, setDetailEmp, menuId }){
  const [open, setOpen] = useState(false);
  const [subItem, setSubItem] = useState([]);

  const handleDetail = () => {

    if(subItem.length === 0) {
      getDepartmentById(dept['id'], menuId).then(res => setSubItem(res.data));
    }
    setOpen(!open);
    setId({...id, newDeptId:dept['id']});
    setStatus({...status, status:'modify', detailType:'basic'});
    console.log('set modify');
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
        open && subItem.map((a, i) => {
          if (a['id'] !== a['parId']) {
            return (
              <DeptItem dept={a} id={id} setId={setId} status={status} setStatus={setStatus} key={a['name']+a['id']} menuId={menuId}/>
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
