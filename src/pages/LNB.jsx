import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { searchMenuListAPI } from '../utils/API';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { AiFillFolder, AiFillFolderOpen, AiOutlineProfile, AiFillProfile, AiOutlineMenu } from "react-icons/ai";



export default function LNB() {
    const { param } = useParams();
    const [data, setData] = useState(JSON.parse('[{"name":""}]'));
    const compId = useSelector(state => state.gnbMenu.compId);
    const location = useLocation();
    const [lnbOpen, setLnbOpen] = useState(true);

    const [gnbId, setGnbId] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
      if (location.state === null) {
        // 부적절한 이동 시도
        navigate('./error');
      } else {
        const menuId = location.state.menuId;
        console.log('menuId : ',menuId);
        if(menuId !== undefined && compId !== undefined && compId !== null){
            searchMenuListAPI(menuId, compId).then(res => {
              setData(res.data);
            })
            setGnbId(menuId);
        } else {
          navigate('./error404');
        }
        // 지금은 이동한 메뉴(GNB)에 맞는 LNB 리스트를 저장하고 있음.
        // 즐겨찾기에서 눌렀을 경우 즐겨찾기 리스트를 저장하도록 수정할 예정
        // 현재는 이름만 즐겨찾기로 바뀌어 있음.
      }
    }, [compId, location]);

//    const data = JSON.parse('[{"name":"조직관리"}, {"naem":"메뉴설정"}]');

    return (
        <LnbArea>
            <LnbTitle><AiOutlineMenu onClick={() => {setLnbOpen(!lnbOpen)}}/><p>{param}</p></LnbTitle>
            <div style={{display: 'flex', width: '100%', height:'100%'}}>
                <LNBList className={`lnb ${lnbOpen} ? 'true' : 'false'`}>
                  <div style={{width:'200px'}}>
                    {
                        data.map((a, i) => {
                            if (a['id'] !== a['parId']) {
                                return (
                                    <MenuTree menu={a} param={param} compId={compId} gnbId={gnbId} key={a['name']+a['id']}/>                                    
                                )
                            }
                            return null;
                        })
                    }
                  </div>
                </LNBList>
                <OutletArea className={`outlet ${lnbOpen} ? 'true' : 'false'`}>
                  <Outlet />
                </OutletArea>
                </div>
        </LnbArea>
    );
}


export function MenuTree(props){
    const [open, setOpen] = useState(false);
    const [subItem, setSubItem] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(props.gnbId !== undefined){
            setSubItem([]);
            setOpen(false);
        }
    }, [props.compId, props.gnbId]);

    function handleMenuItem() {
        if(subItem.length === 0) {
            searchMenuListAPI(props.menu['id'], props.compId).then(res => setSubItem(res.data));
        }
        setOpen(!open);
        // menuId를 넘기지 않고 gnbId를 넘긴다. LNB() 컴포넌트는 GNB 메뉴 ID가 필요함.
        navigate(`/${props.param}/${props.menu['name']}`, {state: {menuId: props.gnbId}});
    }

    return (
        <Menu>
            <div style={{display: 'flex', margin: '10px'}}>
            { 
            open ? 
            (props.menu['childNodeYn'] === 0 ? <AiFillProfile /> : < AiFillFolderOpen/>)
            :
            (props.menu['childNodeYn'] === 1 ? <AiFillFolder /> : <AiOutlineProfile />) 
            }
            <div onClick={handleMenuItem}>{props.menu['name']}</div>
            </div>
            {
                open && subItem.map((a, i) => {
                    if (a['id'] !== a['parId']) {
                        return (
                            <MenuTree menu={a} param={props.param} compId={props.compId} gnbId={props.gnbId} key={a['name']+a['id']}/>
                        )
                    }
                    return null;
                })
            }
        </Menu>
    )
}

const LnbArea = styled.div`
width: 100%;
height: 100%;
background-color: white;
`;

const OutletArea = styled.div`
position: fixed;
top: 130px;
left: 250px;
width: calc(100% - 250px);
height: calc(100% - 50px);

&.true {
  left: 250px;
  width: calc(100% - 250px);
}
&.false {
  left: 50px;
  width: calc(100% - 50px);
}

`;


const Menu = styled.div`
margin-left: 15px;
`;

const LNBList = styled.div`
width: 200px !important;
height: 100%;
background-color: white;
color: black;
padding: 10px;
position: absolute;
z-index: 1;
&.true {
  left:0px;
  opacity:1;
}

&.false {
  left: -300px;
  top: 0;
  opacity: 0;

  transition: left 2s;
}

`;

const LnbTitle = styled.div`
width: 100%;
height: 50px;
background-color: rgb(18,172,226);
color: white;
font-size: x-large;
font-weight: bold;
padding-left: 10px;
display:flex;
> svg {
  margin: 15px;
}
> p {
  margin-top:15px;
}
`