import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Container,
  SlideFade,
  Heading,
} from "@chakra-ui/react";
import { loginUser } from "../api/userAuth";
import { setSessionStorage } from "../storage/sessionStorage";
// Define the validation schema using zod
const schema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Email must be a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters"),
});

const UserLoginForm = ({ toggleShowSignUp, showSignUp, setLoggedIn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    loginUser(data)
      .then((response) => {
        const user = response.data.user;
        const token = response.data.token;
        setSessionStorage(token, user.name);
        setLoggedIn(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <SlideFade
      in={true}
      offsetY="20px"
      transition={{ exit: { delay: 1 }, enter: { duration: 0.5 } }}
    >
      <Container
        maxWidth={"900px"}
        bg={"gray.200"}
        borderRadius={"10px"}
        padding={5}
        marginY={5}
      >
        <Heading mb={5}>Log In</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            isInvalid={errors.email || errors.password}
            color={"teal"}
          >
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              placeholder="email@example.com"
              {...register("email")}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>

            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Your password"
              {...register("password")}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>

            <Button type="submit" colorScheme="teal" marginY={6}>
              Log In
            </Button>
          </FormControl>
        </form>
        <Button
          colorScheme="blue"
          onClick={() => toggleShowSignUp(!showSignUp)}
        >
          Need an account?
        </Button>
      </Container>
    </SlideFade>
  );
};

export default UserLoginForm;
