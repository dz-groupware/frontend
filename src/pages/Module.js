import { useLocation } from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";
import { Error } from './VIEW';

export default function Module(){
  const location = useLocation();
  // const [menuList, setMenuList] = useState(new Map());
  const [component, setComponent] = useState(null);

  // name_tree 가 key, menu_id, page가 value // 요청으로 받아올 메뉴 리스트 
  const menuList = new Map([
    ['/시스템설정', { menuId: 1, page: 'Basic'}],
    ['/시스템설정/조직관리', { menuId: 2, page: 'Basic'}],
    ['/시스템설정/조직관리/회사관리', { menuId: 3, page: 'CompanyMgmtPage'}],
    ['/시스템설정/조직관리/부서관리', { menuId: 4, page: 'Department'}],
    ['/시스템설정/사원관리', { menuId: 5, page: 'Basic'}],
    ['/시스템설정/사원관리/사원관리', { menuId: 6, page: 'EmployeeMgmtPage'}],
    ['/시스템설정/권한관리', { menuId: 7, page: 'Basic'}],
    ['/시스템설정/권한관리/메뉴설정', { menuId: 8, page: 'Sys'}],
    ['/시스템설정/권한관리/권한Role설정', { menuId: 9, page: 'RoleSettingPage'}],
    ['/시스템설정/권한관리/권한설정', { menuId: 10, page: 'Basic'}],
  ]);

  // lazy import
  const handleLoad = async (value) => {
    console.log('page : ',value['page']);
    const Page = React.lazy(() => import(`./${value['page']}`));
    setComponent(
      <Suspense fallback={<div>로딩중 ...</div>}>
        <Page menuId={value['menuId']}/>
      </Suspense>
    );
  };

  console.log("url : ",decodeURIComponent(location.pathname));
  console.log('get : ', menuList.get(decodeURIComponent(location.pathname)));

  // 사용자가 이용 가능한 메뉴 리스트 받아오기
  useEffect(() => {
  // api().then(res => setMenuList(res.data));
  }, []);

  // 페이지를 이동하면 
  useEffect(() =>{
    // const A = React.lazy(() => import("./a"));
    // 페이지 있으면 이동 가능
    if (menuList.has(decodeURIComponent(location.pathname))) {       
      handleLoad(menuList.get(decodeURIComponent(location.pathname)));
    } else {
      // 페이지 없으면 에러 페이지
      setComponent(<Error/>);
    }
  }, [location]);
  
  return component;
}