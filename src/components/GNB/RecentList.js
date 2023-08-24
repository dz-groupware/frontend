import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function RecentList() {
  
  const recentData = useSelector(state => state.gnbMenu.recent);

  console.log('recent list : ', recentData, typeof(recentData));
if (typeof(recentData) === 'string') {
  return (
    <>
      {
        JSON.parse(recentData).map((a, i) => (
          <div style={{display:'flex'}}>
          <Link to={a['name']} key={a['menuId']+'recent'+i}>
          <RecentItem value={a['name']} />
          </Link>
          <span style={{position: 'absolute', right: '10px', marginTop: '15px'}}>X</span>
          </div>
        ))
      }
    </>
  );
}
else {
  return (
    <>
      {
        recentData.map((a, i) => (
          <div style={{display:'flex'}}>
          <Link to={a['name']} key={a['menuId']+'recent'+i}>
          <RecentItem value={a['name']} />
          </Link>
          <span style={{position: 'absolute', right: '10px', marginTop: '15px'}}>X</span>
          </div>
        ))
      }
    </>
  );
}
  
    
}
  
function RecentItem(props) {
  return (
    <div>
      <p value={props.value}>{props.value}</p>
    </div>
  );
}
  