import { Tab, TabList, Tabs } from "@chakra-ui/react";
import React from "react";

const TasksFilter = ({ filter, handleFilterChange }) => {
  return (
    <Tabs
      colorScheme="green"
      variant="soft-rounded"
      mb={3}
      index={filter == "all" ? 0 : filter == "pending" ? 1 : 2}
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
