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
  box-shadow: inset 1px 1px 1px 0px rgba(255, 255, 255, 0.3),
            3px 3px 7px 0px rgba(255, 255, 255, 1),
            2px 2px 2px 0px rgba(255, 255, 255, 1);
            outline: none;
}

> div {
  margin-top: 20px;
  font-weight: bold;

  > div {
    margin: 5px;
    text-shadow: 2px 2px 4px #ffffff;
  }

  > p {
    margin: 0;
    margin-left: 7px;
    padding-top: 5px;
    font-size: small;
    color: gray;
    &::after {
      content: attr()(data-text);
      text-shadow: 0 -2px 4px rgba(255, 255, 255, 1),
                -2px 0 4px rgba(255, 255, 255, 1),
                0 2px 4px rgba(255, 255, 255, 1),
                2px 0 4px rgba(255, 255, 255, 1);
    }
  }
}
`;