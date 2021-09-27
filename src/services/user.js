function isSignedIn() {
  // const user = JSON.parse(localStorage.getItem('user'));
  const user = JSON.parse(sessionStorage.getItem('user'));
  if (user) {
    return true;
  }
  return false;
}

function userData() {
  return JSON.parse(localStorage.getItem('user'));
}
function userAuthToken() {
  return JSON.parse(sessionStorage.getItem('user'));
}

function updateUserData(data) {
  localStorage.setItem('user', JSON.stringify(data));
}
function updateUserAuthToken(token) {
  sessionStorage.setItem('user', JSON.stringify(token));
}

function signOut() {
  sessionStorage.removeItem('user');
}

export default {
  isSignedIn,
  userData,
  userAuthToken,
  updateUserData,
  updateUserAuthToken,
  signOut,
};
