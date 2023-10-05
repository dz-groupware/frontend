import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    console.log('in EB : ', error);
    // 에러가 발생한 경우 에러 상태를 설정합니다.
    this.setState({ hasError: true });
    // 여기서 에러를 로깅하거나 추가적인 에러 처리를 수행할 수 있습니다.
  }

  render() {
    if (this.state.hasError) {
      // 에러가 발생한 경우 대체 컴포넌트를 렌더링합니다.
      return <div> 다시 시도해 주세요 </div>;
    }
    // 에러가 없는 경우 자식 컴포넌트를 그대로 렌더링합니다.
    return this.props.children;
  }
}

export default ErrorBoundary;
