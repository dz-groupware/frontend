

export default function TypeError(){
  //onClick onRetry로 바꿔서 컴포넌트 재랜더링 시킬 수 있게 할 것
  return(
    <div style={styles.container}>
    <p style={styles.errorMessage}>데이터를 가져올 수 없습니다.</p>
    <button style={styles.retryButton} onClick={() => {window.location.reload()}}>다시 시도</button>
  </div>
  )
}

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: '50px',
  },
  errorMessage: {
    fontSize: '20px',
    marginBottom: '20px',
  },
  retryButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    outline: 'none',
  },
};
