import { Container, HStack, Text } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";

const Header = () => {
  return (
    <Container
      maxWidth={"1050px"}
      bg={"purple.200"}
      marginY={"20px"}
      borderRadius={"10px"}
    >
      <HStack
        justifyContent={"space-between"}
        paddingX={"20px"}
        color={"teal"}
        height={"200px"}
      >
        <Text colorScheme="green" fontSize={"5xl"} fontWeight={"bold"}>
          Todo List Application
        </Text>
        <ColorModeSwitch />
      </HStack>
    </Container>
  );
};

export default Header;
