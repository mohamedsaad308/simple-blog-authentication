import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  Text,
  Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useLoginUser } from "../../api/auth";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const queryClient = useQueryClient();
  useEffect(() => {
    document.title = "Login";
  }, []);
  const mutation = useMutation({
    mutationFn: useLoginUser,
    onSuccess: (data) => {
      const { access, refresh } = data.data;
      queryClient.setQueryData("authTokens", { access, refresh });
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      const expirationTime = 4.5 * 24 * 60 * 60 * 1000;

      setTimeout(() => {
        queryClient.setQueryData("authTokens", null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }, expirationTime);

      toast.success("Log in Successful!");
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      setServerError("No active account found with the given credentials!");
      toast.error("No active account found with the given credentials!");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Card maxWidth="500px" margin="auto">
      <Box padding="4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
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
                })}
                size="lg"
              />
              <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
            </FormControl>
            <Button type="submit" isLoading={isSubmitting || mutation.isLoading} size="lg">
              Login
            </Button>
            {serverError && <Text color="red.500">Error: {serverError}</Text>}
          </VStack>
        </form>
        <VStack spacing={2} mt={4}>
          <Link color="blue.500" onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </Link>
          <Text>
            Don't have an account?{" "}
            <Link color="blue.500" onClick={() => navigate("/register")}>
              Register
            </Link>
          </Text>
        </VStack>
      </Box>
    </Card>
  );
};

export default LoginForm;
