import styled from 'styled-components';
import { AiOutlineStar, AiOutlineInfoCircle, AiOutlineSearch, AiOutlinePaperClip,  AiOutlineFolderOpen, AiOutlineFileText, AiFillStar } from 'react-icons/ai';
import { MdOutlineRefresh } from 'react-icons/md';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Sys(){
  const [gnbList, setGnbList] = useState([]);
  const [menuDetail, setMenuDetail] = useState([]);
  const [result, setResult] = useState([]);
  const [detail, setDetail] = useState([false, false]);
  const [favor, setFavor] = useState(false);

  const empId = useSelector(state => state.gnbMenu.key);
  const menuId = 8;  // 현재 페이지 id 가져오기 (나중에)
    useEffect(() => {
      // gnb 리스트 가져오기
      function GnbApi(){
        axios({
          url: `/setting/menu/gnb`,
          method:'get',
          baseURL : 'http://localhost:8080',
        }).then(res => {setGnbList(res.data.data)});
      }

      function Favor(){
        axios({
          url: `/setting/favor?empId=${empId}&menuId=${menuId}`,
          method:'get',
          baseURL : 'http://localhost:8080',
        }).then(res => {console.log(res.data);setFavor(res.data)});
      }

      GnbApi();
      Favor();
    }, [empId, menuId])

    // 대메뉴/메뉴 디테일 on/off
    function menuDetailHandler(type, menuDetail){
      if (type === 'gnbDetail') {
        setDetail([2, false]);
      }
      if (type === 'menuDetail') {
        setDetail([false, 2]);
      }
      if (type === 'newGnb') {
        setDetail([1, false]);
      }
      if (type === 'newMenu') {
        setDetail([false, 1]);
      }
      setMenuDetail(menuDetail);
      console.log(type, menuDetail, detail[0], detail[1]);
    }

    // X 버튼
    function detailOff(){
      setDetail([false, false])
    }

    // 메뉴 검색 결과
    function searchAPI(event){
      console.log('searchAPI');
      event.preventDefault();
      const formData = new FormData(document.getElementById('searchForm'));
//      console.log(formData);
//      console.log(formData.get("gnbName"), formData.get("name"));
      
      axios({
        url: `/setting/menu/search?gnbName=${formData.get("gnbName")}%25&name=%25${formData.get("name")}%25`,
        method:'get',
        baseURL : 'http://localhost:8080',
        data: {
          formData
        }
      }).then(res => {
        console.log('setResult : ', res.data.data);
        setResult(res.data.data);
      });
    
//      console.log(formData);
    }

    // 즐겨찾기 추가/삭제 요청
    function FavorApi(){
      console.log(favor);
      if (favor) {
        // 즐겨찾기가 되어 있으면 삭제 요청
        axios({
          url: `/setting/favor?empId=${empId}&menuId=${menuId}`,
          method:'delete',
          baseURL : 'http://localhost:8080'
      }).then(res => {
        console.log('favor off : ', res.data);
        setFavor(!favor);
      });
    } else {
      // 즐겨찾기가 안되어 있으면 즐겨찾기 추가 요청
      axios({
        url: `/setting/favor?empId=${empId}&menuId=${menuId}`,
        method:'post',
        baseURL : 'http://localhost:8080',
        data : {
          empId: empId,
          menuId: menuId
        }
      }).then(res => {
        console.log('favor on : ', res.data);
        setFavor(!favor);
      });
    }
  }

  return (
    <Module>
      <Nav>
        <div id ='title'>메뉴설정</div>
        <div id ='btn'>
          <button>변경이력</button>
          <button onClick={() => {menuDetailHandler('newGnb', '')}}>대메뉴추가</button>
          <button onClick={() => {menuDetailHandler('newMenu', '')}}>메뉴추가</button>
          <hr />
          <div onClick={FavorApi}>{favor ? <AiFillStar /> : <AiOutlineStar/>}</div>
        </div>
      </Nav>
      <Info>
          <div>
          <AiOutlineInfoCircle />&nbsp; info
          </div>
      </Info>
      <Form>
        <MenuList value={gnbList} api={menuDetailHandler}/>
        <MenuTree>
          <SearchTree id='searchForm'>
            <select name="gnbName">
              {
                gnbList.map((a, i) => (
                  <option key={i} id='gnbName' value={a['name']}>{a['name']}</option>
                  ))
              }
            </select><select><option>전체</option></select>
            <input id='name' placeholder=' 메뉴명 검색' name='name'/>
            <AiOutlineSearch onClick={(e) => {searchAPI(e)}}/>
            <br />
            <div>
              <span>메뉴목록</span>
              <select name="filter">
                <option value="all">필터</option>
                <option value='admin'>관리자 메뉴</option>
                <option value='general'>사용자메뉴</option>
              </select>
            </div>
          </SearchTree>
          <div>
            {result.map((a, i) => (
              <div onClick={() => {menuDetailHandler('menuDetail', a)}}>{a['name']}</div>
            ))}
          </div>
        </MenuTree>
        { detail[0] && <GnbDetail value={menuDetail} api={detailOff} on={detail[0]}/>}
        { detail[1] && <MenuDetail value={menuDetail} api={detailOff} on={detail[1]}/>}
      </Form>
    </Module>
  )
}
  
export function MenuList(props) {
  return (
    <ListBox>
      <div>
      {
        props.value.map((a, i) => (
          <MenuItem key={i} onClick={()=>{props.api('gnbDetail', a)}}>
          <img src={a['iconUrl']} alt='i'/><div id='menuitemname'>{a['name']}</div>
          </MenuItem>
        ))
      }
      </div>
    </ListBox>
  );
}

export function GnbDetail(props) {
  const [isDragging, setIsDragging] = useState(false);
  const [data, setData] = useState([]);
  const [iconFile, setIconFile] = useState([]);
  const [inputValue, setInputValue] = useState("");
  // const nameRef = useRef(null);
  // const sortRef = useRef(null);

  
  const onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  };
  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIconFile(e.dataTransfer.files[0]);
    setIsDragging(false);
  };
  const loadData = async (e) => {
    e.preventDefault();
    console.log('in loadData : ', props.on);
    const formData = new FormData(e.target);

  console.log(formData.get('name') === "" ? data['name'] : formData.get('name'))
  console.log(formData.get('enabledYN') === null ? data['enabledYN'] : formData.get('enabledYN'))
  console.log(formData.get('sortOrder') === "" ? data['sortOrder'] : formData.get('sortOrder'))
  console.log(formData.get('iconUrl') === "" ? data['iconUrl'] : formData.get('iconUrl'))
  
    // 추가 요청
    if (props.on === 1) {
      try {
        await axios({
          url: `/setting/menu?type=1`,
          method:'post',
          baseURL : 'http://localhost:8080',
          data:{
            parId: data['parId'],
            name: formData.get('name') === "" ? data['name'] : formData.get('name'),
            enabledYN:  formData.get('enabledYN') === null ? data['enabledYN'] : formData.get('enabledYN'),
            sortOrder:  formData.get('sortOrder') === "" ? data['sortOrder'] : formData.get('sortOrder'),
            iconUrl:  formData.get('iconUrl') === "" ? data['iconUrl'] : formData.get('iconUrl')
          }
        });
        console.log('insert done ...');
      } catch (error) {
          console.log('failed sending Data...');
      }
    }
    // 수정 요청
    if (props.on === 2) {
      try {
        await axios({
          url: `/setting/menu?type=2`,
          method:'post',
          baseURL : 'http://localhost:8080',
          data:{
            id:  data['id'],
            parId: data['parId'],
            name: formData.get('name') === "" ? data['name'] : formData.get('name'),
            enabledYN:  formData.get('enabledYN') === null ? data['enabledYN'] : formData.get('enabledYN'),
            sortOrder:  formData.get('sortOrder') === "" ? data['sortOrder'] : formData.get('sortOrder'),
            iconUrl:  formData.get('iconUrl') === "" ? data['iconUrl'] : formData.get('iconUrl')
          }
        });
        console.log('update doen ...');
      } catch (error) {
          console.log('failed sending Data...');
      }
    }
    /*
    // 이미지 데이터 보내기
    if (iconFile !== null && iconFile !== undefined){
      try {
        await axios({
          url: `/setting/menu/img`,
          method:'post',
          baseURL : 'http://localhost:8080',
          headers: { 'Content-Type': 'multipart/form-data' },
          data:{
            iconFile:  iconFile
          }
        });
        console.log(iconFile);
        console.log('successed sending img...');
      } catch (error) {
        console.log('failed sending img...');
      }
    } else {
      console.log('image is null');
    }
    
    */
  }

  useEffect (() => {
  if (props.value === undefined){
    setData(JSON.parse('[{"name":"", "sortOrder":""}]'));
  } else {
  setData(props.value);
  setIconFile(props.value['iconUrl']);
  }
  }, [props.value]);
  
  return (
    props.on &&
    <DetailDiv>
      <form onSubmit={loadData}>
        <div style={{display: 'flex', justifyContent:'space-between'}}> 
        <span>•대메뉴 정보</span><div style={{display: 'flex'}}><button type='submit'>저장</button> <hr /> <span onClick={props.api}>X</span></div>
        </div>
        <table>
          <tbody>
            <tr><td>메뉴명</td><td><input type='text' name='name' placeholder={data['name']} value={inputValue}
            onChange={(e) => {setInputValue(e.target.value);}}/> </td></tr>
            <tr><td>사용여부</td><td><div>
              <input className='radio' type='radio' value='1' name='enabledYN'/>사용
              <input className='radio'  type='radio' value='0' name='enabledYN'/>미사용</div></td></tr>
            <tr><td>정렬</td><td><input type='number' name='sortOrder' placeholder={data['sortOrder']} /></td></tr>
            <tr><td>아이콘(48*44)<MdOutlineRefresh /></td>
            <td style={{display: 'block'}}>
              <div id="DnDBox" onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDragOver={onDragOver} onDrop={onDrop} isDragging={isDragging}>
                <div style={{display: 'flex' }}>
                  <textarea name='iconUrl' value={iconFile} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDragOver={onDragOver} onDrop={onDrop} isDragging={isDragging}
                  style={{border: '1px solid rgb(171,172,178)', width:'calc(100% - 25px)', height:'25px', color:'rgb(171,172,178)', fontWeight: 'bold', fontSize: 'small', paddingTop: '4px'}}></textarea>
                  <label htmlFor="iconFile" className='iconFileInput'>
                    <AiOutlinePaperClip/>
                    <input type='file' id="iconFile" onChange={(e) => {setIconFile(e.target.files[0])}} style={{display: 'none'}}/>
                  </label>
                </div>
                <hr/>
                <IconImageList />
              </div>
            </td></tr>
          </tbody>
        </table>  
      </form>
    </DetailDiv>
  )
}

export function MenuDetail(props) {

  const loadData = async (e) => {
    e.preventDefault();
    console.log('in loadData : ', props.on);
    const formData = new FormData(e.target);

    console.log(formData.get('parId') === null ? props.value['parId'] : formData.get('parId'))
    console.log(formData.get('name') === "" ? props.value['name'] : formData.get('name'))
    console.log(formData.get('enabledYN') === null ? props.value['enabledYN'] : formData.get('enabledYN'))
    console.log(formData.get('sortOrder') === null ? props.value['sortOrder'] : formData.get('sortOrder'))
    console.log(formData.get('iconUrl') === null ? props.value['iconUrl'] : formData.get('iconUrl'))
  
    // 추가 요청
    if (props.on === 1) {
      try {
        await axios({
          url: `/setting/menu?type=3`,
          method:'post',
          baseURL : 'http://localhost:8080',
          data:{
            parId: 72, // 상위메뉴 만들기 전까지 고정
            name: formData.get('name') === "" ? props.value['name'] : formData.get('name'),
            enabledYN:  formData.get('enabledYN') === null ? props.value['enabledYN'] : formData.get('enabledYN'),
            sortOrder:  formData.get('sortOrder') === "" ? props.value['sortOrder'] : formData.get('sortOrder')
          }
        });
        console.log('insert done ...');
      } catch (error) {
          console.log('failed sending Data...');
      }
    }
    // 수정 요청
    if (props.on === 2) {
      try {
        await axios({
          url: `/setting/menu?type=4`,
          method:'post',
          baseURL : 'http://localhost:8080',
          data:{
            id:  props.value['id'],
            parId: formData.get('parId') === null ? props.value['parId'] : formData.get('parId'),
            name: formData.get('name') === "" ? props.value['name'] : formData.get('name'),
            enabledYN:  formData.get('enabledYN') === null ? props.value['enabledYN'] : formData.get('enabledYN'),
            sortOrder:  formData.get('sortOrder') === "" ? props.value['sortOrder'] : formData.get('sortOrder')
          }
        });
        console.log('update doen ...');
      } catch (error) {
          console.log('failed sending Data...');
      }
    }
  }

  return (
    props.on &&
    <DetailDiv>
      <form onSubmit={loadData}>
        <div style={{display: 'flex', justifyContent:'space-between'}}> 
          <span>•메뉴 정보</span><div style={{display: 'flex'}}><button type='submit'>저장</button> <hr /> <span onClick={props.api}>X</span></div>
        </div>
        <table>
          <tbody>
            <tr><td>상위메뉴</td><td><select><option>알림설정</option></select></td></tr>
            <tr><td>메뉴명</td><td><input name='name' type='text'placeholder={props.value['name']}/></td></tr>
            <tr><td>사용여부</td><td><div>
              <input className='radio' type='radio' value='1' name='enabledYN'/>사용
              <input className='radio'  type='radio' value='0'  name='enabledYN'/>미사용</div></td></tr>
            <tr><td>정렬</td><td><input type='number' name='sortOrder' placeholder={props.value['sortOrder']}/></td></tr>
          </tbody>
        </table>
      
      </form>
    </DetailDiv>
  )

}

export function TreeItem(props){
  console.log('treeitem : ', props.value, props.parId);
  return (
    <div>{props.value.map((a, i) => (
      props.parId===a['parId'] && a['id'] !== props.parId ? 
      <Item>{a['sub'] === 0 ? <AiOutlineFolderOpen /> : <AiOutlineFileText /> } {a['name']}
        <TreeItem value={props.value} parId={a['id']}/>
      </Item> : null
    ))}
    </div>
  )

}

export function IconImageList(){
  const [icon, setIcon] = useState([]);
//  console.log(icon);
useEffect(() => {
  axios({
    url: `/setting/menu/iconList`,
    method:'get',
    baseURL : 'http://localhost:8080',
  }).then(res => {
    console.log(res.data);
    setIcon(res.data);
  })
}, [])

  return(
    <IconDiv>
      {
      icon.map((a, i) => (
        <img src={a} alt='i' key={i}/>
      ))
      }      
    </IconDiv>
  )
}

export const IconDiv = styled.div`
overflow: scroll;
::-webkit-scroll: none;
height: 100%;
`;
export const Module = styled.div`
background-color: white;
border: 1px solid rgb(171,172,178);
width:95%;
height: 95%;
`
export const Nav = styled.div`
border-top: 5px solid rgb(20,136,247);
border-bottom: 1px solid grey;
display: flex;
color: black;
width: 100%;
justify-content: space-between;

> #title {
  margin: 10px;
  margin-left: 20px;
  font-size: large;
  font-weight: bold;
  color: rgb(32,35,44);
}
> #btn {
  display: flex;
  margin-top: 5px;
  > * {
    
    height: 30px;
    margin: 5px;
  }
  > svg {
    margin-top: 10px;
    width: 20px;
    height: 20px;
    color: gray;
  }
}
`;
export const Info = styled.div`
display: flex;
justify-content: center;

> div {
  margin: 10px;
  padding: 10px;
  padding-left:15px;
  width: 100%;
  background-color: rgb(214,236,248);
  border: 1px solid rgb(146,183,214);
  border-radius: 5px;

  color: black;
  height: 20px;
  font-weight: bold;
}
`;
export const Form = styled.div`
display: flex;
justify-content: flex-start;
width: 100%;
height: 100%;
margin-bottom: 10px;
`;
export const MenuTree = styled.div`
margin:10px;
height:75%;
background-color: white;
width: 400px;
border: 1px solid rgb(171,172,178);
color: black;
`;
export const SearchTree = styled.form`
padding: 5px;
height: 100px;
background-color: rgb(240,245,248);
border-bottom: 1px solid rgb(171,172,178);
color: black;
> select {
  width:170px;
  height:25px;
  margin: 5px;
  margin-left: 10px;
}
> input {
  width: 320px;
  height: 20px;
  margin: 5px;
  margin-left: 10px;
}
> svg {
  width: 20px;
  height: 20px;
}

> div {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin: 5px;

  > span {
    font-size: small;
  }
  > select {
    font-weight: bold;
    position: relative;
    border: none;
    background-color: rgb(240,245,248);
    text-align: right;
    > option {
      background-color: white;
    }
  }
}
`
export const Item = styled.div`
margin-left: 10px;
margin-top: 5px;
`;
export const DetailDiv = styled.div`
margin: 10px;
color: black;
weight: 610px;
height: 75%;
> form > div {

> span {
  font-weight: bold;
  margin-bottom: 10px;
  }
  > div > * {
    margin: 5px;
  }
}
> form {
  height: 100%;
> table {
  border-top: 2px solid black;
  border-collapse: collapse;
  height: 95%;
  
  > tbody{
    > tr {  
      border-bottom: 1px solid rgb(171,172,178);
        > td:nth-child(1) {
          background-color: rgb(240,245,248);
        font-weight: bold;
        text-align: right;
        padding-right: 10px;
        width:150px;
        }
        > td:nth-child(2) {
          width:400px;
          margin: 10px;
          display: flex;
          > input {
            width: 100%;
            height: 25px;
          }   
          > div {
            > #iconFile {
              display: none;
            }
            > .iconFileInput > svg{
              width: 25px;
              height: 25px;
              margin: 5px;
            }
  
          }  

        }
      }
      > tr > td > #DnDBox {
        width: 400px;
        height: 300px;
        
        > div {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          > img {
            width: 40px;
            height: 40px;
            padding : 5px;
            margin: 5px;
            border: 1px solid rgb(171,172,178);
          }
        }
      }
      > :nth-child(4) {
        height: 100%;
      }
    }
  }
}

`;
export const ListBox = styled.div`
display: flex;
justify-content: center;
background-color: rgb(240,245,248);
border: 1px solid rgb(171,172,178);
border-top: 3px solid gray;
margin: 10px;
paddig: 10px;
width: 250px;
height: 75%;
> div {
  display: block;
  
  width: 220px;
  height: 90%;
  overflow: scroll;
  &::-webkit-scrollbar{
      display:none;
  }  
  > div > img {
    margin: 7px;
    width: 40px;
    height: 40px;
  }
}
`;
  export const MenuItem = styled.div`
margin-top:5px;

display: flex;
justify-content: flex-start;

height: 50px;

background-color: white;
border: 1px solid rgb(171,172,178);
color: black;

padding: 10px;

text-align: center;
font-size: medium;
> #menuitemname {
  padding-top: 5%;
}
`;