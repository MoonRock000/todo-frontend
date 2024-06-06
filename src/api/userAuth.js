import { apiClient } from "./apiClient";

async function loginUser(loginParams) {
  const result = await apiClient.post("/sessions", { session: loginParams });
  return result;
}
async function signUpUser(signUpParams) {
  const result = await apiClient.post("/users", { user: signUpParams });
  return result;
}

export { loginUser, signUpUser };
