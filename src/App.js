import React from 'react';
import { Provider } from 'react-redux';
import LoginPage from "./pages/LoginPage";
import GlobalStyle from './GlobalStyle';
import store from './utils/Store';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import { Error, NotFound } from './pages/VIEW';


const ErrorFallback = (err) => {
  const navigate = useNavigate();
  console.log('!!! : ', err);
  if(err.message === "ERR_CONNECTION_REFUSED"){
    console.log('네트워크 연결 안됨');
  }
  if(err.message.includes("Cannot read properties of undefined")){
    console.log('속성값 읽을 수 없음 : undefined');
  }
  if(err.message.includes("\"undefined\" is not valid JSON")){
    console.log('JSON 변환 불가 : undefined');
  }
  if(err.status === 401 || err.status === 403){
    // window.location.href = '/login';
    return (<LoginPage />);
  }
}

export default function App() {
  return (
    <>
      <GlobalStyle/>
      <Provider store={store}>
          <div className="App">
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Routes>
                <Route path='/login' element={<LoginPage />} /> 
                <Route path='/*' element={<Home/>}/>
                <Route path='/error' element={<Error />} />
                <Route element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </div>
      </Provider>
    </>

  );
}



class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error){
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // sentry.logger(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (<Error />);
    }
    return this.props.children;
  }
}
