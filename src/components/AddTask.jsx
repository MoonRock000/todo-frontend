import { InputGroup, InputLeftElement, Input, Button } from "@chakra-ui/react";
import { useRef } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { createTask } from "../api/tasksApi";

const AddTask = ({ todos, setTodos }) => {
  const ref = useRef(null);

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (ref.current) {
            createTask(ref.current.value)
              .then((respose) => {
                setTodos(respose.data.tasks);
              })
              .catch((e) => {});
            event.target.reset();
          }
        }}
      >
        <InputGroup marginBottom={5}>
          <InputLeftElement
            children={<BsPlusCircleFill color="teal" size={30} />}
          />
          <Input
            borderRadius={20}
            placeholder="Add Task..."
            variant={"filled"}
            ref={ref}
            marginRight={5}
            color="teal"
          />
          <Button type="submit" colorScheme="teal">
            {" "}
            Add{" "}
          </Button>
        </InputGroup>
      </form>
    </>
  );
};

export default AddTask;
