import { useState } from 'react';
import styled from 'styled-components';

import { getDepartmentById } from '../../api/department';
import { AiFillProfile, AiFillFolderOpen, AiFillFolder, AiOutlineProfile } from 'react-icons/ai';

export default function DeptItem({ dept, detail, setDetail, menuId }){
  const [open, setOpen] = useState(false);
  const [subItem, setSubItem] = useState([]);

  // console.log("dept : ", dept);
  const handleDetail = () => {
    console.log('subItem.length : ', subItem.length);
    if(subItem.length === 0) {
      getDepartmentById(dept['id'], menuId).then(res => setSubItem(res.data.data));
    }
    setOpen(!open);
    // setId({...id, newDeptId:dept['id']});
    // setStatus({...status, status:'modify', detailType:'basic'});
    // setDetail({ ...detail, state: dept['id'], type: 'basic' });
    if (detail.id === '' ){
      setDetail({ ...detail, id: dept['id'], type: 'basic'});
    } else {
      setDetail({ ...detail, state: dept['id'] , type: detail.type ? detail.type : 'basic'});
    }
  }

  // useEffect(() =>{
  //   if(typeof detail.state === 'number') {
  //     setDetail({id: dept['id'], type:'basic', state: 'modify', save: false });
  //   }
  // }, [detail.state]);

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
              <DeptItem dept={a} detail={detail} setDetail={setDetail} menuId={menuId} key={a['name']+a['id']}/>
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
