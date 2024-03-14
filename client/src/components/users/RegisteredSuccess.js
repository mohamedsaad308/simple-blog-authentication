import React, { useState } from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { resendActivationEmail } from "../../api/auth";

const RegisteredSuccess = () => {
  const [isResending, setIsResending] = useState(false);

  const resendActivationEmailMutation = useMutation({
    mutationFn: resendActivationEmail, // Function to resend activation email
    onError: (error) => {
      console.error("Error resending activation email:", error);
      alert("Error resending activation email. Please try again later.");
    },
    onSuccess: () => {
      alert("Activation email has been resent successfully!");
    },
  });

  const handleResendActivationEmail = async () => {
    setIsResending(true);
    try {
      await resendActivationEmailMutation.mutate({"email" : localStorage.getItem("userEmail")});
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Box maxWidth="500px" margin="auto" textAlign="center">
      <Heading as="h2" size="lg" mt="8" mb="4">
        Registration Successful!
      </Heading>
      <Text mb="4">Please check your email to activate your account.</Text>
      <Text mb="4">Didn't receive the email? Click below to resend it:</Text>
      <Button colorScheme="teal" isLoading={isResending} onClick={handleResendActivationEmail} mb="4">
        Resend Activation Email
      </Button>
      <Text>Thank you for registering!</Text>
    </Box>
  );
};



export default RegisteredSuccess;
