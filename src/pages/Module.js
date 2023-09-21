import { useParams } from "react-router-dom";

import Sys from './Sys';
import CompanyMgmtPage from "./CompanyMgmtPage";
import RoleSettingPage from "./RoleSettingPage";
import { EmptyPage } from "./VIEW";
import RoleMappingPage from "./RoleMappingPage";

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
  if (menuName === '권한Role설정'){
      return(
          <RoleSettingPage/>
      );
  }
  if (menuName === '권한설정') {
    return(
        <RoleMappingPage/>
    );
  }
  return <EmptyPage menuName={menuName}/>
} 