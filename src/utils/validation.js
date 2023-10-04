/* eslint-disable no-unused-vars */
export const loginIdValidation = (value) => {
  const basicRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const isNotBlank = value.trim().length > 0; // 입력 값이 비어있지 않은지 확인
  if (!isNotBlank) {
    return "아이디를 입력하세요.";
  }
  if (!basicRegex.test(value)) {
    return "올바른 이메일 형식이 아닙니다.";
  }
  return true;
}

export const passwordValidation = (value) => {
  const basicRegex = /^[a-zA-Z0-9]*$/;
  const isNotBlank = value.trim().length > 0;  
  const isAtLeast8Chars = value.trim().length >= 8; 
  if (!isNotBlank) {
    return "비밀번호를 입력하세요.";
  }
  if (!basicRegex.test(value)) {
    return "비밀번호는 영문 대소문자와 숫자만 허용됩니다.";
  }
  if (!isAtLeast8Chars) {
    return "비밀번호는 최소 8자 이상이어야 합니다.";
  }
  return true;
}
