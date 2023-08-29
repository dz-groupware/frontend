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
  const data = useSelector(state => state.gnbMenu.profileList[0]);

  return (
    <StyledProfile>
      <img src={data['imageUrl']} alt='profileImg' />
      <div>
        <div id="profile_name">{data['name']}</div>
        
      </div>
    </StyledProfile>
  )
}
  