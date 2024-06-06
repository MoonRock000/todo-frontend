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
import { signUpUser } from "../api/userAuth";
import { setSessionStorage } from "../storage/sessionStorage";
import { useNavigate } from "react-router";
// Define the validation schema using zod
const schema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(4, "Name must be at least 4 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Email must be a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters"),
});

const UserSignupForm = ({ toggleShowSignUp, showSignUp }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    signUpUser(data)
      .then((response) => {
        const user = response.data.user;

        setSessionStorage(
          response.data.token,
          JSON.stringify({ name: user.name })
        );
        navigate("/");
      })
      .catch((err) => {});
  };

  return (
    <SlideFade
      in={showSignUp}
      offsetY="20px"
      transition={{ enter: { duration: 0.5 } }}
    >
      <Container
        maxWidth={"900px"}
        bg={"gray.200"}
        borderRadius={"10px"}
        padding={5}
        marginY={5}
      >
        <Heading mb={5}>Sign Up</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            isInvalid={errors.name || errors.email || errors.password}
            color={"teal"}
          >
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input id="name" placeholder="Full name" {...register("name")} />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>

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
              Sign Up
            </Button>
          </FormControl>
        </form>

        <Button
          colorScheme="blue"
          onClick={() => toggleShowSignUp(!showSignUp)}
        >
          Already have an account?
        </Button>
      </Container>
    </SlideFade>
  );
};

export default UserSignupForm;
