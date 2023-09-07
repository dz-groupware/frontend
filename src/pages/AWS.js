import axios from 'axios';

export default function AWS(){
  const handler = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    console.log(fd);
    console.log(fd.get('image'));

    axios({
      url: `/api/v1/s3/img`,
      method:'post',
      baseURL : 'http://localhost:8010',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: {
          images: fd.get('image')
      }
    });
  }
  return (
    <div style={{color: 'black'}}>
    <h1> test </h1>
    <form id='f' onSubmit={handler}>
    <input type="file" name='image'/>
    <button type='submit'> 전송</button>
    </form>
    <img src='https://dz-test-image.s3.ap-northeast-2.amazonaws.com/7f65e215-b183-4d80-b105-d66f79487aa6-profile.PNG' alt='test'/>
    <img src='https://dz-test-image.s3.ap-northeast-2.amazonaws.com/ASD.PNG' alt='test'/>
    <img src='https://dz-test-image.s3.ap-northeast-2.amazonaws.com/1.png' alt='test'/>
    </div >
  )
}