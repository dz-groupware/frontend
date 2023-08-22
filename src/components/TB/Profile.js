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

  const dummyData = JSON.parse('{"p_img":"사원1", "emp_name":"사원1", "comp_name":"회사A", "dept_name":"부서A"}');

  return (
    <StyledProfile>
      <img src={'/img/'+dummyData['p_img']+'.png'} alt='p_img' />
      <div>
          <div id="profile_name">{dummyData['emp_name']}</div>
          <div>{dummyData['comp_name']} || {dummyData['dept_name']}</div>
      </div>
    </StyledProfile>
  );
}
  