import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Sys from './Sys';
import { useEffect, useState } from "react";
import { searchMenuListAPI } from '../utils/API';
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { AiFillFolder, AiFillFolderOpen, AiOutlineProfile, AiFillProfile, AiOutlineMenu } from "react-icons/ai";


export function LNB() {
    const { param } = useParams();
    const location = useLocation();
    const menuId = location.state.menuId;
//const menuId=8;
    const [data, setData] = useState(JSON.parse('[{"name":""}]'));
    const compId = useSelector(state => state.gnbMenu.compId);

    useEffect(() => {
        if(menuId !== undefined && menuId !== null && compId !== undefined && compId !== null){
            searchMenuListAPI(menuId, compId).then(res => setData(res.data));
        }
        // 지금은 이동한 메뉴(GNB)에 맞는 LNB 리스트를 저장하고 있음.
        // 즐겨찾기에서 눌렀을 경우 즐겨찾기 리스트를 저장하도록 수정할 예정
        // 현재는 이름만 즐겨찾기로 바뀌어 있음.
    }, [menuId, compId]);

//    const data = JSON.parse('[{"name":"조직관리"}, {"naem":"메뉴설정"}]');

    return (
        <div style={{backgroundColor:'white', width:'100%', height:'100%', color:'black'}}>
            <LnbTitle><AiOutlineMenu style={{margin: '5px', marginRight:'10px'}} />
            {param}
            </LnbTitle>
            <div style={{display:'flex', width:'100%', height:'100%'}}>
                <LNBList>
                    {
                        data.map((a, i) => {
                            if (a['id'] !== a['parId']) {
                                return (
                                    <MenuTree menu={a} param={param} compId={compId} gnbId={menuId} key={a['name']+a['id']}/>                                    
                                )
                            }
                            return null;
                        })
                    }
                </LNBList>
                <OutletArea>
                    <Outlet />
                </OutletArea>
            </div>
        </div>
    );
}

export function Module(){
    const { menuName } = useParams();

    if (menuName === '메뉴설정'){
        return(
            <Sys />
        );
    }    
    if (menuName === ''){
        return(
            <Sys />
        );
    }
    return null;

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
                            <MenuTree menu={a} param={props.param} compId={props.compId} key={a['name']+a['id']}/>
                        )
                    }
                    return null;
                })
            }
        </Menu>
    )
}

const Menu = styled.div`
margin-left: 15px;
`;

const LNBList = styled.div`
width: 200px;
height: 100%;
backgroundColor: rgb(250,247,250);
padding: 10px;
`;

const OutletArea = styled.div`
width: 90%;
height: 85%;
`
const LnbTitle = styled.div`
width: 100%;
height: 50px;
background-color: rgb(20,136,247);
color: white;
font-size: x-large;
font-weight: bold;
padding-top: 10px;
padding-left: 10px;
`