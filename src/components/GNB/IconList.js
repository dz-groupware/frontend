import { Link } from 'react-router-dom';

export default function IconList() {
  const dummyData = JSON.parse('[{"menu_name":"/", "menu_id":"1"}, {"menu_name":"공지사항", "menu_id":"2"}]')
    
  return (
    <>
      {
        dummyData.map((a, i) => (
          <Link to={a['menu_name']} key={'icon'+i}>
          <img src={`${process.env.PUBLIC_URL}/img/${a['menu_name']}.png`} alt={a['menu_name']}/>
          </Link>
        ))
      }
    </>
  );
}  