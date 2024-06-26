import { useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import UserSignupForm from "../components/SignUpForm";
import UserLoginForm from "../components/LoginForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <Grid
      templateAreas={`"header"
                      "main"
                      "footer"`}
      templateColumns={{ base: "1 fr" }}
      gap="1"
      color="blackAlpha.700"
    >
      <ToastContainer />
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
