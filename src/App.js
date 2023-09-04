import { Route, Routes } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import LoginPage from './pages/LoginPage';
import RoleSettingPage from './pages/RoleSettingPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle/>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/roleSetting' element={<RoleSettingPage/>} />
        </Routes>
        <ReactQueryDevtools/>
      </QueryClientProvider>
    </>
  );
}

export default App;
