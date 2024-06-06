import { Container, HStack, Text, Card } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";

const Header = () => {
  return (
    <Container maxWidth={"1050px"} marginY={"20px"}>
      <Card borderRadius={"10px"} bgColor={"orange.100"}>
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
      </Card>
    </Container>
  );
};

export default Header;
