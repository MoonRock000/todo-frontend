import { useEffect, useState } from "react";
import { Grid, GridItem, Container, Card } from "@chakra-ui/react";
import Header from "../components/Header";
import AddTask from "../components/AddTask";
import TasksList from "../components/TasksList";
import TaskSkeleton from "../components/TaskSkeleton";
import { getTasks } from "../api/tasksApi";
import { getToken } from "../storage/sessionStorage";
import TasksFilter from "../components/TasksFilter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Progress from "../components/Progress";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const sampleTodos = [1, 2, 3, 4, 5];
  const [loading, setLoading] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setLoading(true);
    const token = getToken();
    getTasks(token)
      .then((response) => {
        setTodos(response.data.tasks);
        setFilteredTodos(response.data.tasks);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Could not fetch tasks: " + error.response.data.errors);
      });
  }, []);

  useEffect(() => {
    setFilteredTodos(todos);
    setFilter("all");
  }, [todos]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredTodos(todos);
    } else {
      setFilteredTodos(todos.filter((todo) => todo.status == filter));
    }
  }, [filter]);

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
            <Card marginBottom={15} padding={5} justifyContent={"center"}>
              <Progress todos={todos} />
            </Card>
            <TasksFilter filter={filter} handleFilterChange={setFilter} />
            {loading &&
              sampleTodos.map((_, index) => <TaskSkeleton key={index} />)}
            <TasksList todos={filteredTodos} setTodos={setTodos} />
          </Container>
        </GridItem>
      </Grid>
    </>
  );
};

export default TodoList;
