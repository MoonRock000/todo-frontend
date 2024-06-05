import { Box, Grid, GridItem } from "@chakra-ui/react";
import Header from "./components/Header";
import UserSignupForm from "./components/SignUpForm";
function App() {
  return (
    <Grid
      templateAreas={`"header"
                      "main"
                      "footer"`}
      templateColumns={{ base: "1 fr" }}
      gap="1"
      color="blackAlpha.700"
    >
      <GridItem area={"header"} justifyContent={"center"}>
        <Header />
      </GridItem>
      <GridItem area={"main"}>
        <UserSignupForm />
      </GridItem>
      <GridItem pl="2" bg="blue.300" area={"footer"}>
        Footer
      </GridItem>
    </Grid>
  );
}

export default App;
