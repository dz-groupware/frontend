
export function UnAuthorized () {
  localStorage.setItem("empId", 0);
  localStorage.setItem("compId", 0);
  // window.location.href="/login";
}

export function isUnAuthorized (id) {
  if (id) {
    localStorage.setItem(`${id}`, 0);
    // window.location.href='/login';
  }
}