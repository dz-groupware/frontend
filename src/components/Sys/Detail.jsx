import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { AiOutlinePaperClip } from 'react-icons/ai';
import { MdOutlineRefresh } from 'react-icons/md';

import { saveMenuAPI, deleteMenuApi } from '../../api/menu';
import IconImageList from './IconImageList';
import MenuTree from './MenuTree';
import { axiosInstance } from '../../utils/axiosInstance';

export function GnbDetail(props) {
  const [isDragging, setIsDragging] = useState(false);
  
  const [menuId, setMenuId] = useState("");
  const [parId, setParId] = useState("");
  const [menuName, setMenuName] = useState("");
  const [enabledYN, setEnabledYn] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [newIconFile, setNewIconFile] = useState("");

  const path = 'https://dz-test-image.s3.ap-northeast-2.amazonaws.com/';

  const readImage = (image) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      setNewIconFile(String(e.target?.result));
    };
    reader.readAsDataURL(image);
  }
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
    setIsDragging(false);
    readImage(e.dataTransfer.files[0]);
    setNewIconFile(e.dataTransfer.files[0]);
    setIconUrl(path+e.dataTransfer.files[0]['name']);
  };

  const updateMenu = async () => {
    const menu = new FormData();
    try {
      menu.set('id', menuId);
      menu.set('parId', menuId);
      menu.set('name', menuName);
      menu.set('enabledYN', enabledYN);
      menu.set('sortOrder', sortOrder);
      menu.set('iconUrl', path+iconUrl);
      await saveMenuAPI(menu, props.on);
      console.log('insert done ...');
    } catch (error) {
      console.log('failed insert...');
    }

    if (newIconFile !== "") {
      let formData = new FormData();
      formData.append('images', newIconFile);

      axiosInstance.post(
        `/s3/img`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      ).then(setNewIconFile(""));
    }
  }

  useEffect (() => {
    setMenuId(props.value['id']);
    setParId(props.value['parId']);
    setMenuName(props.value['name']);
    setEnabledYn(props.value['enabledYN']);
    setSortOrder(props.value['sortOrder']);
    setIconUrl(props.value['iconUrl']);
  }, [props.value]);
  
  const deleteMenu = () => {
    deleteMenuApi(menuId);
  }
  
  const handleRadio = (e) => {
    setEnabledYn(e.target.value);
  };

//  console.log('gnb detail : ', menuName, menuId, enabledYN, sortOrder, iconUrl);
  return (
    props.on &&
    <DetailDiv>
      <DetailTitle> 
        <span>•대메뉴 정보</span>
        <div>
          <div onClick={deleteMenu}>삭제</div>
          <div onClick={updateMenu}>저장</div>
          <hr /> 
          <span onClick={props.detailOff}>X</span>
        </div>
      </DetailTitle>
      <table>
        <tbody>
          <tr>
            <td>메뉴명</td>
            <td>
              <input 
              type='text' 
              value={menuName} 
              onChange={(e) => {
                setMenuName(e.target.value);
              }}/>
            </td>
          </tr>
          <tr>
            <td>사용여부</td>
            <td>
              <div>
                <input 
                  className='radio' 
                  type='radio' 
                  value='1'
                  checked={enabledYN === 1 || enabledYN === '1'}
                  onChange={handleRadio}
                />사용
                <input 
                  className='radio' 
                  type='radio' 
                  value='0'
                  checked={enabledYN === 0 || enabledYN === '0'}
                  onChange={handleRadio}
                />미사용
              </div>
            </td>
          </tr>
          <tr>
            <td>정렬</td>
            <td>
              <input 
              type='number' 
              placeholder='숫자가 작을수록 위에 보입니다' 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>아이콘(48*44)<MdOutlineRefresh /></td>
          <td>
            <DnDBox
            onDragEnter={onDragEnter} 
            onDragLeave={onDragLeave} 
            onDragOver={onDragOver} 
            onDrop={onDrop} 
            isDragging={isDragging}>
              <div>
                <textarea 
                name='iconUrl' 
                value={iconUrl === undefined || iconUrl === "" || iconUrl.length < path.length ? iconUrl : iconUrl.slice(path.length-5)} 
                onChange={() => {}} ></textarea>
                <label htmlFor="iconFile" className='iconFileInput'>
                  <AiOutlinePaperClip/>
                  <input 
                  type='file' 
                  id="iconFile" 
                  onChange={(e) => newIconFile(e.target.files[0])}/>
                </label>
              </div>
              <hr/>
              <IconImageList 
              newIconFile={newIconFile} 
              iconUrl={iconUrl} 
              setIconUrl={setIconUrl}/>
            </DnDBox>
          </td>
        </tr>
      </tbody>
    </table>  
    </DetailDiv>
  );
}

export function MenuDetail(props) {
  const [menuId, setMenuId] = useState("");
  const [menuName, setMenuName] = useState("");
  const [parId, setParId] = useState("");
  const [parName, setParName] = useState("");
  const [enabledYN, setEnabledYn] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  
  const [modalOn, setModalOn] = useState(false);

  const updateMenu = async () => {
    const menu = new FormData();
    try {
      menu.set('id', menuId);
      menu.set('parId', parId === "" ? 0 : parId);
      menu.set('name', menuName);
      menu.set('enabledYN', enabledYN);
      menu.set('sortOrder', sortOrder);
      await saveMenuAPI(menu, ((props.on)+2));
      console.log('insert done ...');
    } catch (error) {
      console.log('failed insert...');
    }
  }

  const handleRadio = (e) => {
    setEnabledYn(e.target.value);
  };

  useEffect (() => {
    setMenuId(props.value['id']);
    setParId(props.value['parId']);
    setMenuName(props.value['name']);
    setEnabledYn(props.value['enabledYN']);
    setSortOrder(props.value['sortOrder']);
    setParName(props.value['parName']);
  }, [props.value]);
  
  const handleParMenu = (value) => {;
    setParId(value['id']);
    setParName(value['name']);
  }

  return (
    props.on &&
    <DetailDiv>
      <DetailTitle> 
        <span>•메뉴 정보</span>
        <div>
          <button onClick={updateMenu}>저장</button>
          <hr /> 
          <span onClick={props.detailOff}>X</span>
        </div>
      </DetailTitle>
      <table>
        <tbody>
          <tr>
            <td>상위메뉴</td>
            <td>
              <textarea value={parName === undefined ? "" : parName} onClick={() => {setModalOn(true)}} readOnly></textarea>
              <textarea className='readOnly' value={parId === undefined ? "" : parId} readOnly></textarea>
              <textarea className='readOnly' value={menuId === undefined ? "" : menuId} readOnly></textarea>
            </td>
          </tr>
          <tr>
            <td>메뉴명</td>
            <td>
              <input 
              name='name' 
              type='text' 
              value={menuName} 
              onChange={(e) => {
                setMenuName(e.target.value);
              }}/>
            </td>
          </tr>
          <tr>
            <td>사용여부</td>
            <td>
              <div>
                <input 
                  className='radio' 
                  type='radio' 
                  value='1'
                  checked={enabledYN === 1 || enabledYN === '1'}
                  onChange={handleRadio}
                />사용
                <input 
                  className='radio' 
                  type='radio' 
                  value='0'
                  checked={enabledYN === 0 || enabledYN === '0'}
                  onChange={handleRadio}
                />미사용
              </div>
            </td>
          </tr>
          <tr>
            <td>정렬</td>
            <td>
              <input 
              type='number' 
              placeholder='숫자가 작을수록 위에 보입니다' 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              />
            </td>             
          </tr>
        </tbody>
      </table>
      {modalOn && <MenuTree setModalOn={setModalOn} handleParMenu={handleParMenu}/>}
    </DetailDiv>
  );

}

export const DetailDiv = styled.div`
margin: 10px;
color: black;
min-width: 450px;
width: calc(100% - 700px);
height: calc(100% - 151px);
> div {
  > span {
    font-weight: bold;
    margin-bottom: 10px;
    }
    > div > * {
      margin: 5px;
      height: 20px;
    }
  }

> table {
  border-top: 2px solid black;
  border-collapse: collapse;
  height: calc(100% - 30px);
  width: 100%;
    
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
        width: calc(100% - 20px);
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
      > td {
        > .readOnly{
          display: none;
        }
      }
    }
    > :nth-child(4) {
      height: 100%;
    }
  }
}
`;

export const DetailTitle = styled.div`
display: flex;
justify-content: space-between;
> div {
  display: flex;
}
`;

const DnDBox = styled.div`
width: 400px;
height: 200px;
        
> div {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 5px;
  width: 100%;

  > img {
    width: 40px;
    height: 40px;
    padding : 5px;
    margin: 5px;
    border: 1px solid rgb(171,172,178);
  }

  > textarea {
    border: 1px solid rgb(171,172,178);
    width: calc(100% - 30px);
    height: 25px;
    color: rgb(171,172,178);
    font-weight: bold;
    font-size: small;
    padding-top: 4px;  
  }

  > label {
    > svg {
    width: 30px;
    height: 30px;
    }

    > input {
      display: none;
    }
  }
}
`;