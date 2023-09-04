import styled from 'styled-components';

import { IoCallOutline } from 'react-icons/io5';


export default function EmpList(props){
    return (
        <ListDiv>
        {
            props.value.map ((a, i) => (
                <EmpItem onClick={()=>{props.api(a)}}>
                    <div>
                        <img src={a['imageUrl']} alt='p_img' />
                    </div>
                    <div>
                        <div id='title'>
                            {a['name']} / {a['loginId']} / {a['position']}
                        </div>
                        <div>{a['nameTree']}</div>
                        <IoCallOutline /><span>{a['number']}</span>
                    </div>
                </EmpItem>
            ))
        }
        </ListDiv>
    );
}

const EmpItem=styled.div`
display: flex;
border : 1px solid black;
margin: 5px;
background-color: white;

> div > img {
    margin: 20px;
    width: 50px;
    heigth: 50px;
}
> div {
    > # title {
        font-weight: border;
    }

    > span {
    color: gray;
}
`;
export const ListDiv = styled.div`
width: 450px;
height: 100%;
margin: 5px;
overflow: scroll;
height: 100%;
background-color: rgb(240, 245, 248);
::-webkit-scrollbar {
    display: none;
}
`;