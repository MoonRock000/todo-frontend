import { Grid, GridItem } from "@chakra-ui/react";
import Header from "./Header";
import UserSignupForm from "./SignUpForm";
import UserLoginForm from "./LoginForm";
import { useState } from "react";

const AuthPage = () => {
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
};

export default AuthPage;