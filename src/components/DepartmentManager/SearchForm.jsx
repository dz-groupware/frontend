import styled from 'styled-components';

import { AiOutlineSearch } from 'react-icons/ai';
import { useEffect, useState } from 'react';

export default function SearchForm ({ option, setSearch }){
  const [value, setValue] = useState({ option: '', text: '' });

  useEffect(() => {    
    if(option[0]){
      // console.log('compId : ',  option[0].compId);
      setValue({ ...value, option: option[0].compId});
    } else {
      console.log('error');
    }
  }, [option]);

  if (option.length === 0) {
    return <div> try again </div>
  } else {
    return(
      <SearchContent>
        <select 
          name='searchOption' 
          value={value.option} 
          onChange={(e) => setValue({ ...value, option: e.target.value })}>
          {
            option.map((a, i) => (
              <option key={a['name']+a['compId']} value={a['compId']}>{a['name']}</option>
            ))
          }
        </select>
        <input placeholder='코드/부서명을 입력하세요' value={value.text} 
        onChange={(e) => setValue({ ...value, text: e.target.value })} />
        <AiOutlineSearch onClick={() => {setSearch({ ...value, on: true })}}/>
      </SearchContent>
    );
  }
}

const SearchContent = styled.form`
width: 100%;
padding: 5px;
height: 120px;
background-color: rgb(240,245,248);
border-bottom: 1px solid rgb(171,172,178);
color: black;
> select {
  width: calc(100% - 20px);
  height:35px;
  margin: 10px;
}
> input {
  width: calc(100% - 50px);
  height: 40px;
  margin: 5px;
  margin-left: 10px;
}
> svg {
  width: 20px;
  height: 20px;
  position: relative;
  top: 7px;
}
`;