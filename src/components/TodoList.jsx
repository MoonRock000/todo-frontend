import React, { useState } from "react";
import Header from "./Header";
import { Grid, GridItem, Container } from "@chakra-ui/react";

import AddTask from "./AddTask";
import TasksList from "./TasksList";
import { getTasks } from "../api/tasksApi";
import TaskSkeleton from "./TaskSkeleton";

const TodoList = () => {
  const [sampleTodos, setSampleTodos] = useState([
    { description: "First Task", status: "pending" },
    { description: "Second Task", status: "Complete" },
    { description: "Third Task", status: "Complete" },
    { description: "Fourth Task", status: "pending" },
  ]);

  const [loading, setLoading] = useState(false);

  useState(() => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    getTasks(token).then((response) => {
      console.log(response.data.tasks);
      setSampleTodos(response.data.tasks);
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
        <GridItem area={"header"} justifyContent={"center"}>
          <Header />
        </GridItem>
        <GridItem area={"main"}>
          <Container>
            <AddTask
              sampleTodos={sampleTodos}
              setSampleTodos={setSampleTodos}
            />
            {loading &&
              sampleTodos.map((_, index) => <TaskSkeleton key={index} />)}
            <TasksList
              sampleTodos={sampleTodos}
              setSampleTodos={setSampleTodos}
            />
          </Container>
        </GridItem>
      </Grid>
    </>
  );
};

export default TodoList;
