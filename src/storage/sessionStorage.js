const setSessionStorage = (token, user) => {
  sessionStorage.setItem("token", token);
  if (user) sessionStorage.setItem("user", user);
};

function getToken() {
  const token = sessionStorage.getItem("token");
  return token;
}
function deleteToken() {
  sessionStorage.removeItem("token");
}
export { setSessionStorage, getToken, deleteToken };
