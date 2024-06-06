import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";

const TasksList = ({ sampleTodos, setSampleTodos }) => {
  return (
    <div>
      {sampleTodos.map((todo) => (
        <Card marginBottom={5} key={todo.description}>
          <CardHeader>{todo.description}</CardHeader>
          <CardBody>Status: {todo.status}</CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button variant="ghost" colorScheme="red">
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
    </div>
  );
};

export default TasksList;
