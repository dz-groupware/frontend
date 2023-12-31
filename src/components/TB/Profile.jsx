import styled from "styled-components";

export default function Profile({ profile }) {
  
  return (
    <Content>
      <img src={profile["imageUrl"]} alt="profileImg" />
      <div>
        <div>{profile["empName"]}</div>
        <p>{profile["compName"]} / {profile["deptName"]}</p>
      </div>
    </Content>
  );
}

const Content = styled.div`
  display: flex;
  width: 300px;
  height: 100%;
  color: #1d2437;

  > img {
    margin: 5px;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    box-shadow: 2px 2px #9a959563,
    inset 2px 2px #9a959563;
    outline: none;
  }

  > div {
    width: 145px;

    > div {
      margin: 10px 5px 5px 5px;
      font-weight: bold;
      text-shadow: 1px 1px 1px rgba(255,255,255,0.7),
                  -1px -1px 1px rgba(255,255,255,0.7);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis; 
    }

    > p {
      margin: 10px 5px 5px 5px;
      font-size: small;
      text-shadow: 1px 1px 1px rgba(255,255,255,0.7),
                  -1px -1px 1px rgba(255,255,255,0.7);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis; 
    }
  }
`;