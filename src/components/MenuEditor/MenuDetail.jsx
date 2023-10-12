import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { saveMenuAPI, deleteMenuLnbApi } from '../../api/menu';
import MenuTree from './MenuTree';
import { ButtonBright, ButtonBlue } from '../../common/styles/Button';


export default function MenuDetail({ pageId, value, detailOff, on, setReRender, page }) {
  const initValue = {
    id: 0,
    parId: 0,
    name: '',
    parName: '상위메뉴 선택 필수', 
    enabledYn: true,
    sortOrder: 0,
    pageId: 0,
  }
  const [detail, setDetail] = useState(initValue);  
  const [modalOn, setModalOn] = useState(false);

  const updateMenu = async () => {
    console.log(detail.parId);
    if (detail.parId === null || detail.parId === "" || detail.parId === "0" || detail.parId === 0 ) {
      Swal.fire({
        text: "양식을 지켜주세요",
        icon: 'cancle'
      }); 
    } else {
      try {
        const menu = new FormData();
        menu.set('id', detail.id);
        menu.set('parId', detail.parId);
        menu.set('name', detail.name);
        menu.set('enabledYn', detail.enabledYn);
        menu.set('sortOrder', detail.sortOrder);
        menu.set('pageId', detail.pageId);
        await saveMenuAPI(pageId, menu, ((on)+2));
      } catch (error) {
        Swal.fire({
          text: "저장에 실패하였습니다.",
          icon: 'cancle'
        }); 
      };
    };
  };
  const handleRadio = (e) => {
    setDetail({ ...detail, enabledYn: e.target.value === "true"});
  };
  const handleParMenu = (value) => {
    console.log(value);
    setDetail({ ...detail, parId: value['id'], parName: value['name'] });
  };
  const deleteMenu = () => {
    try{
      deleteMenuLnbApi(pageId, detail.id);
      setReRender(true);
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

  return (
    on &&
    <DetailDiv>
      <DetailTitle> 
        <p> • 메뉴 정보</p>
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
            <td>상위메뉴</td>
            <td>
              <textarea value={detail.parName === undefined || detail.parName === "" ? "상위메뉴 선택 필수" : detail.parName} onClick={() => {setModalOn(true)}} readOnly></textarea>
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
                    <option value={a['id']} key={'option'+i}>
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
          <tr className='iconList'>
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



const DetailDiv = styled.div`
margin: 10px 10px 15px 10px;
color: black;
min-width: 450px;
width: calc(100% - 710px);
height: calc(100% - 151px);
> table {
  border-top: 2px solid black;
  border-collapse: collapse;
  width: 100%;
  height: calc(100% - 35px);
  box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
            outline: none;
  > tbody {
    > tr {  
      border-bottom: 1px solid #1d2437;
      height: 35px;
      > td:nth-child(1) {
        background-color: #f2f3f6;
      font-weight: bold;
      text-align: right;
      vertical-align: middle;
      padding-right: 10px;
      width:150px;
      }
      > td:nth-child(2) {
        width: calc(100% - 20px);
        margin: 10px;
        display: flex;
        vertical-align: middle;
        > input {
          padding-left: 5px;
          width: 100%;
          height: 25px;
        }   
        > div {
          vertical-align: middle;
          > #iconFile {
            display: none;
          }
          > .iconFileInput > svg{
            width: 25px;
            height: 25px;
            margin: 5px;
          }
          > input.radio {
            margin: 5px;
          }
        }  
        > textarea {
          padding: 5px;
          width: 100%;
          height: 25px;
          resize: none;
        }
        > select {
          padding-left: 5px;
          width: 100%;
          height: 25px;
        }
        &.dndBox {
          height: 100%;
        }
      }
      > td {
        > .readOnly{
          display: none;
        }
      }
    }
    > :nth-child(5) {
      height: 100%;
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
  font-weight: 500;
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
const Pipe = styled.div`
width: 2px;
height: 70%;
background-color: black;
`;