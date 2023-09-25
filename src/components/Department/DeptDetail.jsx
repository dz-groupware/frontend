// import { useEffect, useState } from 'react';

// import styled from 'styled-components';

// import { addDepartment,  deleteDepartment, getBasicDetailById, getEmpListByDeptId } from '../../api/department';
// import DeptDetailBasic from './DetailBasic';
// import DeptDetailEmp from './DetailEmp';

// export default function DeptDetail({ value }){
//   const [data, setData] = useState(value);

//   return (
//     <>
//       {
//         status.detailType &&
//         <Content>
//       <DetailType>
//         <div className={status.detailType === 'basic' ? 'on' : 'off'} onClick={() => setStatus({...value, detailType:'basic'})}>기본 정보</div>
//         <span>|</span>
//         <div className={status.detailType === 'emp'  ? 'on' : 'off'} onClick={() => setStatus({...value, detailType:'emp'})}>부서원 정보</div>
//       </DetailType>

//       {status.detailType === 'basic' ? 
//       <DeptDetailBasic value={value} setValue={setValue}isModified={isModified} handleAddDept={handleAddDept}/> : null}
//       {status.detailType === 'emp' ? 
//       <DeptDetailEmp empList={empList}/> : null}
//       </Content>
//       }
//     </>
//   )
// }

// const Content = styled.div`
// display: block;
// width: 100%;
// height: 100%;
// min-width: 600px;
// color: black;
// margin: 10px;
// `;
// const DetailTitle = styled.div`
// display: flex;
// justify-content: space-between;
// font-size: large;
// font-weight: bold;
// width: 100%;
// border-bottom: 2px solid gray;
// margin-bottom: 5px;
// > div {
//   padding: 5px;
//   display: flex;
// }
// `;
// const DetailType = styled.div`
// display: flex;
// width: 100%;
// border-bottom: 2px solid gray;
// margin-bottom: 5px;
// font-size: medium;
// font-weight: bold;

// & .on {
//   color: blue;
//   border-bottom: 1px solid blue;
// }
// & .off {
//   color: black;
// }
// > div {
//   display: flex;
//   padding : 10px;
// }
// > span{
//   padding-top: 10px;
// }
// `;