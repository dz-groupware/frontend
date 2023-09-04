import { useSelector } from 'react-redux';
import styled from 'styled-components';

export default function Profile() {
  const data = useSelector(state => state.gnbMenu.profileList[0]);

  return (
    <ProfileArea>
      <img src={data['imageUrl']} alt='profileImg' />
      <div>
        <div id="profile_name">{data['name']}</div>
        <p>{data['compName']} / {data['nameTree']}</p>
      </div>
    </ProfileArea>
  );
}

export const ProfileArea = styled.div`
display: flex;
width: 300px;
height: 100%;
color: black;

> img {
  margin-top: 20px;
  margin-right: 10px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
}

> div {
  margin-top: 15px;
  font-weight: bold;

  > div {
    margin: 5px;
  }
  > p {
    margin: 0;
    margin-left: 7px;
    padding: 0;
    font-size: small;
    color: gray;
  }
}

`;