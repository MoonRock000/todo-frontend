import {
  Container,
  HStack,
  Text,
  Card,
  Button,
  CardFooter,
} from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import { deleteToken, getToken } from "../storage/sessionStorage";
import { useMemo } from "react";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const token = useMemo(() => getToken(), []);

  return (
    <Container maxWidth={"100%"} marginY={"20px"}>
      <Card borderRadius={"10px"} bgColor={"orange.100"}>
        <HStack
          justifyContent={"space-between"}
          color={"teal"}
          height={"100px"}
        >
          <Text colorScheme="green" fontSize={"5xl"} fontWeight={"bold"}>
            Todo List Application
          </Text>
          <ColorModeSwitch />
        </HStack>
        {token && (
          <CardFooter>
            <Button
              colorScheme="red"
              variant={"ghost"}
              onClick={() => {
                deleteToken();
                navigate("/");
              }}
            >
              Log Out
            </Button>
          </CardFooter>
        )}
      </Card>
    </Container>
  );
};

export default Header;
