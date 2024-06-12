import React, { useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { resetPassword } from "../../api/auth";

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const [serverError, setServerError] = useState(null);

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset successful!");
      navigate("/login");
    },
    onError: (error) => {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        Object.keys(errorData).forEach((key) => {
          setError(key, {
            type: "manual",
            message: errorData[key].join(", "),
          });
        });
      }
      setServerError("An error occurred. Please try again.");
    },
  });

  const newPassword = watch("new_password");

  const onSubmit = (data) => {
    mutation.mutate({ ...data, uid, token });
  };

  return (
    <Card maxWidth="500px" margin="auto">
      <Box padding="4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl isInvalid={errors.new_password}>
              <FormLabel htmlFor="new_password">New Password</FormLabel>
              <Input
                type="password"
                id="new_password"
                {...register("new_password", { required: "New Password is required" })}
                size="lg"
              />
              <FormErrorMessage>{errors.new_password && errors.new_password.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.re_new_password}>
              <FormLabel htmlFor="re_new_password">Confirm New Password</FormLabel>
              <Input
                type="password"
                id="re_new_password"
                {...register("re_new_password", {
                  required: "Please confirm your new password",
                  validate: (value) => value === newPassword || "Passwords do not match",
                })}
                size="lg"
              />
              <FormErrorMessage>{errors.re_new_password && errors.re_new_password.message}</FormErrorMessage>
            </FormControl>
            <Button type="submit" isLoading={isSubmitting || mutation.isLoading} size="lg">
              Reset Password
            </Button>
            {serverError && <Text color="red.500">Error: {serverError}</Text>}
          </VStack>
        </form>
        <VStack spacing={2} mt={4}>
          <Text>
            Remembered your password?{" "}
            <Link color="blue.500" onClick={() => navigate("/login")}>
              Login
            </Link>
          </Text>
        </VStack>
      </Box>
    </Card>
  );
};

export default ResetPasswordForm;
