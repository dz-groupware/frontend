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
height: 105px;
background-color: #f2f3f6;
border-bottom: 1px solid hsl(231.42857142857122, 4.347826086956523%, 68.43137254901961%);
border-top: 3px solid #1d2437;
color: #1d2437;
> select {
  width: calc(100% - 20px);
  height: 30px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            2px 2px 2px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
            outline: none;
}
> input {
  width: calc(100% - 50px);
  height: 30px;
  margin: 5px;
  margin-left: 10px;
  padding-left: 5px;
  border:1px solid #70747f;
  border-radius: 5px;
  box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            2px 2px 2px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
            outline: none;
}
> svg {
  width: 25px;
  height: 25px;
  font-weight: bold;
  position: relative;
  top: 8px;
}
`;