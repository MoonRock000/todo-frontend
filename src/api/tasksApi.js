import { apiClient } from "./apiClient";

async function getTasks(token) {
  const result = await apiClient.get("/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return result;
}

export { getTasks };
