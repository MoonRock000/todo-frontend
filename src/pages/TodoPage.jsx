import { useEffect, useState } from "react";
import { Grid, GridItem, Container } from "@chakra-ui/react";
import Header from "../components/Header";
import AddTask from "../components/AddTask";
import TasksList from "../components/TasksList";
import TaskSkeleton from "../components/TaskSkeleton";
import { getTasks } from "../api/tasksApi";
import { getToken } from "../storage/sessionStorage";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const sampleTodos = [1, 2, 3, 4, 5];
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const token = getToken();
    getTasks(token)
      .then((response) => {
        setTodos(response.data.tasks);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Grid
        templateAreas={`"header"
                        "main"`}
        templateColumns={{ base: "1 fr" }}
        gap="1"
        color="blackAlpha.700"
      >
        <GridItem area={"main"}>
          <Container>
            <AddTask todos={todos} setTodos={setTodos} />
            {loading &&
              sampleTodos.map((_, index) => <TaskSkeleton key={index} />)}
            <TasksList todos={todos} setTodos={setTodos} />
          </Container>
        </GridItem>
      </Grid>
    </>
  );
};

export default TodoList;
