/* eslint-disable no-unused-vars */
export const emailValidation = (value) => {
  const basicRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const isBlank = value.trim().length > 0;
  return basicRegex.test(value) && isBlank;
}

export const passwordValidation = (value) => {
  const basicRegex = /^[a-zA-Z0-9]*$/;
  const isBlank = value.trim().length >= 6;
  return basicRegex.test(value) && isBlank;
}
