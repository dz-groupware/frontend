import { Link } from 'react-router-dom';
import styled from 'styled-components';


export const ListFavor = styled.div`
display: flex;
width: 100%;
`
export const More = styled.div`
margin-top: 25px;
margin-left: 15px;
border : 1px solid white;
border-radius: 5px;
width:30px;
height:40px;
font-size: xx-large;
text-align:center;
`
export const FavorItem = styled.div`
display: flex;
margin-top: 25px;
margin-left: 15px;
border : 1px solid white;
border-radius: 5px;
width:120px;
height:40px;

> img { 
  width:20px;
  height:20px;
  margin:10px;
}
`
export default function FavorList() {
  const dummyData = JSON.parse('[{"menu_name":"/", "menu_id":"1"}, {"menu_name":"공지사항", "menu_id":"2"}]')

  return (
    <ListFavor>
      {
        dummyData.map((a, i) => {
        if(i === 4 ) return <More key={'more'}>...</More>
        if (i >4) return null;
        return (
        <Link to={a['menu_name']} key={'favor'+i}>
        <FAVOR menuName={a['menu_name']}/>                
        </Link>
        )})
      }
    </ListFavor>
  );
}

export function FAVOR(props) {
  return (
    <FavorItem>
      <img src={`${process.env.PUBLIC_URL}/img/${props.menuName}.png`} alt='favor_icon'/>
      <p value={props.menuName}>{props.menuName}</p>
      <span onClick={(e) => {
        // 최근기록 x로 지우기...
        }
      }>x</span>
    </FavorItem>
  );
}
  

  