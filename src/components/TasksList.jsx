import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { deleteTask, editTask } from "../api/tasksApi";
import { useState } from "react";
import { EditTaskModal } from "./EditTaskModal";

const TasksList = ({ todos, setTodos }) => {
  const [edit, setEdit] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState({});
  return (
    <>
      {edit && (
        <EditTaskModal
          openModal={edit}
          setOpenModal={setEdit}
          task={taskToEdit}
          setTodos={setTodos}
        />
      )}
      {todos.map((todo) => (
        <Card marginBottom={5} key={todo.id}>
          <CardHeader>{todo.description}</CardHeader>
          <CardBody>Status: {todo.status}</CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button
                variant="ghost"
                colorScheme="red"
                onClick={() =>
                  deleteTask(todo.id)
                    .then((response) => {
                      setTodos(response.data.tasks);
                    })
                    .catch((error) => {})
                }
              >
                Delete
              </Button>
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={() => {
                  setTaskToEdit(todo);
                  setEdit(true);
                }}
              >
                Edit
              </Button>
              <Button
                variant="solid"
                colorScheme="green"
                onClick={() => {
                  editTask({
                    ...todo,
                    status: todo.status == "complete" ? "pending" : "complete",
                  })
                    .then((response) => {
                      setTodos(response.data.tasks);
                    })
                    .catch((error) => {});
                }}
              >
                Mark As {todo.status == "complete" ? " Pending" : " Complete"}
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default TasksList;
