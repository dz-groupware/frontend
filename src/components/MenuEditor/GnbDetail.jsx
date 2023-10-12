import { useEffect, useState } from 'react';

import styled from 'styled-components';
import Swal from 'sweetalert2';

import { AiOutlinePaperClip } from 'react-icons/ai';
import { MdOutlineRefresh } from 'react-icons/md';

import { saveMenuAPI, deleteMenuApi, saveIconAPI } from '../../api/menu';
import IconImageList from './IconImageList';

import { ButtonBright, ButtonBlue } from '../../common/styles/Button';

export default function GnbDetail({ pageId, value, detailOff, on, setReRender }) {

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

  const [iconRender, setIconRender] = useState(true);
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
  };
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
    
  };
  const deleteMenu = () => {
    try{
      deleteMenuApi(pageId, detail.id).then(() => {
        setReRender(true);
      });
      detailOff();  
      Swal.fire({
        text: "완료되었습니다.",
        icon: 'success',
      });        
    } catch (error) {
      Swal.fire({
        text: "저장에 실패하였습니다.",
        icon: 'cancle',
      }); 
    }
  };
  const handleRadio = (e) => {
    setDetail({ ...detail, enabledYn: e.target.value === "true"});
  };

  useEffect (() => {
    // console.log('value -> detail : ', value);
    setDetail({ 
      id: value['id'], 
      parId: value['id'], 
      name: value['name'], 
      enabledYn: value['enabledYn'] === 1 || value['enabledYn'] === true, 
      sortOrder: value['sortOrder'], 
      iconUrl: value['iconUrl'].length < path.length ? (path+prefix+value['iconUrl']) : value['iconUrl'], 
    })
  }, [value]);
  
  return (
    on &&
    <DetailDiv>
      <DetailTitle> 
        <p>• 대메뉴 정보</p>
        <div>
          <ButtonBlue onClick={updateMenu}>저장</ButtonBlue>
          <ButtonBright onClick={deleteMenu}>삭제</ButtonBright>
          <Pipe />
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
            <td>아이콘(48*44)<MdOutlineRefresh onClick={() => {setIconRender(true)}}/></td>
          <td className='dndBox'>
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
              <IconImageList 
              pageId={pageId}
              newIconFile={newIconFile} 
              newIconUrl={newIconUrl}
              iconUrl={detail.iconUrl}
              detail={detail} 
              setDetail={setDetail}
              iconRender={iconRender} 
              setIconRender={setIconRender}/>
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


const DetailDiv = styled.div`
margin: 10px 10px 15px 10px;
color: black;
min-width: 450px;
width: calc(100% - 710px);
height: calc(100% - 35px);
> table {
  width: 100%;
  height: calc(100% - 150px);
  border: 1px solid #1d2437;
  border-top: 2px solid #1d2437;
  border-collapse: collapse;
  box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
            outline: none;
  > tbody {
    > tr {     
      > td:nth-child(1) {
        width: 150px;
        height: 34px;
        padding-right: 10px;
        background-color: #f2f3f6;
        border-bottom: 1px solid #e3e8ed;
        font-weight: bold;
        text-align: right;
        vertical-align: middle;
      }
      > td:nth-child(2) {
        width: calc(100% - 20px);
        height: 35px;
        padding: 5px 5px 5px 15px;
        margin: 1px;
        display: flex;
        background-color: white;
        border-bottom: 1px solid #e3e8ed;
        vertical-align: middle;
        > input {
          padding-left: 5px;
          width: 100%;
          height: 25px;
        }   
      }
    }
    > tr:nth-child(4) > td {
      height: 100%;
      border-bottom: 1px solid #1d2437;
    }
  }
}
`;
const DetailTitle = styled.div`
display: flex;
justify-content: space-between;
font-weight: bold;
> p {
  margin-top: 5px;
  font-size: large;
  font-weight: 600;
}
> div {
  display: flex;
  height: 35px;
  > div {
    margin: 5px;
  }
  > span {
    font-size: 24px;
    margin-top: 5px;
  }
}
`;
const DnDBox = styled.div`
width: 100%;
height: 100%;
> div {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  > textarea {
    padding-left: 5px;
    border: 1px solid #1d2437;
    width: calc(100% - 35px);
    height: 25px;
    color: #1d2437;
    font-weight: bold;
    font-size: small;
    padding-top: 4px;  
    resize: none;
  }
  > label {
    > svg {
      margin-left: 5px;
      width: 30px;
      height: 30px;
    }
    > input {
      display: none;
    }
  }
}
`;
const Pipe = styled.div`
width: 2px;
height: 70%;
background-color: black;
`;