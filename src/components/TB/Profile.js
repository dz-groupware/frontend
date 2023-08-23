import { useSelector } from 'react-redux';
import styled from 'styled-components';

export const StyledProfile = styled.div`
display: flex;
width: 200px;
height: 100%;
color: black;

> img {
  margin-top: 20px;
  margin-right: 10px;
  width: 50px;
  height: 50px;
}

> div {
  margin-top: 15px;
  font-weight: bold;

  > div {
    margin: 5px;
  }
}
`

export default function Profile() {
  const datas = useSelector(state => state.gnbMenu.profileList);
  const emp_id = useSelector(state => state.gnbMenu.key);

  for(let data of datas) {
    if (data['empId'] === emp_id) {
      return(
      <StyledProfile>
        <img src={'/img/'+data['pimg']+'.png'} alt='p_img' />
        <div>
          <div id="profile_name">{data['name']}</div>
          <div>{data['compName']} || {data['deptName']}</div>
        </div>
      </StyledProfile>
      )
    }
  }
  return null;
}
  