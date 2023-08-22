import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ListBox = styled.div`
background-color: rgb(21,21,72);

> div {
  font-size: 20px;
  margin-top: 25px;
  margin-bottom: 25px;
  magin-left:10px;
}

`

export default function FavList() {
  const dummyData = JSON.parse('[{"menu_name":"/", "menu_id":"1"}, {"menu_name":"공지사항", "menu_id":"2"}]')
    
  return (
    <ListBox>
      {
        dummyData.map((a, i) => (
          <Link to={a['menu_name']} key={a['menu_name']+a['menu_id']+i+'fav'}>
          <MENU dataA={a}/>                
          </Link>
        ))
      }
    </ListBox>
  );
}
export function MENU(props) {

  return (
    <div id="MENU">
      <p value={props.dataA["menu_name"]}>{props.dataA["menu_name"]}</p>
    </div>
  );
}