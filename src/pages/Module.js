import { useLocation } from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";
import { Loading } from './VIEW';
import TypeError from '../components/Error/TypeError';

export default function Module({ gnb, setGnb, routeList }){
  const location = useLocation();
  const [component, setComponent] = useState(null);

  // lazy import
  const handleLoad = async (value) => {
    if (!value) {
      // 에러 페이지를 렌더링
      setComponent(<TypeError />);
      return;
    }
    // 이 메뉴의 gnb가 현재 gnb인지 확인하고 다르면 변경시킴
    // console.log('gnbId : ', gnb.id, " || path-gnbId : ", value['gnbId'], 'page : ', value['page']);
    if(gnb.id !== value['gnbId']) {
      setGnb({id: value['gnbId'], name: value['gnbName']}); //
    }
    
    const Page = React.lazy(() => import(`./${value['page']}`));
    setComponent(
      <Suspense fallback={<Loading />}>
        <Page pageId={value['menuId']}/>
      </Suspense>
    );
  };

  // console.log("url : ",decodeURIComponent(location.pathname));
  // console.log('get : ', routeList.get(decodeURIComponent(location.pathname)));

  // 페이지를 이동하면 
  useEffect(() =>{
    // 페이지 있으면 이동 가능
    try {
      // console.log("routeList : ", routeList);
      // console.log("path : ", decodeURIComponent(location.pathname));
      // console.log("route value : ", routeList.get(decodeURIComponent(location.pathname)));
      handleLoad(routeList.get(decodeURIComponent(location.pathname)));
    } catch (error) {
      console.log('접근할 수 없습니다.', error);
      window.location.href='/';
    }
  }, [location.pathname]);

  useEffect(() => {
    if(!gnb || !setGnb || !routeList){
      setComponent(<TypeError />);
      return;
    }
  }, [gnb, setGnb, routeList])

  return component;
}