import { useLocation } from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";
import { Loading } from './VIEW';
import FORBIDDEN from './Error/FORBIDDEN';

export default function Module({ gnb, setGnb, routeList }){
  const location = useLocation();
  const [component, setComponent] = useState(null);

  // lazy import
  const handleLoad = async (value) => {
    if (!value) {
      setComponent(<FORBIDDEN/>);
      return;
    }
    // 현재 GNB와 변경된 메뉴의 GNB 비교 : 다를 때만 변경시킴
    if(gnb.id !== value['gnbId']) {
      setGnb({id: value['gnbId'], name: value['gnbName']}); 
    }
    
    const Page = React.lazy(() => import(`./${value['page']}`));
    setComponent(
      <Suspense fallback={<Loading />}>
        <Page pageId={value['menuId']}/>
      </Suspense>
    );
  };

  // 페이지를 이동하면 
  useEffect(() =>{
    try {
      console.log("routeList : ", routeList);
      console.log("path : ", decodeURIComponent(location.pathname));
      console.log("route value : ", routeList.get(decodeURIComponent(location.pathname)));
      handleLoad(routeList.get(decodeURIComponent(location.pathname)));
    } catch (error) {
      console.log('Unknown Error', error);
      window.location.href='/';
    }
  }, [location.pathname]);
  
  return component;
}