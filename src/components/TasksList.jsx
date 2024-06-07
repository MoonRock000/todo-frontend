import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  ButtonGroup,
  Button,
  Badge,
  Heading,
} from "@chakra-ui/react";
import { deleteTask, editTask } from "../api/tasksApi";
import { useState } from "react";
import { EditTaskModal } from "./EditTaskModal";
import { toast } from "react-toastify";

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
          <CardHeader>
            <Heading fontSize={"xl"}>{todo.description}</Heading>
          </CardHeader>
          <CardBody>
            <Badge
              colorScheme={todo.status == "complete" ? "green" : "orange"}
              size={"20"}
              variant={"solid"}
              padding={"5px"}
            >
              Status: {todo.status == "pending" ? " Pending" : " Complete"}
            </Badge>
          </CardBody>
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
                      toast.success("Task Deleted Successfully!");
                    })
                    .catch((error) => {
                      toast.error(
                        "Could not delete task: " + error.response.data.errors
                      );
                    })
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
                      toast.success("Task marked successfully!");
                    })
                    .catch((error) => {
                      toast.error(
                        "Could not edit task: " +
                          error.response.data.errors.join("\n")
                      );
                    });
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
