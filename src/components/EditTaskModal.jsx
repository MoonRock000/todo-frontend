import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { editTask } from "../api/tasksApi";
import { toast } from "react-toastify";

export function EditTaskModal({ openModal, setOpenModal, task, setTodos }) {
  const { onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={openModal}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Description: {task.description}</FormLabel>
              <Input ref={initialRef} placeholder="New Description" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                editTask({ ...task, description: initialRef.current.value })
                  .then((response) => {
                    setTodos(response.data.tasks);
                    setOpenModal(false);
                    toast.success("Task edited successfully!");
                  })
                  .catch((err) => {
                    const error =
                      err?.response?.data?.errors?.join("\n") || "Server Error";
                    setOpenModal(false);

                    toast.error("Error: Failed to Edit task: \n" + error);
                  });
              }}
            >
              Save
            </Button>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
