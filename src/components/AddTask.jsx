import { InputGroup, InputLeftElement, Input, Button } from "@chakra-ui/react";
import { useRef } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { createTask } from "../api/tasksApi";
import { ToastContainer, toast } from "react-toastify";

const AddTask = ({ setTodos }) => {
  const ref = useRef(null);

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (ref.current) {
            createTask(ref.current.value)
              .then((respose) => {
                setTodos(respose.data.tasks);
                toast.success("Task Added Successfully");
              })
              .catch((e) => {
                console.log(e);
                toast.error(
                  "Error: Failed to add task: \n" +
                    e.response.data.errors.join("\n")
                );
              });
            event.target.reset();
          }
        }}
      >
        <InputGroup marginBottom={5}>
          <InputLeftElement>
            <BsPlusCircleFill color="teal" size={30} />
          </InputLeftElement>
          <Input
            borderRadius={20}
            placeholder="Add Task..."
            variant={"filled"}
            ref={ref}
            marginRight={5}
            color="teal"
          />
          <Button type="submit" colorScheme="teal">
            Add
          </Button>
        </InputGroup>
      </form>
    </>
  );
};

export default AddTask;
