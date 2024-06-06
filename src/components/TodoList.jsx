import React, { useState } from "react";
import Header from "./Header";
import { Grid, GridItem, Container } from "@chakra-ui/react";

import AddTask from "./AddTask";
import TasksList from "./TasksList";

const TodoList = () => {
  const [sampleTodos, setSampleTodos] = useState([
    { description: "First Task", status: "pending" },
    { description: "Second Task", status: "Complete" },
    { description: "Third Task", status: "Complete" },
    { description: "Fourth Task", status: "pending" },
  ]);

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
