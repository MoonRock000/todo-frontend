import { getToken } from "../storage/sessionStorage";
import { apiClient } from "./apiClient";

async function getTasks(token) {
  const result = await apiClient.get("/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return result;
}
async function createTask(description) {
  const token = getToken();
  const result = await apiClient.post(
    "/tasks",
    {
      task: { description: description, status: "pending" },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return result;
}
async function deleteTask(id) {
  const token = getToken();
  const result = await apiClient.delete(`/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return result;
}

async function editTask(task) {
  const token = getToken();
  const result = await apiClient.put(
    `/tasks/${task.id}`,
    {
      task: {
        description: task.description,
        status: task.status,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return result;
}

export { getTasks, createTask, deleteTask, editTask };
