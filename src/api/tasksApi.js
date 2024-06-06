import { apiClient } from "./apiClient";

async function getTasks() {
  const result = await apiClient.get("/tasks");
  return result;
}
async function createTask(description) {
  const result = await apiClient.post(
    "/tasks",
    {
      task: { description: description },
    });
  return result;
}
async function deleteTask(id) {
  const result = await apiClient.delete(`/tasks/${id}`);

  return result;
}

async function editTask(task) {
  const result = await apiClient.put(
    `/tasks/${task.id}`,
    {
      task,
    });

  return result;
}

export { getTasks, createTask, deleteTask, editTask };
