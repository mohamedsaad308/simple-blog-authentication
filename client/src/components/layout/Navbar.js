import React from "react";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <Flex as="nav" align="center" justify="space-between" padding="1rem" bg="teal.500" color="white">
      <Box>
        <Text fontSize="xl" fontWeight="bold">
          MyBlog
        </Text>
      </Box>
      <Flex align="center" justify="flex-end">
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant={location.pathname === "/" ? "solid" : "ghost"} mr={4}>
            Home
          </Button>
        </Link>
        <Link to="/about" style={{ textDecoration: "none" }}>
          <Button variant={location.pathname === "/about" ? "solid" : "ghost"} mr={4}>
            About
          </Button>
        </Link>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <Button variant={location.pathname === "/register" ? "solid" : "ghost"} mr={4}>
            Register
          </Button>
        </Link>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button variant={location.pathname === "/login" ? "solid" : "ghost"} mr={4}>
            Login
          </Button>
        </Link>
        <Link to="/logout" style={{ textDecoration: "none" }}>
          <Button variant={location.pathname === "/logout" ? "solid" : "ghost"}>Logout</Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Navbar;
