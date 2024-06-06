const setSessionStorage = (token, user) => {
  sessionStorage.setItem("token", token);
  if (user) sessionStorage.setItem("user", user);
};

function getToken() {
  const token = sessionStorage.getItem("token");
  return token;
}
export { setSessionStorage, getToken };
