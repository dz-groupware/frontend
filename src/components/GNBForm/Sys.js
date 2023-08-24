import styled from 'styled-components';
import { AiOutlineStar, AiOutlineInfoCircle, AiOutlineSearch, AiFillCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { MdOutlineRefresh } from 'react-icons/md';

import axios from 'axios';

export const Module = styled.div`
background-color: white;
width:100%;
height: 100%;
`
export const Nav = styled.div`
display: flex;
color: black;
> span {
    font-size: x-large;
}
`;
export const Info = styled.div`
width: 100%;
background-color: blue;
`;
export const Form = styled.div`
display: flex;
justify-content: center;
width: 100%;
height: 100%;
`;

export const MenuTree = styled.div`
margin:5px;
height:550px;
background-color: white;
width: 30%;
border: 1px solid gray;
`;


export const SearchTree = styled.div`
width: 100%;
height: 100px;

background-color: gray;
`

export const MenuDetail = styled.div`
margin:5px;
width: 50%;
color: black;
height: 550px;
> table > tbody{
    border-collapse: collapse;
    >tr {
      border: 1px solid gray;
    > td:nth-child(1) {
      background-color: gray;
      font-weight: bold;
      text-align: right;
      margin: 10px;
      width:150px;
      }
      > td:nth-child(2) {
        width:400px;
        margin: 10px;
        display: flex;
      }
    }

}

`;

export default function Sys(){
    const data = JSON.parse(`
    [{"menu_id":"3","par_id":"3","menu_name":"부서관리","icon_url":null},{"menu_id":"2","par_id":"2","menu_name":"사원관리","icon_url":null},{"menu_id":"3","par_id":"3","menu_name":"부서관리","icon_url":null},{"menu_id":"2","par_id":"2","menu_name":"사원관리","icon_url":null},{"menu_id":"1","par_id":"1","menu_name":"공지사항","icon_url":null}, {"menu_id":"1","par_id":"1","menu_name":"공지사항","icon_url":null}, {"menu_id":"3","par_id":"3","menu_name":"부서관리","icon_url":null}, {"menu_id":"3","par_id":"3","menu_name":"부서관리","icon_url":null}, {"menu_id":"2","par_id":"2","menu_name":"사원관리","icon_url":null},{"menu_id":"1","par_id":"1","menu_name":"공지사항","icon_url":null},{"menu_id":"2","par_id":"2","menu_name":"사원관리","icon_url":null},{"menu_id":"3","par_id":"3","menu_name":"부서관리","icon_url":null},{"menu_id":"4","par_id":"4","menu_name":"회사관리","icon_url":null},{"menu_id":"2","par_id":"2","menu_name":"사원관리","icon_url":null},{"menu_id":"3","par_id":"3","menu_name":"부서관리","icon_url":null},{"menu_id":"","par_id":"","menu_name":"","icon_url":""},{"menu_id":"3","par_id":"3","menu_name":"부서관리","icon_url":null},{"menu_id":"3","par_id":"3","menu_name":"부서관리","icon_url":null},{"menu_id":"3","par_id":"3","menu_name":"부서관리","icon_url":null},{"menu_id":"2","par_id":"2","menu_name":"사원관리","icon_url":null},{"menu_id":"3","par_id":"3","menu_name":"부서관리","icon_url":null}]
    `);

    function menuDetailHandler(){

    }

    const loadData = async (e) => {
        e.preventDefault();
//        const name =  e.target.name.value;
//        const enabledYN =  e.target.enabledYN.value;
//        const sortOrder =  e.target.sortOrder.value;
        const id = 24;

//        console.log(id, name, enabledYN, sortOrder)

        // form 데이터 보내기 
        try {
            await axios({
                url: `/setting/menu`,
                method:'post',
                baseURL : 'http://localhost:8080',
                data:{
                    id:  id,
                    name:  e.target.name.value,
                    enabledYN:  e.target.enabledYN.value,
                    sortOrder:  e.target.sortOrder.value
                }
            });
            console.log('successed sending Data...');
        } catch (error) {
            console.log('failed sending Data...');
        }
        

        // 이미지 데이터 보내기
        try {
            await axios({
                url: `/setting/menu/img`,
                method:'post',
                baseURL : 'http://localhost:8080',
                headers: { 'Content-Type': 'multipart/form-data' },
                data:{
                    id : id,
                    iconFile:  e.target.iconFile.files[0]
                }
            });
            console.log('successed sending img...');
        } catch (error) {
            console.log('failed sending img...');
        }


    }
    return (
        <Module>
            <Nav>
                <span>메뉴설정</span>
                <div>변경이력</div>
                <div>대메뉴추가</div>
                <div>메뉴추가</div>
                <AiOutlineStar />
            </Nav>
            <Info><AiOutlineInfoCircle />info</Info>
            <Form>
                <MenuList menuData={data} api={menuDetailHandler}/>
                <MenuTree>
                    <SearchTree>
                        <select><option>대메뉴</option></select>
                        <select><option>메뉴</option></select>
                        <br />
                        <input />
                        <AiOutlineSearch />
                        <br />
                        <span>메뉴목록</span>
                    </SearchTree>
                    
                </MenuTree>
                <MenuDetail>
                    <span>대메뉴 정보</span>
                    <form onSubmit={loadData}>
                    <table>
                      <tbody>
                        <tr><td>메뉴명</td><td><input type='text' id='name'/><AiFillCaretDown /></td></tr>
                        <tr><td>사용여부</td><td id='enabledYN'><input type='radio' value='1' name='enabledYN'/>사용<input type='radio' value='0'  name='enabledYN' />미사용</td></tr>
                        <tr><td>정렬</td><td><input type='number' id='sortOrder' /><AiOutlineCaretUp /><AiFillCaretDown /></td></tr>
                        <tr><td>아이콘(48*44)<MdOutlineRefresh /></td>
                        <input type='file' id="iconFile"/>
                        <td className='flex'>
                        <hr/></td></tr>
                      </tbody>
                    </table>
                    <button type='submit'>저장</button>
                    </form>
                </MenuDetail>
            </Form>
        </Module>
    )

}

export const ListBox = styled.div`
margin:5px;
background-color: gray;
width: 20%;
height: 550px;
overflow: auto;
&::-webkit-scrollbar{
    background-color: gray;
}
> div {
    font-size: 20px;
    margin-top: 25px;
    margin-bottom: 25px;
    magin-left:10px;
  }
`;

export function MenuList(props) {
    return (
      <ListBox>
        {
          props.menuData.map((a, i) => (
            <div onClick={props.api(a['menuId'])}>
              <MENU dataA={a}/>                
            </div>
          ))
        }
      </ListBox>
    );
  }
  export const MenuItem = styled.div`
margin: 15px;
background-color: white;
color: black;
width: 100%;
height: 70px;
text-align: center;
font-size: medium;
`;
  export function MENU(props) {

    return (
      <MenuItem>
        <p value={props.dataA["menu_name"]}>{props.dataA["menu_name"]}</p>
      </MenuItem>
    );
  }     