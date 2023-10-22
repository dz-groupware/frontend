
import MgmtHeader from '../Commons/MgmtHeader';
import NotificationInfo from '../Commons/NotificationInfo';
import { styled } from 'styled-components';




export default function CompanyMgmtHeader({ pageId }) {



    return (
        <div>
            <MgmtHeader title="회사관리" pageId={pageId} />
            {/* Other components */}
            <NotificationArea>
                <NotificationInfo>
                    로그인 하신 회사의 정보 외에는 삭제가 불가능 합니다. 
                </NotificationInfo>
            </NotificationArea>
        </div>
    );
}
const NotificationArea = styled.div`
  display : flex;
  justify-content : center;
  align-items: center;
  margin-top : 10px;
`
