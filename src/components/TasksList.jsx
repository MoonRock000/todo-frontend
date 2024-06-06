import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { deleteTask } from "../api/tasksApi";

const TasksList = ({ todos, setTodos }) => {
  return (
    <>
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
              <Button variant="solid" colorScheme="blue">
                Edit
              </Button>
              <Button variant="solid" colorScheme="green">
                Complete
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default TasksList;
