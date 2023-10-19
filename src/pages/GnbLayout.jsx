import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { basicInfoApi } from "../api/layout";
import { getMenuList } from "../api/menu";

import TB from "./TB";
import LnbLayout from "./LnbLayout";
import GNB from "../components/GNB/GNB";
import Retry from "./Error/Retry";
import Loading from "../common/styles/Loading.jsx";

export default function GnbLayout() {
  const [profile, setProfile] = useState(JSON.parse(`[{}]`));
  const [gnb, setGnb] = useState(JSON.parse(`[{}]`));
  const [favor, setFavor] = useState(JSON.parse(`[{}]`));
  const [empId, setEmpId] = useState(localStorage.getItem("empId"));
  const [routeOn, setRouteOn] = useState(false);
  const [error, setError] = useState(false);
  const [routeList, setRouteList] = useState(new Map([
    [`/`, { menuId: 0, gnbId: 0, gnbName: "main", page: "Main" }],
    [`/FORBIDDEN`, { menuId: 0, gnbId: 0, gnbName: "FORBIDDEN", page: "Error/Fobidden" }],
    [`/SERVICE_UNAVAILABLE`, { menuId: 0, gnbId: 0, gnbName: "SERVICE_UNAVAILABLE", page: "Error/ServiceUnavailable" }]
  ]));

  const parseMenuList = (originMenuList) => {
    try {
      const menuList = new Map();
      originMenuList.forEach(row => {
        const { menuId, gnbId, gnbName, nameTree, page } = row;
        menuList.set(`/${nameTree}`, { menuId, gnbId, gnbName, page });
      });
      menuList.set(`/`, { menuId: 0, gnbId: 0, gnbName: "main", page: "Main" });
      menuList.set(`/FORBIDDEN`, { menuId: 0, gnbId: 0, gnbName: "FORBIDDEN", page: "Error/Fobidden" });
      menuList.set(`/SERVICE_UNAVAILABLE`, { menuId: 0, gnbId: 0, gnbName: "SERVICE_UNAVAILABLE", page: "Error/ServiceUnavailable" });
      setRouteList(menuList);  
      setError(false);
      setRouteOn(true);   
    } catch (error) {
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    document.body.style.zoom = "80%";  
      basicInfoApi().then(res => {
        setProfile(res.data.data.profile);
        setGnb(res.data.data.menu);
        setFavor(res.data.data.favor);
        setEmpId(res.data.data.empId);
        localStorage.setItem("empId", res.data.data.empId);
        localStorage.setItem("compId", res.data.data.compId);
        getMenuList(0).then(res => {
          return parseMenuList(res.data.data);
        }).catch((error) => {
          throw Promise.reject(error);
        });
      }).catch((err) => {
        setError(true);
        setRouteOn(false);
        window.location.href="/SERVICE_UNAVAILABLE";
        return;
      });
  }, [empId]);

  return (
    <>
      <Content>
        <TB profile={profile} empId={empId} routeList={routeList}/>
        { error ? <Retry /> : (
          routeOn ? <LnbLayout routeList={routeList}/> : <Loading />
        )}
      </Content>
      <GNB gnb={gnb} favor={favor}/>
    </>
  );
}

const Content = styled.div`
  position: fixed;
  top: 0px;
  left: 45px;
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
`;