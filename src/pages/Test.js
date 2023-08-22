import { useState } from "react";
import PropTypes from 'prop-types';
//import Loding from '../common/Loding';

function Test() {
  
  const [search, setSearch] = useState("");
  // const filterTitle = search.filter((s) => {
  //   return s.title.replace(" ", "").toLocalLowerCase().includes(search.toLocaleLowerCase());
  // })

  function onChange(e){
    console.log(e.target.value);
    setSearch(e.target.value);
  }
  /*
  const [loading2, setLoading] = useState(true);

  const LoadingAPI = () => {
    console.log('loading : ' , loading2)
    setTimeout(() => setLoading(false), [2000]);
    console.log('loading : ' , loading2)
  }

  useEffect(() => {
    LoadingAPI();
  }, []);
*/
  
    return (
      <div>
          <h1>공지사항</h1>
          <div>
            <SearchBar value={search} onChange={onChange} />
            {/* {filterTitle.map(movie => <div id={movie.map}><span>{movie.title}</span></div>)} */}
          </div>
      </div>
    );
  }

  export function SearchBar({search, onChange}){  
      return (
      <>
          <input type="text" value={search} onChange={onChange} />
      </>
    )
  }
  SearchBar.propTypes={
    search: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
  }
  SearchBar.defaultProps={
    search:'',
  }
  export default Test;
  