import {
  Container,
  Text,
  Card,
  Button,
  VStack,
  Heading,
  Divider,
  Flex,
  Center,
} from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import { deleteToken, getToken, getUser } from "../storage/sessionStorage";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth={"100%"}
      marginY={"20px"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Card
        borderRadius={"10px"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text fontSize={"5xl"} fontWeight={"bold"}>
          Todo List Application
        </Text>

        <VStack marginLeft={"90%"} marginTop={"-40px"} marginBottom={"15px"}>
          <ColorModeSwitch />
        </VStack>
        <Divider />
        {getUser() && (
          <>
            <Flex
              width="100%"
              padding="15px"
              alignItems="center"
              marginY={"20px"}
            >
              <Center w="100%">
                <Heading fontWeight="light" margin="0 auto">
                  Hey {getUser()}, Let's Hustle and finish some tasks!
                </Heading>
              </Center>

              {getToken() && (
                <Button
                  marginLeft="auto"
                  colorScheme="red"
                  variant="outline"
                  onClick={() => {
                    deleteToken();
                    navigate("/");
                  }}
                >
                  Log Out
                </Button>
              )}
            </Flex>
          </>
        )}
      </Card>
    </Container>
  );
};

export default Header;
