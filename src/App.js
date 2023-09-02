import { Route, Routes } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import LoginPage from './pages/LoginPage';
import RoleSettingPage from './pages/RoleSettingPage';

function App() {
  return (
    <>
      <GlobalStyle/>
      <Routes>
        <Route path='/' element={<div>ㅎㅇ</div>}/>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/roleSetting' element={<RoleSettingPage/>} />
      </Routes>
    </>
  );
}

export default App;
