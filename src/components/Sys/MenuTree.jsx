//import { useEffect, useState } from 'react';
import styled from 'styled-components';

//import { searchAllMenuAPI } from '../../utils/API';
//import { useSelector } from 'react-redux';

export default function MenuTree(props) {
    /*
  const [menuTree, setMenuTree] = useState(JSON.parse('[{"":""}]'));
  const compId = useSelector(state => state.gnbMenu.compId);

  useEffect(() => {
    searchAllMenuAPI(compId).then(res => {
      setMenuTree(res.data.data);
    });
  // api로 값 받아와서 저장.
  }, [compId]);

  console.log(menuTree);
*/
  return (
    <>
    <ModalBackdrop onClick={() => {props.selectMenu("")}}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <div style={{width: '500px', height: '500px', display: 'block'}}>
          <h3>검색창</h3><span onClick={() => {props.selectMenu("")}}>x</span>
          <div style={{width: '100%', height: '400px', backgroundColor: 'rgb(240,237, 250', overflow:'scroll'}}>
            
          </div>
        </div>
      </ModalView>
    </ModalBackdrop>
    </>
  );
}

export function MenuItem(props) {
  console.log('menuItem : ', props.data);
  return (
    <>
    { props.data.length > 1 &&
      props.data.map((a, i) => {
        if (a['id'] === a['parId']) {
          console.log('menuItem : ', a['id'], a['name'], i);
          return (
            <div style={{marginLeft: '20px'}} onClick={() => {props.selectMenu(a['name'])}}>
              {a['name']}
                <Menu data={props.data} parId={a['id']} selectMenu={props.seletedMenu}/>
            </div>
          );
        }
        return null;
      })
    }
    </>
  )    
}

export function Menu(props) {
  
  return (
    <>{ props.data.length > 1 &&
      props.data.map((a, i) => {
        if (a['parId'] === props.parId && a['id'] !== a['parId']) {
          console.log('menu : ', props.parId, a['id'], a['name'], i);
            return (
              <div style={{marginLeft: '20px'}} onClick={() => {props.selectMenu(a['name'])}}>
                {a['name']}
                <Menu data={props.data} parId={a['id']}/>
              </div>
            );
          }
        return null;
        })
      }
    </>
  )
}

export const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1; //위치지정 요소
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
  width:100%;
  height:100%;
`;
export const ModalView = styled.div`
  // Modal창 CSS를 구현합니다.
  display: flex;
  position: relative;
  top:-150px;
  right:-200px;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
  width: 500px;
  heigth: 200px;
  color: black;
  background-color: #ffffff;
  z-index:2;
  > div {
    display: flex;

    > img {
      width:60px;
      height:60px;
      margin: 20px;
    }

    > div {
      width: 350px;

      > #profile_name {
        margin-top: 10px;
        font-size: 18px;
        font-weight: bold;
      }

      > p {
        color: grey;
        font-size: 12px;
        margin: 0;
      }
    }

    > PosiList {
      width: 450px;
    }
  }

  >#modal_btn {
    display: flex;
    justify-content: center;
    width: 90%;
    background-color: rgb(230,230,250);
    margin-bottom: 10px;
  }

  > #tableName {
    width: 85%;
    align-items: left;
    font-weight: bold;
  }

`;