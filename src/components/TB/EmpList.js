import styled from 'styled-components';


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
`


export default function EmpList(props){

    console.log(props.value);
    return (
        <div style={{overflow: "scroll", height: "95%" }}>
        {
            props.value.map ((a, i) => (
                <EmpItem >
                    <div>
                        <img src={'/img/'+a['pimg']+'.png'} alt='p_img' />
                    </div>
                    <div>
                        <div id='title'>
                            {a['name']} / {a['loginId']}
                        </div>
                        <div>{a['tree_path']}</div>
                        <span>{a['number']}</span>
                    </div>
                </EmpItem>
            ))

        }
        </div>
    )
}