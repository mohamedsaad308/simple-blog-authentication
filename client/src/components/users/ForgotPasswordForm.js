import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Card, FormControl, FormErrorMessage, FormLabel, Input, VStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../api/auth"; // Replace with your actual API function
import { toast } from "react-toastify";

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);

  const mutation = useMutation({
    mutationFn: forgotPassword, // Replace this with your forgot password API call
    onSuccess: () => {
      toast.success("Password reset link sent. Please check your email.");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    },
    onError: (error) => {
      toast.error("Something went wrong. Please try again.");
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

  // Form submission handler
  const onSubmit = (data) => {
    mutation.mutate(data); // Make the API call
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
            <Button type="submit" isLoading={isSubmitting || mutation.isLoading} size="lg">
              Send Reset Link
            </Button>
            {serverError && <Text color="red.500">Error: {serverError}</Text>}
          </VStack>
        </form>
      </Box>
    </Card>
  );
};

export default ForgotPasswordForm;
