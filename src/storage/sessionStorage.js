const setSessionStorage = (token, user) => {
  sessionStorage.setItem("token", token);
  if (user) sessionStorage.setItem("user", user);
};

export { setSessionStorage };
