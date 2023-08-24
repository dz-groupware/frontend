import axios from 'axios';

export default function ImageTest(){

    const loadFile = async (e) => {
        e.preventDefault();

        // form 데이터 보내기 
        try {
            await axios({
                url: `/setting/menu`,
                method:'post',
                baseURL : 'http://localhost:8080',
                data:{
                    id:  e.target.menuId.value,
                    name:  e.target.menuName.value
                }
            });
            console.log('successed sending Data...');
        } catch (error) {
            console.log('failed sending Data...');
        }

        // 이미지 데이터 보내기
        try {
            await axios({
                url: `/setting/menu/img`,
                method:'post',
                baseURL : 'http://localhost:8080',
                headers: { 'Content-Type': 'multipart/form-data' },
                data:{
                    iconFile:  e.target.imageFile.files[0]
                }
            });
            console.log('successed sending Data...');
        } catch (error) {
            console.log('failed sending Data...');
        }
    }


    return (
        <>
        <h1>image test</h1>
        <form onSubmit={loadFile}>
            <div>id : <input type="number" id="menuId"/></div>
            <div>name : <input type="text" id="menuName"/></div>
            <div>file : <input type="file" id="imageFile"/></div>
            <button type="submit">전송</button>
        </form>
        
        </>
    )
}