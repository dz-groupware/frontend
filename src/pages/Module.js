import React, { Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Loading from "../common/styles/Loading.jsx";
import FORBIDDEN from "./Error/Robidden.jsx";

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
    if(gnb.id !== value["gnbId"]) {
      setGnb({id: value["gnbId"], name: value["gnbName"]}); 
    }
    
    const Page = React.lazy(() => import(`./${value["page"]}`));
    setComponent(
      <Suspense fallback={<Loading />}>
        <Page pageId={value["menuId"]}/>
      </Suspense>
    );
  };

  useEffect(() =>{
    try {
      handleLoad(routeList.get(decodeURIComponent(location.pathname)));
    } catch (error) {
      window.location.href="/";
    }
  }, [location.pathname]);
  
  return component;
}