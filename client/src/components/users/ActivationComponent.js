import React, { useState, useEffect } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { activateUser } from "../../api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const ActivationComponent = () => {
  const navigate = useNavigate();
  const [activationStatus, setActivationStatus] = useState(null);
  const { uid, token } = useParams();
  const mutation = useMutation({
    mutationFn: activateUser,
    onSuccess: () => {
      setActivationStatus("success");
      toast.success("Activated, redirect to login");
      // Redirect to login page
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    },
    onError: (error) => {
      toast.error("Something went wrong, resend activation");
      setTimeout(() => {
        navigate("/activation-failed");
      }, 3000);
    },
  });

  useEffect(() => {
    document.title = "Activating .....";
    mutation.mutate({ uid: uid, token: token });
  }, []);

  return (
    <Box maxWidth="500px" margin="auto" textAlign="center">
      {activationStatus === "success" && (
        <div>
          <Text mb="4">User activated successfully!</Text>
          <Text mb="4">Redirecting to login page...</Text>
        </div>
      )}

      {activationStatus === null && (
        <Heading as="h2" size="lg" mt="8" mb="4">
          Activating.......
        </Heading>
      )}
    </Box>
  );
};

export default ActivationComponent;
