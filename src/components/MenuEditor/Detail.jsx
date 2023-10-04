import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { AiOutlinePaperClip } from 'react-icons/ai';
import { MdOutlineRefresh } from 'react-icons/md';

import { saveMenuAPI, deleteMenuApi, deleteMenuLnbApi, saveIconAPI } from '../../api/menu';
import IconImageList from './IconImageList';
import MenuTree from './MenuTree';

export function GnbDetail({ pageId, value, detailOff, on, setReRender }) {

  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const initValue = {
    id: '',
    parId: '',
    name: '',
    enabledYn: '',
    sortOrder: '',
    iconUrl: '',
  };
  const [detail, setDetail] = useState(initValue);

  const [newIconFile, setNewIconFile] = useState("");
  const [newIconUrl, setNewIconUrl] = useState("");

  const path = 'https://dz-test-image.s3.ap-northeast-2.amazonaws.com/';
  const prefix = 'icon/';

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
  const readImage = (image) => {

    const reader = new FileReader();
    reader.onload = function(e) {
      setNewIconUrl(e.target?.result);
    };
    reader.readAsDataURL(image);
  }
  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if ((e.dataTransfer.files[0] instanceof Blob)) {
      console.error('image is not a Blob');
      readImage(e.dataTransfer.files[0]);
      setNewIconFile(e.dataTransfer.files[0]);
      setDetail({ ...detail, iconUrl: path+prefix+e.dataTransfer.files[0]['name']});
    }
  };

  const updateMenu = async () => {
    const menu = new FormData();
    try {
      for (const key in detail) {
        if (detail.hasOwnProperty(key)) {
          console.log(key, "::", detail[key]);
          menu.set(key, detail[key]);
        }
      }
      await saveMenuAPI(pageId, menu, on);
    } catch (error) {
      console.log('failed insert...');
      setErrorMessage("다시 시도해주세요. (메뉴 수정/저장 실패)");
    }

    try{
      if (newIconFile !== "") {
        let formData = new FormData();
        formData.append('images', newIconFile);

        console.log('before upload : ', newIconFile['name']);
        saveIconAPI(pageId, formData).then(res => setNewIconFile(""));
      }
    } catch (error) {
      console.log("fail to upload image ...");
      setErrorMessage("다시 시도해주세요. (이미지 추가 실패)");
    } finally {
      setReRender(true);
    }
    
  }

  console.log(newIconFile);
  useEffect (() => {
    console.log('value -> detail : ', value);
    setDetail({ 
      id: value['id'], 
      parId: value['id'], 
      name: value['name'], 
      enabledYn: value['enabledYn'] === 1 || value['enabledYn'] === true, 
      sortOrder: value['sortOrder'], 
      iconUrl: value['iconUrl'].length < path.length ? (path+prefix+value['iconUrl']) : value['iconUrl'], 
    })
  }, [value]);
  
  const deleteMenu = () => {
    deleteMenuApi(pageId, detail.id);
    setReRender(true);
    detailOff();
  }
  
  const handleRadio = (e) => {
    setDetail({ ...detail, enabledYn: e.target.value === "true"});
  };

  console.log('detail : ', detail);

  return (
    on &&
    <DetailDiv>
      <DetailTitle> 
        <span>•대메뉴 정보</span>
        <div>
          <div onClick={deleteMenu}>삭제</div>
          <div onClick={updateMenu}>저장</div>
          <hr /> 
          <span onClick={detailOff}>X</span>
        </div>
      </DetailTitle>
      <table>
        <tbody>
          <tr>
            <td>메뉴명</td>
            <td>
              <input 
              type='text' 
              value={detail.name} 
              onChange={(e) => {
                setDetail({ ...detail, name: e.target.value });
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
                  value='true'
                  checked={detail.enabledYn === true}
                  onClick={handleRadio}
                />사용
                <input 
                  className='radio' 
                  type='radio' 
                  value='false'
                  checked={detail.enabledYn === false}
                  onClick={handleRadio}
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
              value={detail.sortOrder}
              onChange={(e) => setDetail({ ...detail, sortOrder: e.target.value })}
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
                value={detail.iconUrl === undefined || detail.iconUrl === "" || detail.iconUrl.length < path.length ? "not found" : detail.iconUrl.slice(path.length+prefix.length)} 
                onChange={() => {}} readOnly></textarea>
                <label htmlFor="iconFile" className='iconFileInput'>
                  <AiOutlinePaperClip/>
                  <input 
                  type='file' 
                  id="iconFile" 
                  onChange={(e) => {
                    readImage(e.target.files[0]);
                    setNewIconFile(e.target.files[0]);
                    setDetail({ ...detail, iconUrl: path+prefix+e.target.files[0]['name']});
                    setNewIconUrl(path+prefix+e.target.files[0]['name']);
                    }}/>
                </label>
              </div>
              <hr/>
              <IconImageList 
              pageId={pageId}
              newIconFile={newIconFile} 
              newIconUrl={newIconUrl}
              iconUrl={detail.iconUrl}
              detail={detail} 
              setDetail={setDetail}/>
            </DnDBox>
          </td>
        </tr>
      </tbody>
    </table> 
    {errorMessage && (
        <div>
          {errorMessage}
        </div>
      )} 
    </DetailDiv>
  );
}

export function MenuDetail({ pageId, value, detailOff, on, setReRender, page }) {
  const initValue = {
    id: 0,
    parId: 0,
    name: '',
    parName: '', 
    enabledYn: true,
    sortOrder: 0,
    pageId: 0,
  }
  const [detail, setDetail] = useState(initValue);  
  const [modalOn, setModalOn] = useState(false);

  console.log('detail : ', detail);
  const updateMenu = async () => {
    const menu = new FormData();
    try {
      menu.set('id', detail.id);
      menu.set('parId', detail.parId === "" ? 0 : detail.parId);
      menu.set('name', detail.name);
      menu.set('enabledYn', detail.enabledYn);
      menu.set('sortOrder', detail.sortOrder);
      menu.set('pageId', detail.pageId);
      await saveMenuAPI(pageId, menu, ((on)+2));
    } catch (error) {
      console.log('failed insert...');
    }
  }

  const handleRadio = (e) => {
    setDetail({ ...detail, enabledYn: e.target.value === "true"});
  };

  useEffect (() => {
    setDetail({ 
      id: value.id || 0,
      parId: value.parId || 0,
      name: value.name || '',
      parName: value.parName || '',
      enabledYn: value.enabledYn || true,
      sortOrder: value.sortOrder || 0,
      pageId: value.pageId || 1,
    })
  }, [value]);
  
  const handleParMenu = (value) => {;
    setDetail({ ...detail, parId: value['id'], parName: value['name'] });
  }

  const deleteMenu = () => {
    deleteMenuLnbApi(pageId, detail.id);
    setReRender(true);
    detailOff();
  }

  return (
    on &&
    <DetailDiv>
      <DetailTitle> 
        <span>•메뉴 정보</span>
        <div>
          <button onClick={deleteMenu}>삭제</button>
          <button onClick={updateMenu}>저장</button>
          <hr /> 
          <span onClick={detailOff}>X</span>
        </div>
      </DetailTitle>
      <table>
        <tbody>
          <tr>
            <td>상위메뉴</td>
            <td>
              <textarea value={detail.parName === undefined ? "" : detail.parName} onClick={() => {setModalOn(true)}} readOnly></textarea>
              <textarea className='readOnly' value={detail.parId === undefined ? "" : detail.parId} readOnly></textarea>
              <textarea className='readOnly' value={detail.id === undefined ? "" : detail.id} readOnly></textarea>
            </td>
          </tr>
          <tr>
            <td>메뉴명</td>
            <td>
              <input 
              name='name' 
              type='text' 
              value={detail.name} 
              onChange={(e) => {
                setDetail({ ...detail, name:e.target.value });
              }}/>
            </td>
          </tr>          
          <tr>
            <td>기본페이지</td>
            <td>
              <select onChange={(e) => {setDetail({ ...detail, pageId: e.target.value})}}>
                {
                  page.map((a, i) => (
                    <option value={a['id']}>
                      {a['name']}
                    </option>
                  ))
                }
              </select>
            </td>
          </tr>
          <tr>
            <td>사용여부</td>
            <td>
              <div>
                <input 
                  className='radio' 
                  type='radio' 
                  value='true'
                  checked={detail.enabledYn === true}
                  onChange={handleRadio}
                />사용
                <input 
                  className='radio' 
                  type='radio' 
                  value='false'
                  checked={detail.enabledYn === false}
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
              value={detail.sortOrder}
              onChange={(e) => setDetail({ ...detail, sortOrder: e.target.value })}
              />
            </td>             
          </tr>
        </tbody>
      </table>
      {modalOn && <MenuTree pageId={pageId} setModalOn={setModalOn} handleParMenu={handleParMenu}/>}
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