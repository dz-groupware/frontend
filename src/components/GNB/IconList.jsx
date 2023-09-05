import { Link } from 'react-router-dom';

export default function IconList(props) {
  return (
    <>
      {
        props.value.map((a, i) => (
          <Link to={{pathname: a['name']}} state= {{ menuId: a['id'] }} key={'icon'+i}>
            <img src={a['iconUrl']} alt={a['name']}/> 
          </Link>
        ))
      }
    </>
  );
}  