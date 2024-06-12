import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Card, FormControl, FormErrorMessage, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Assuming you are using React Router for navigation
import { useRegisterUser } from "../../api/auth";
import { useMutation } from "@tanstack/react-query";
import RegisteredSuccess from "./RegisteredSuccess";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
  } = useForm();
  useEffect(() => {
    document.title = "Register";
  }, []);
  const mutation = useMutation({
    mutationFn: useRegisterUser,
    onSuccess: () => {
      setIsSuccess(true);
      setUserEmail(watch("email"));
      localStorage.setItem("userEmail", watch("email"));
      navigate("/user-registered");
    },
    onError: (error) => {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        Object.keys(errorData).forEach((key) => {
          setError(key, {
            type: "manual",
            message: errorData[key].join(", "), // Join multiple error messages if present
          });
        });
      }
      setServerError("An error occurred. Please try again."); // Fallback error message
    },
  });
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  // Custom password validation rule
  const validatePassword = (value) => {
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      return "Password must contain at least one lowercase letter, one uppercase letter, and one digit.";
    }
    return true;
  };

  // Form submission handler
  const onSubmit = (data) => {
    mutation.mutate(data); // Make the API call
  };

  return (
    <Card maxWidth="500px" margin="auto">
      <Box padding="4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl isInvalid={errors.name}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input type="text" id="name" {...register("name", { required: "Name is required" })} size="lg" />
              <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input type="email" id="email" {...register("email", { required: "Email is required" })} size="lg" />
              <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  validate: validatePassword, // Apply custom validation
                })}
                size="lg"
              />
              <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.re_password}>
              <FormLabel htmlFor="re_password">Confirm Password</FormLabel>
              <Input
                type="password"
                id="re_password"
                {...register("re_password", {
                  required: "Password confirmation is required",
                  validate: (value) => value === watch("password") || "Passwords do not match",
                })}
                size="lg"
              />
              <FormErrorMessage>{errors.re_password && errors.re_password.message}</FormErrorMessage>
            </FormControl>
            <Button type="submit" isLoading={isSubmitting || mutation.isLoading} size="lg">
              Register
            </Button>
            {serverError && <span>Error: {serverError}</span>}
          </VStack>
        </form>
      </Box>
    </Card>
  );
};

export default RegisterForm;
