import { useParams } from "react-router-dom";

import Sys from './Sys';
import CompanyMgmtPage from "./CompanyMgmtPage";
import RoleSettingPage from "./RoleSettingPage";
import { EmptyPage } from "./VIEW";
import EmployeeMgmtPage from "./EmployeeMgmtPage";

export default function Module(){
  const { menuName } = useParams();

  if (menuName === '메뉴설정'){
      return(
          <Sys />
      );
  }    
  if (menuName === '회사관리'){
      return(
          <CompanyMgmtPage />
      );
  }
  if (menuName === '사원관리'){
      return(
          <EmployeeMgmtPage />
      );
  }
  if (menuName === '권한Role설정'){
      return(
          <RoleSettingPage/>
      );
  }
  return <EmptyPage menuName={menuName}/>
} 