import styled from 'styled-components';

import { IoCallOutline } from 'react-icons/io5';

export default function EmpList({ value, handler, clickedEmp, setClickedEmp }){
  return (
    <ListDiv>
    {
      value.map ((a, i) => (
        <EmpItem className={(clickedEmp === a['deptName']+a['empName']) ? 'true' : 'false'}
         onClick={()=>{handler(a)}} key={a['empName']+i+a['compName']}>
          <div>
            <img src={a['imageUrl']} alt='p_img' />
          </div>
          <div className='info'>
            <div>
              <div id='title'>{a['empName']} / {a['position']}</div> <div> | {a['loginId']}</div>
            </div>
            <p>{a['compName']} / {a['deptName']}</p>
            <div className='number'>
              <IoCallOutline /><span>{a['number']}</span>
            </div>
          </div>
        </EmpItem>
      ))
    }
    </ListDiv>
  );
}

const EmpItem=styled.div`
display: flex;
border : 1px solid black;
margin: 5px;
background-color: white;
z-index: 2;
> div > img {
  margin: 20px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
}
> .info {
  font-weight: 100;
  > * {
    margin: 10px;
    margin-left: 0px;
  }
  > div {
    display: flex;
    > * {
      margin: 5px;
    }
    > #title {
      font-size: large;
      font-weight: 600;
    }
  }
  > p {
    margin-left: 10px;
    color: gray;
    font-size: small;
    font-weight: 500;
  }
  > .number {
    color: gray;
    display: flex;
    > svg {
      width: 20px;
      height: 20px;
    }    
  }
}
&.true {
  background-color: rgb(214,236,248);
  border: 1px solid rgb(146,183,214);
  border-radius: 5px;
}
&:hover {
  background-color: rgb(189, 221, 238);
  cursor: pointer;
}
`;
export const ListDiv = styled.div`
width: 450px;
height: 100%;
margin: 5px;
overflow: scroll;
height: 100%;
background-color: #f2f3f6;
&::-webkit-scrollbar {
    display: none;
}
`;