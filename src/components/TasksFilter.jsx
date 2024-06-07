import { Tab, TabList, Tabs } from "@chakra-ui/react";
import React from "react";

const TasksFilter = ({ filter, handleFilterChange }) => {
  const indexValue = {
    all: 0,
    pending: 1,
    complete: 2,
  };
  return (
    <Tabs
      colorScheme="green"
      variant="soft-rounded"
      mb={3}
      index={indexValue[filter]}
    >
      <TabList>
        <Tab onClick={() => handleFilterChange("all")}>All</Tab>
        <Tab onClick={() => handleFilterChange("pending")}>Pending</Tab>
        <Tab onClick={() => handleFilterChange("complete")}>Complete</Tab>
      </TabList>
    </Tabs>
  );
};

export default TasksFilter;
