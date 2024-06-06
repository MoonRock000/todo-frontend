import {
  Container,
  HStack,
  Text,
  Card,
  Button,
  CardFooter,
} from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import { deleteToken } from "../storage/sessionStorage";

const Header = ({ setLoggedIn, loggedIn }) => {
  return (
    <Container maxWidth={"1050px"} marginY={"20px"}>
      <Card borderRadius={"10px"} bgColor={"orange.100"}>
        <HStack
          justifyContent={"space-between"}
          paddingX={"20px"}
          color={"teal"}
          height={"100px"}
        >
          <Text colorScheme="green" fontSize={"5xl"} fontWeight={"bold"}>
            Todo List Application
          </Text>
          <ColorModeSwitch />
        </HStack>
        {loggedIn && (
          <CardFooter>
            <Button
              colorScheme="red"
              variant={"ghost"}
              onClick={() => {
                deleteToken();
                setLoggedIn(false);
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
