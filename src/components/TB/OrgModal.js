import styled from 'styled-components';

import {AiOutlineSearch, AiFillFolderOpen} from 'react-icons/ai';
import {LuBuilding2} from 'react-icons/lu';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {orgTreeApi, orgEmpListApi} from '../../utils/API';

import EmpList from './EmpList';

export const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: ; //위치지정 요소
  position: fixed;
  display : flex;
  justify-content : center;
  align-items : center;
  background-color: rgba(0,0,0,0.4);
  border-radius: 10px;
  top : 0;
  left : 0;
  right : 0;
  bottom : 0;
`;

export const OrgModalView = styled.div`  
  // Modal창 CSS를 구현합니다.
  display: flex;
  position: relative;
  top:0px;
  right:0px;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
  width: 1000px;
  height: 550px;
  color: black;
  background-color: #ffffff;

  > #nav {
    display: flex;
    justify-content: space-around;
  }

  > div > span {
    position : right;
  }
  

  > div > #search {
    width: 100%;
    border: 1px solid gray;  
    height: 40px;

    > select {
      width: 100px;
      height: 20px;
      margin: 5px;
      margin-right: 0px;
      > option {
        height: 20px;
      }
    }

    > input {
      height: 20px;
      width: 600px;
      margin: 5px;
      margin-right: 200px;
    }
}

  > div > #content {
    display: flex;
    justify-content: center;
    height: 400px;
    width: 100%;

    > #deptList {
      margin-top : 5px;
      width: 250px;
      height: 100%;
      border : 1px gray solid;
    }

    > #empList {
      background-color: gray;
      width: 450px;
      height: 100%;
      margin: 5px;
      border : 1px gray solid;
      > ::-webkit-scrollbar {
        background-color: gray;
      }
      >  ::-webkit-scrollbar-thumb {
        background-color: white;
        border_radius: 10px;

        }
      
    }

    > #empDetail {
      margin-top : 5px;
      width: 250px;
      height: 100%;
      border : 1px gray solid;
    }
  }
`;
export default function OrgModal(props){
  
  const [data, setData] = useState(JSON.parse('[{"id":"", "name":""}]'));
  const [empList, setEmpList] = useState(JSON.parse('[{"id":"", "name":""}]'));
  const [open, setOpen] = useState([false]);
  const emp_id = useSelector(state => state.gnbMenu.key);
  console.log('in orgModal', open)
  useEffect(() => {
    async function LoadData(emp_id){
      const res = await orgTreeApi('comp', "","",emp_id);
      console.log('in useEffect : ', res.data.data)
      setData(res.data.data);
    }
    LoadData(emp_id);
  }, [emp_id]);  

  async function loadEmpList(type, text){
    const res = await orgEmpListApi(type, text);
    setEmpList(res.data.data);
  }
    return (
      <ModalBackdrop onClick={() => {props.api('org')}}>
      <OrgModalView onClick={(e) => e.stopPropagation()}>
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
                  <div value={a['name']+a['id']}>
                    <div onClick={() => {
                      console.log(a['name'])
                      setOpen(open => {
                        const newOpen = [...open];
                        newOpen[i] = !newOpen[i];
                        return newOpen;
                      });
                      loadEmpList('comp', a['id']);
                      }}><LuBuilding2 />{a['name']}
                      
                    </div>
                    { open[i] && (
                        <DeptList value={a['id']} api={loadEmpList}/>
                      )}
                  </div>
                ))
              }
              
            </div>
            <div id='empList'>
              <EmpList value={empList}/>
            </div>
            <div id='empDetail'>

          </div>
        </div>
        </div>
      </OrgModalView>
    </ModalBackdrop>
  
    )
  }


  export function DeptList(props) {
    const [data, setData] = useState(['[{"id":"", "name":""}]']);
    const [deptOpen, setDeptOpen] = useState([false]);
    console.log('in deptList')
  
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
            <div key={a['name']+a['id']} >
              <div onClick={() => {
                setDeptOpen(deptOpen => {
                  const newDeptOpen = [...deptOpen];
                  newDeptOpen[i] = !newDeptOpen[i];
                  return newDeptOpen;
                });
                props.api('dept', a['id']);
                }} style={{marginLeft:'15px'}}><AiFillFolderOpen />{a['name']}
              </div>
              { deptOpen[i] && (
                  <Dept dept={a['id']} comp={props.value} api={props.api}/>
                )}
            </div>
          )))
        }
      </>
    )
  }
  
    
  export function Dept(props) {
    const [data, setData] = useState(['[{"id":"", "name":""}]']);
    const [dept, setDept] = useState([false]);
    console.log('in deptList')
  
    useEffect(() => {
      async function LoadData(){
        const res = await orgTreeApi('Dept2', props.comp,props.dept,"");
        console.log('in useEffect : ', res.data.data)
        setData(res.data.data);
      }
      LoadData();
    }, [props]);
  
    return (
      <>
        {data.length > 0 && (
          data.map((a, i) => (
            <div key={a['name']+a['id']} >
              <div onClick={() => {
                setDept(deptOpen => {
                  const newDept = [...dept];
                  newDept[i] = !newDept[i];
                  return newDept;
                });
                props.api('dept', a['id']);
                }} style={{marginLeft:'35px'}}><AiFillFolderOpen />{a['name']}
              </div>
              { dept[i] && (
                  <Dept dept={a['id']} comp={props.comp}/>
                )}
            </div>
          )))
        }
      </>
    )
  }