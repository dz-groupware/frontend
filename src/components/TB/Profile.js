import { useSelector } from 'react-redux';
import styled from 'styled-components';

export default function Profile() {
  const data = useSelector(state => state.gnbMenu.profileList[0]);

  return (
    <ProfileArea>
      <img src={data['imageUrl']} alt='profileImg' />
      <div>
        <div id="profile_name">{data['name']}</div>
      </div>
    </ProfileArea>
  );
}

export const ProfileArea = styled.div`
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
`;