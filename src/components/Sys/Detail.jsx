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
  const [data, setData] = useState([]);
  const [iconUrl, setIconUrl] = useState("");
  const [newIcon, setNewIcon] = useState("");
  const [newIconFile, setNewIconFile] = useState("");
  const [saveIconFile, setSaveIconFile] = useState("");
  const [inputValue, setInputValue] = useState("");

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
    setIconUrl(path+e.dataTransfer.files[0]['name']);
    setIsDragging(false);
    setNewIcon(path+e.dataTransfer.files[0]['name']);
    readImage(e.dataTransfer.files[0]);
    setSaveIconFile(e.dataTransfer.files[0]);
  };
  const loadData = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    console.log(props.on);
    // 추가 요청
    if (props.on === 1) {
      try {
        formData.set('iconUrl', path+formData.get('iconUrl'));
        await saveMenuAPI(formData, data, '1', props.compId);
        console.log('insert done ...');
      } catch (error) {
        console.log('failed sending Data...');
      }
    }
    // 수정 요청
    if (props.on === 2) {
      try {
        formData.set('iconUrl', path+formData.get('iconUrl'));
        await saveMenuAPI(formData, data, '2', props.compId);
        console.log('update doen ...');
      } catch (error) {
        console.log('failed sending Data...');
      }
    }

    if (newIcon !== "") {
      let formData = new FormData();
      formData.append('images', saveIconFile);

      axiosInstance.post(
        `/s3/img`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      ).then(setNewIcon(""));
    }
  }

  useEffect (() => {
    if (props.value === undefined){
      setData(JSON.parse('[{"name":"", "sortOrder":""}]'));
    } else {
    setData(props.value);
    setIconUrl(props.value['iconUrl']);
    }
  }, [props.value]);
  
  return (
    props.on &&
    <DetailDiv>
      <form onSubmit={loadData}>
        <DetailTitle> 
          <span>•대메뉴 정보</span>
          <div>
            <button type='submit'>저장</button>
            <hr /> 
            <span onClick={props.api}>X</span>
          </div>
        </DetailTitle>
        <table>
          <tbody>
            <tr>
              <td>메뉴명</td>
              <td>
                <input type='text' name='name' placeholder={data['name']} value={inputValue} onChange={(e) => {
                  setInputValue(e.target.value);
                  }}/>
              </td>
            </tr>
            <tr>
              <td>사용여부</td>
              <td>
                <div>
                  <input className='radio' type='radio' value='1' name='enabledYN' checked/>사용
                  <input className='radio'  type='radio' value='0' name='enabledYN'/>미사용
                </div>
              </td>
            </tr>
            <tr>
              <td>정렬</td>
              <td>
                <input type='number' name='sortOrder' placeholder={data['sortOrder']} />
              </td>
            </tr>
            <tr>
              <td>아이콘(48*44)<MdOutlineRefresh /></td>
            <td style={{display: 'block'}}>
              <DnDBox onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDragOver={onDragOver} onDrop={onDrop} isDragging={isDragging}>
                <div>
                  <textarea name='iconUrl' onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDragOver={onDragOver} onDrop={onDrop} isDragging={isDragging}
                   value={iconUrl === undefined || iconUrl === "" || iconUrl.length < path.length ? iconUrl : iconUrl.slice(path.length)} onChange={() => {}} ></textarea>
                  <label htmlFor="iconFile" className='iconFileInput'>
                    <AiOutlinePaperClip/>
                    <input type='file' id="iconFile" onChange={(e) => setIconUrl(e.target.files[0]['name'])}/>
                  </label>
                </div>
                <hr/>
                <IconImageList newIcon={newIcon} newIconFile={newIconFile} iconUrl={iconUrl} setIconUrl={setIconUrl}/>
              </DnDBox>
            </td></tr>
          </tbody>
        </table>  
      </form>
    </DetailDiv>
  );
}

export function MenuDetail(props) {

  const [value, setValue] = useState();
  const [modalOn, setModalOn] = useState(false);
  const loadData = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // 추가 요청
    if (props.on === 1) {
      try {
        await saveMenuAPI(formData, props.value, '3', props.compId);
        console.log('insert done ...');
      } catch (error) {
        console.log('failed sending Data...');
      }
    }
    // 수정 요청
    if (props.on === 2) {
      console.log('formData : ', formData);
      console.log('props.value : ', props.value);
      console.log('type : 4');
      console.log('props.compId : ', props.compId);

      try {
        await saveMenuAPI(formData, props.value, '4', props.compId);
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
        <DetailTitle> 
          <span>•메뉴 정보</span>
          <div>
            <button type='submit'>저장</button>
            <hr /> 
            <span onClick={props.api}>X</span>
          </div>
        </DetailTitle>
        <table>
          <tbody>
            <tr>
              <td>상위메뉴</td>
              <td>
                <textarea value={value === undefined ? "" : value['name']} onClick={() => {setModalOn(true)}}></textarea>
                <textarea name='parId' value={value === undefined ? "" : value['id']} style={{display: 'none'}}></textarea>
                <textarea name='id' value={props.value === undefined ? "" : props.value['id']} style={{display: 'none'}}></textarea>
              </td>
            </tr>
            <tr>
              <td>메뉴명</td>
              <td>
                <input name='name' type='text'placeholder={props.value['name']}/>
              </td>
            </tr>
            <tr>
              <td>사용여부</td>
              <td>
                <div>
                  <input className='radio' type='radio' value='1' name='enabledYN'/>사용
                  <input className='radio'  type='radio' value='0'  name='enabledYN'/>미사용
                </div>
              </td>
            </tr>
            <tr>
              <td>정렬</td>
              <td>
                <input type='number' name='sortOrder' placeholder={props.value['sortOrder']}/>
              </td>             
            </tr>
          </tbody>
        </table>
      </form>
      {modalOn && <MenuTree setModalOn={setModalOn} setValue={setValue} />}
    </DetailDiv>
  );

}

export const DetailDiv = styled.div`
margin: 10px;
color: black;
min-width: 450px;
width: calc(100% - 700px);
height: calc(100% - 151px);
> form > div {

  > span {
    font-weight: bold;
    margin-bottom: 10px;
    }
    > div > * {
      margin: 5px;
      height: 20px;
    }
  }
  > form {
    height: 100%;
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
      }

      > :nth-child(4) {
        height: 100%;
      }
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