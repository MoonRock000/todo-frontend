import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Container,
} from "@chakra-ui/react";
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

const UserSignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    // Add your form submission logic here
  };

  return (
    <Container
      maxWidth={"900px"}
      bg={"gray.200"}
      borderRadius={"10px"}
      padding={5}
      marginY={5}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name} color={"teal"}>
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
    </Container>
  );
};

export default UserSignupForm;
