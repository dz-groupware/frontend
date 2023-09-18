import { useState } from 'react';
import styled from 'styled-components';

import { getDepartmentById } from '../../api/department';
import { AiFillProfile, AiFillFolderOpen, AiFillFolder, AiOutlineProfile } from 'react-icons/ai';


export default function DeptItem(props){
  const [open, setOpen] = useState(false);
  const [subItem, setSubItem] = useState([]);

  const handleDetail = () => {

    if(subItem.length === 0) {
      getDepartmentById(props.value['id']).then(res => setSubItem(res.data));
    }
    setOpen(!open);
    props.setNewDeptId(props.value['id']);
    props.setDetailType('basic');
    props.setStatus('modify');
    console.log('set modify');
  }

  return (
    <> 
    <DeptArea>
      <div className='DeptTreeItem'>
      { 
        open ? 
        (props.value['childNodeYn'] === true ? <AiFillProfile /> : < AiFillFolderOpen/>)
        :    
        (props.value['childNodeYn'] === true ? <AiOutlineProfile /> : <AiFillFolder /> ) 
      }
      <div onClick={handleDetail} >
        {props.value['code']}.{props.value['name']}
      </div>
      </div>
      {
        open && subItem.map((a, i) => {
          if (a['id'] !== a['parId']) {
            return (
              <DeptItem key={a['name']+a['id']} setDetailType={props.setDetailType} value={a} detailType={props.detailType} setDeptId={props.setDeptId} setDetail={props.setDetail} setNewDeptId={props.setNewDeptId} setStatus={props.setStatus}/>
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
