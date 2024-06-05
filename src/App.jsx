import { Box, Grid, GridItem } from "@chakra-ui/react";
import Header from "./components/Header";
import UserSignupForm from "./components/SignUpForm";
import UserLoginForm from "./components/LoginForm";
import { useState } from "react";
function App() {
  const [showSignUp, setShowSignUp] = useState(true);
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
        {showSignUp && (
          <UserSignupForm
            showSignUp={showSignUp}
            toggleShowSignUp={setShowSignUp}
          />
        )}
      </GridItem>
      <GridItem area={"footer"}>
        {!showSignUp && (
          <UserLoginForm
            showSignUp={showSignUp}
            toggleShowSignUp={setShowSignUp}
          />
        )}
      </GridItem>
    </Grid>
  );
}

export default App;
