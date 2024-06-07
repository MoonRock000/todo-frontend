const setSessionStorage = (token, user) => {
  sessionStorage.setItem("token", token);
  if (user) sessionStorage.setItem("user", user);
};

function getToken() {
  const token = sessionStorage.getItem("token");
  return token;
}
function getUser() {
  const token = sessionStorage.getItem("user");
  return token;
}
function deleteToken() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
}
export { setSessionStorage, getToken, getUser, deleteToken };
