import { Link } from 'react-router-dom';

export default function IconList(props) {

  return (
    <>
      {
        props.value.map((a, i) => (
          <Link to={a['name']} key={'icon'+i}>
          <img src={a['iconUrl']} alt={a['name']}/>
          </Link>
        ))
      }
    </>
  );
}  