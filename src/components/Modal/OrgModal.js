import styled from 'styled-components';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {orgTreeApi} from '../../utils/API';

import {AiOutlineSearch, AiFillFolderOpen} from 'react-icons/ai';
import {LuBuilding2} from 'react-icons/lu';

const EmpItem=styled.div`
display: flex;
border : 1px solid black;
margin: 5px;
background-color: white;

> div > img {
    margin: 20px;
    width: 50px;
    heigth: 50px;
}
> div {
    > # title {
        font-weight: border;
    }

    > span {
    color: gray;
}
`
export default function OrgModal(props){
    
    const [data, setData] = useState(JSON.parse('[{"id":"", "name":""}]'));
    const [open, setOpen] = useState([false]);
    const emp_id = useSelector(state => state.gnbMenu.key);
  
    useEffect(() => {
      async function LoadData(emp_id){
        const res = await orgTreeApi('comp', "","",emp_id);
        console.log('in useEffect : ', res.data.data)
        setData(res.data.data);
      }
      LoadData(emp_id);
    }, [emp_id]);
  
  
    console.log(data, typeof(data))
    return (
        <>

        <div id="nav">
          <div>조직도</div>
          <div onClick={() => {props.api('org')}}>X</div>
        </div>
        <hr style={{width: '965px'}}/>
        <div>
          <div id='search'>
            <select ><option value='all'>전체</option><option value='dept'>부서명</option><option value='emp'>사원명</option></select>
            <input type="text" placeholder="검색" />
            <AiOutlineSearch />
          </div>
          <div id='content' className="flex">
            <div id='deptList'>
              {
                data.map((a, i) => (
                    <>
                  <div key={a['name']+a['id']} onClick={setOpen(open => {
                    const newOpen = [...open];
                    newOpen[i] = !newOpen[i]
                    return newOpen})}><LuBuilding2 />{a['name']}</div>
                    { false && open[i] && (
                        <DeptList value={a['id']}/>
                      )}
                    </>
                ))
              }
              
            </div>
            <div id='empList'>
              <EmpList/>
            </div>
            <div id='empDetail'>
              {(
                <EmpDetail/>
              )}
          </div>
        </div>
        </div>
        </>
    )
}

export function DeptList(props) {
    const [data, setData] = useState(['[{"id":"", "name":""}]']);
    const [open, setOpen] = useState([false]);
  
    useEffect(() => {
      async function LoadData(){
        const res = await orgTreeApi('Dept1', props.value,"","");
        console.log('in useEffect : ', res.data.data)
        setData(res.data.data);
      }
      LoadData();
    }, [props.value]);
  
    return (
      <>
        {data.length > 0 && (
          data.map((a, i) => (
            <div key={a['name']+a['id']} onClick={setOpen(open => ({
              ...open, [i]: !open[i]}))} style={{marginLeft:'15px'}}><AiFillFolderOpen />{a['name']}
              { open[i] && (
                <Dept value={a['id']}/>
              )}
            </div>
          )))
        }
      </>
    )
  }
  
  export function Dept(props) {
    const [data, setData] = useState(['[{"id":"", "name":""}]']);
    const [open, setOpen] = useState([false]);
    console.log('in Dept')
  
    useEffect(() => {
      async function LoadData(){
        const res = await orgTreeApi('Dept2', props.value,"","");
        console.log('in useEffect : ', res.data.data)
        setData(res.data.data);
      }
      LoadData();
    }, [props.value]);
  
    return (
      <>
        {data.length > 0 && (
          data.map((a, i) => (
            <div key={a['name']+a['id']} onClick={setOpen(open => ({
              ...open, [i]: !open[i]}))} style={{marginLeft:'15px'}}><AiFillFolderOpen />{a['name']}
              { open[i] && (
                <Dept value={a['id']}/>
              )}
            </div>
          )))
        }
      </>
    )
  }
export function EmpList(){
    const dummyData = JSON.parse('[{"p_img":"사원1", "emp_name":"회사A", "login_id":"dztmpid123@test.com", "tree_path":"회사A/부서B", "mobile_number":"010-1122-3344"}]')
  
    return (
        <div style={{overflow: "scroll", height: "95%" }}>
        {
            dummyData.map ((a, i) => (
                <EmpItem >
                    <div>
                        <img src={a['p_img']} alt='p_img' />
                    </div>
                    <div>
                        <div id='title'>
                            {a['emp_name']} / {a['login_id']}
                        </div>
                        <div>{a['tree_path']}</div>
                        <span>{a['mobile_number']}</span>
                    </div>
                </EmpItem>
            ))
  
        }
        </div>
    )
  }
  
  export function EmpDetail() {
    const dummyData = JSON.parse('[{"p_img":"사원1", "emp_name":"회사A", "login_id":"dztmpid123@test.com", "tree_path":"회사A/부서B", "mobile_number":"010-1122-3344"}]')
    return (
        <div>
            <div>
                <img src={dummyData[0]['p_img']} alt='p_img'  style={{width:'50px', height:'50px'}}/>
                <hr />
            </div>
            <table>
                <tr>
                    <td style={{backgroundColor:'grey'}}>전화번호</td><td>{dummyData[0]['mobile_number']}</td>
                </tr>
            </table>
        </div>
    )
  }