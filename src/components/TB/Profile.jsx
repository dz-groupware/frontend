import styled from 'styled-components';

export default function Profile({ profile, empId }) {
  const user = profile.find(prf => prf['empId'] === empId);

  if(user) {
    return (
      <ProfileArea>
        <img src={user['imageUrl']} alt='profileImg' />
        <div>
          <div id="profile_name">{user['empName']}</div>
          <p>{user['compName']} / {user['deptName']}</p>
        </div>
      </ProfileArea>
    );
  }
}

export const ProfileArea = styled.div`
display: flex;
width: 300px;
height: 100%;
color: black;

> img {
  margin-top: 20px;
  margin-right: 5px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
}

> div {
  margin-top: 20px;
  font-weight: bold;

  > div {
    margin: 5px;
  }

  > p {
    margin: 0;
    margin-left: 7px;
    padding-top: 5px;
    font-size: small;
    color: gray;
  }
}
`;