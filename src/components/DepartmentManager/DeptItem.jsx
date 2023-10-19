import { useEffect, useState } from "react";
import styled from "styled-components";

export default function DeptItem({ dept, setItem, detail, setDetail }){
  const [open, setOpen] = useState(false);

  const handleDetail = () => {
    console.log('clicked in ', dept.id, ' and is open ', open);
    if(!open && !dept.subItem) {
      setItem(dept);
    }
    setOpen(!open);

  };

  useEffect(() => {
    if (open) {
      setDetail({ ...detail, isChanging: dept["id"] , type:( detail.type ? detail.type : "basic")});
    } 
  }, [open]);

  useEffect(() => {
    console.log('useEffect in ', dept.id, ' and is open ', open);
    if (detail.id === dept.id) {
      setOpen(true);
    }
  }, [detail.id]);

  return (
    <> 
    <DeptArea>
      <div 
        onClick={handleDetail}  
        className={`DeptTreeItem ${detail.id === dept["id"] ? "true" : "false"}`}
      >
      {open ? 
        (dept["childNodeYn"] === true ? (
          <img src="/img/page.png" width={18} alt="example" />
        ) : (
           <img src="/img/comp/dept_open_32.png" width={20} alt="example" />
        )) :   
        (dept["childNodeYn"] === true ? (
          <img src="/img/page.png" width={18} alt="example" /> 
        ) : (
          <img src="/img/comp/dept_50.png" width={18} alt="example" />
        )) 
      }
      <Item>
        {dept["code"]}.{dept["name"]}
      </Item>
      </div>
      <ItemChild>
      {open && dept.subItem && dept.subItem.length !== 1 &&
        dept.subItem.map((a, i) => {
          if (a["id"] !== a["parId"]) {
            return (
              <DeptItem 
                dept={a} 
                setItem={setItem} 
                detail={detail} 
                setDetail={setDetail} 
                key={"item::"+a["name"]}
              />
            );
          };
          return null;
        })
      }    
      </ItemChild>
    </DeptArea>
    </>
  );
}

const DeptArea = styled.li`
width: 100%;
padding: 0;
font-size: 20px;
list-style: none;
> .DeptTreeItem {
  margin: 5px;
  padding: 5px;
  display: flex;
  align-items: center;
  /* width: 350px; */
  box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.1),
            -1px -1px 3px 0px rgba(0,0,0,.1);
            outline: none;
&.true {
  background-color: rgb(214,236,248);
  border: 1px solid rgb(146,183,214);
}
}
`;
const ItemChild = styled.div`
padding-left: 10px;
`;
const Item = styled.div`
margin-left: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; 
  width: 100%; 
  > svg {
    color: rgb(18,172,226);
    width: 25px;
    height: 25px;
    margin-right: 8px; /* 아이콘과 텍스트 사이의 간격 조절 */
  }
`;