import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Card, CardBody, Center, Heading, Text, VStack } from "@chakra-ui/react";

function Home() {
  const isLoggedIn = !!localStorage.getItem("accessToken");

  useEffect(() => {
    document.title = "MyBlog";
  }, []);

  return (
    <Center minHeight="100vh">
      <Card width="50%" textAlign="center">
        <CardBody>
          <VStack spacing={4}>
            <Heading as="h2" size="xl">
              Welcome to Our Dashboard
            </Heading>
            {isLoggedIn ? (
              <>
                <Text fontSize="lg" color="green.500">
                  Logged In
                </Text>
                <Text>Welcome back! You have access to all features.</Text>
              </>
            ) : (
              <>
                <Text fontSize="lg" color="red.500">
                  Not Logged In
                </Text>
                <Text>Please log in to access all features of the dashboard.</Text>
                <Button as={RouterLink} to="/login" colorScheme="blue">
                  Login
                </Button>
              </>
            )}
          </VStack>
        </CardBody>
      </Card>
    </Center>
  );
}

export default Home;
