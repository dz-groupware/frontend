import { Link } from 'react-router-dom';

export default function RecentList() {
  const dummyData = JSON.parse('[{"menu_name":"/", "menu_id":"1"}, {"menu_name":"공지사항", "menu_id":"2"}]')

  return (
    <>
      {
        dummyData.map((a, i) => (
          <Link to={a['menu_name']} key={'recent'+i}>
          <RecentItem value={a['menu_name']} />
          </Link>
        ))
      }
    </>
  );
    
}
  
function RecentItem(props) {
  return (
    <div>
      <p value={props.value}>{props.value}</p>
    </div>
  );
}
  